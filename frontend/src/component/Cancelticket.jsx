import React, { useState } from "react";
import axios from "axios";

function CancelTicket() {
  const [pnr, setPnr] = useState("");
  const [message, setMessage] = useState("");

  const handleCancel = async () => {
    try {
      await axios.delete(`http://localhost:5000/ticket/${pnr}`);
      setMessage("✅ Ticket cancelled successfully");
    } catch (err) {
      setMessage("❌ No ticket found with this PNR");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">Cancel Ticket</h3>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter PNR Number"
        value={pnr}
        onChange={(e) => setPnr(e.target.value)}
      />
      <button className="btn btn-danger w-100 mb-3" onClick={handleCancel}>
        Cancel Ticket
      </button>

      {message && (
        <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default CancelTicket;
