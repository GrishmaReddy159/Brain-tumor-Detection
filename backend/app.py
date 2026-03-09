from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import base64
from keras.models import load_model

app = Flask(__name__)

# allow frontend access
CORS(app)

# limit upload size (16MB)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

# load model once at startup
model = load_model("models/unet_brats_segmentation.keras", compile=False)
print("Model loaded successfully")

IMG_SIZE = 128


def preprocess(img):
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    img = np.expand_dims(img, axis=-1)
    img = np.expand_dims(img, axis=0)
    return img


# health check route (important for Render)
@app.route("/")
def home():
    return jsonify({"message": "Brain Tumor Detection API Running"})


@app.route("/predict", methods=["POST"])
def predict():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    image = cv2.imdecode(
        np.frombuffer(file.read(), np.uint8),
        cv2.IMREAD_GRAYSCALE
    )

    input_img = preprocess(image)

    pred = model.predict(input_img)[0]

    # tumor mask
    mask = (pred[:, :, 0] > 0.2).astype(np.uint8) * 255

    # confidence score
    confidence = float(np.max(pred))

    # resize mask back to original MRI size
    mask = cv2.resize(mask, (image.shape[1], image.shape[0]))

    # create highlighted tumor image
    highlighted = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
    highlighted[mask > 0] = [0, 0, 255]

    # encode images
    _, orig_buffer = cv2.imencode(".png", image)
    _, mask_buffer = cv2.imencode(".png", mask)
    _, highlight_buffer = cv2.imencode(".png", highlighted)

    orig_base64 = base64.b64encode(orig_buffer).decode("utf-8")
    mask_base64 = base64.b64encode(mask_buffer).decode("utf-8")
    highlight_base64 = base64.b64encode(highlight_buffer).decode("utf-8")

    return jsonify({
        "original": orig_base64,
        "mask": mask_base64,
        "highlight": highlight_base64,
        "confidence": confidence
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)