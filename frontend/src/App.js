// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home";
import Signup from "./component/signup";
import Login from "./component/login";
import TrainList from "./component/Trainlist";
import BookTicket from "./component/Bookticket";
import CheckTicket from "./component/Checkticket";
import CancelTicket from "./component/Cancelticket";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">Railway System</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trains">Trains</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book">Book Ticket</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/check">Check Ticket</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cancel">Cancel Ticket</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="/trains" element={<TrainList></TrainList>} />
          <Route path="/book" element={<BookTicket></BookTicket>} />
          <Route path="/check" element={<CheckTicket></CheckTicket> } />
          <Route path="/cancel" element={<CancelTicket></CancelTicket> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
