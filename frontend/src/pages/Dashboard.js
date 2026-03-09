import React from "react";
import Navbar from "../components/Navbar";

function Dashboard(){

  return(

    <>
      <Navbar/>

      <div className="container mt-5">

        <h2>Brain Tumor Detection System</h2>

        <p>
        Upload MRI scans and detect tumor regions using deep learning.
        The system generates tumor masks and highlighted images for analysis.
        </p>

      </div>
    </>
  )

}

export default Dashboard;