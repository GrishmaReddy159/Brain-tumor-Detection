import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSignup = (e) => {

e.preventDefault();

const users = JSON.parse(localStorage.getItem("users")) || [];

const exists = users.find(u => u.email === email);

if(exists){
alert("User already exists");
return;
}

users.push({email,password});

localStorage.setItem("users", JSON.stringify(users));

alert("Account created successfully");

navigate("/login");

};

return(

<div className="d-flex justify-content-center align-items-center vh-100 bg-light">

<div className="card shadow p-4" style={{width:"400px"}}>

<h3 className="text-center mb-4">
Signup
</h3>

<form onSubmit={handleSignup}>

<input
type="email"
className="form-control mb-3"
placeholder="Enter email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="form-control mb-3"
placeholder="Enter password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="btn btn-success w-100">
Signup
</button>

<p className="text-center mt-3">
Already have account? <Link to="/login">Login</Link>
</p>

</form>

</div>

</div>

)

}

export default Signup;