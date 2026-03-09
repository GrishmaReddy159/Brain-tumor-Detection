import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate();

const user = localStorage.getItem("loggedUser");

const logout = () => {

localStorage.removeItem("loggedUser");

navigate("/login");

};

return(

<nav className="navbar navbar-dark bg-dark navbar-expand-lg">

<div className="container">

<Link className="navbar-brand" to="/dashboard">
Brain Tumor AI
</Link>

<div>

<Link className="nav-link d-inline text-light me-3" to="/dashboard">
Home
</Link>

<Link className="nav-link d-inline text-light me-3" to="/upload">
Upload Scan
</Link>

<Link className="nav-link d-inline text-light me-3" to="/about">
About
</Link>

{!user && (
<>
<Link className="nav-link d-inline text-light me-3" to="/login">
Login
</Link>

<Link className="nav-link d-inline text-light" to="/signup">
Signup
</Link>
</>
)}

{user && (

<button
className="btn btn-sm btn-danger"
onClick={logout}
>
Logout
</button>

)}

</div>

</div>

</nav>

)

}

export default Navbar;