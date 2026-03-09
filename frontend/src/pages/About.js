import React from "react";
import Navbar from "../components/Navbar";

function About(){

  return(

    <>
    <Navbar/>

    <div className="container mt-5">

      <h3>About Project</h3>

      <p>
      This system uses a deep learning U-Net model to detect brain tumors
      from MRI scans. The model generates tumor masks and highlights tumor
      regions for visual analysis.
      </p>

    </div>
    </>
  )
}

export default About;