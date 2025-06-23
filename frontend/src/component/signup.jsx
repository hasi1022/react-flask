import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    fname: "", lname: "", username: "", password: "",
    phno: "", gender: "", dob: "", age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setFormData({
        ...formData,
        dob: value,
        age: age >= 0 ? age : ""
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", formData);
      alert("Signup successful");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e6ffe6", paddingTop: "50px" }}>
      <div className="container d-flex justify-content-center align-items-start">
        <div className="card shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
          <div className="card-header bg-success text-white text-center">
            <h3>Sign Up to Railway Reservation</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input name="fname" className="form-control" placeholder="First Name" onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <input name="lname" className="form-control" placeholder="Last Name" onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-3">
                <input name="username" className="form-control" placeholder="Username" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="phno" className="form-control" placeholder="Phone Number" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <select name="gender" className="form-control" onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <input name="dob" type="date" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="age" type="number" className="form-control" placeholder="Age" value={formData.age} readOnly />
              </div>
              <div className="text-center">
                <button className="btn btn-success w-100">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
