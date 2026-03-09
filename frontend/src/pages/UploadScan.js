import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function UploadScan() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState(null);
  const [mask, setMask] = useState(null);
  const [highlight, setHighlight] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [confidence, setConfidence] = useState(null);

  const user = localStorage.getItem("loggedUser");

  useEffect(() => {

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const savedHistory = localStorage.getItem("scanHistory_" + user);

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

  }, [navigate, user]);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select an MRI scan");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );

      const orig = "data:image/png;base64," + response.data.original;
      const m = "data:image/png;base64," + response.data.mask;
      const h = "data:image/png;base64," + response.data.highlight;

      setOriginal(orig);
      setMask(m);
      setHighlight(h);

      const whitePixels = m.split("255").length;
      const conf = Math.min((whitePixels / 5000) * 100, 100);
      setConfidence(conf.toFixed(2));

      const newScan = {
        id: Date.now(),
        fileName: file.name,
        original: orig,
        mask: m,
        highlight: h
      };

      const updatedHistory = [newScan, ...history];

      setHistory(updatedHistory);

      localStorage.setItem(
        "scanHistory_" + user,
        JSON.stringify(updatedHistory)
      );

    } catch (error) {

      console.error(error);
      alert("Prediction failed");

    }

    setLoading(false);
  };

  const loadScan = (scan) => {
    setOriginal(scan.original);
    setMask(scan.mask);
    setHighlight(scan.highlight);
  };

  const deleteScan = (id) => {

    const updatedHistory = history.filter(scan => scan.id !== id);

    setHistory(updatedHistory);

    localStorage.setItem(
      "scanHistory_" + user,
      JSON.stringify(updatedHistory)
    );
  };

  return (

    <>
      <Navbar />

      <div className={darkMode ? "bg-dark text-light" : ""}>

      <div className="container-fluid mt-4">

        <button
          className="btn btn-secondary mb-3"
          onClick={()=>setDarkMode(!darkMode)}
        >
          Toggle Dark Mode
        </button>

        <div className="row">

          {/* HISTORY PANEL */}

          <div className="col-md-3 border-end">

            <h5>Scan History</h5>

            {history.length === 0 && (
              <p>No scans yet</p>
            )}

            {history.map((scan) => (

              <div
                key={scan.id}
                className="p-2 border mb-2 d-flex justify-content-between"
              >

                <span
                  style={{cursor:"pointer"}}
                  onClick={()=>loadScan(scan)}
                >
                  {scan.fileName}
                </span>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={()=>deleteScan(scan.id)}
                >
                  X
                </button>

              </div>

            ))}

          </div>


          {/* MAIN SECTION */}

          <div className="col-md-9">

            <h3>Upload MRI Scan</h3>

            {/* Drag & Drop Upload */}

            <div
              className="border p-4 mb-3 text-center"
              onDragOver={(e)=>e.preventDefault()}
              onDrop={(e)=>{
                e.preventDefault();
                setFile(e.dataTransfer.files[0]);
              }}
            >

              Drag & Drop MRI Scan Here

              <br/>

              <input
                type="file"
                className="form-control mt-2"
                onChange={(e)=>setFile(e.target.files[0])}
              />

            </div>

            <button
              className="btn btn-primary"
              onClick={handleUpload}
            >
              Predict
            </button>


            {/* Loading Spinner */}

            {loading && (

              <div className="text-center mt-4">

                <div className="spinner-border text-primary"></div>

                <p>Analyzing MRI Scan...</p>

              </div>

            )}


            {/* RESULTS */}

            <div className="row mt-4">

              {original && (
                <div className="col-md-4 text-center">
                  <h5>Uploaded MRI</h5>
                  <img src={original} alt="original" width="220"/>
                </div>
              )}

              {mask && (
                <div className="col-md-4 text-center">
                  <h5>Tumor Mask</h5>
                  <img src={mask} alt="mask" width="220"/>
                </div>
              )}

              {highlight && (
                <div className="col-md-4 text-center">
                  <h5>Tumor Highlight</h5>
                  <img src={highlight} alt="highlight" width="220"/>

                  <br/>

                  <a
                    href={highlight}
                    download="tumor_result.png"
                    className="btn btn-success mt-2"
                  >
                    Download Result
                  </a>

                </div>
              )}

            </div>


            {/* CONFIDENCE SCORE */}

            {confidence && (

              <div className="alert alert-info mt-4">

                Tumor Detection Confidence: {confidence}%

              </div>

            )}

          </div>

        </div>

      </div>

      </div>

    </>
  );
}

export default UploadScan;