// src/component/SearchTicket.jsx
import React, { useState } from "react";
import axios from "axios";

function SearchTicket() {
  const [pnr, setPnr] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/ticket/${pnr}`);
      setTicket(res.data);
      setError("");
    } catch (err) {
      setTicket(null);
      setError("No ticket found with this PNR.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">Search Ticket by PNR</h3>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter PNR Number"
        value={pnr}
        onChange={(e) => setPnr(e.target.value)}
      />
      <button className="btn btn-primary w-100 mb-3" onClick={handleSearch}>
        Search
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      {ticket && (
        <div className="card p-3 bg-light">
          <h5>Ticket Details</h5>
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Train:</strong> {ticket.train_name} ({ticket.train_no})</p>
          <p><strong>From:</strong> {ticket.source} → <strong>To:</strong> {ticket.destination}</p>
          <p><strong>Class:</strong> {ticket.class}</p>
          <p><strong>Fare:</strong> ₹{ticket.fare}</p>
        </div>
      )}
    </div>
  );
}

export default SearchTicket;
