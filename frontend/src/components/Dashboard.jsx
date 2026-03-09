import React, { useState } from "react";
import axios from "axios";

function Dashboard() {

  const [file, setFile] = useState(null);
  const [mask, setMask] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredict = async () => {

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      formData
    );

    setMask(`data:image/png;base64,${response.data.mask}`);
  };

  return (
    <div style={{textAlign:"center", padding:"40px"}}>

      <h1>Brain Tumor Segmentation</h1>

      <input type="file" onChange={handleFileChange} />

      <br/><br/>

      <button onClick={handlePredict}>
        Predict
      </button>

      <br/><br/>

      {mask && (
        <div>
          <h2>Tumor Mask</h2>
          <img src={mask} width="300" />
        </div>
      )}

    </div>
  );
}

export default Dashboard;