import React from "react";
import Navbar from "../components/Navbar";

function History(){

  const scans = [
    {date:"10 Mar", result:"Tumor Detected"},
    {date:"9 Mar", result:"No Tumor"}
  ];

  return(

    <>
    <Navbar/>

    <div className="container mt-5">

    <h3>Scan History</h3>

    <table className="table">

      <thead>
        <tr>
          <th>Date</th>
          <th>Result</th>
        </tr>
      </thead>

      <tbody>

      {scans.map((scan,index)=>(
        <tr key={index}>
          <td>{scan.date}</td>
          <td>{scan.result}</td>
        </tr>
      ))}

      </tbody>

    </table>

    </div>
    </>
  )
}

export default History;