// src/component/Trainlist.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainList() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/trains")
      .then(res => setTrains(res.data))
      .catch(err => alert("Failed to load trains"));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Available Trains</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-success">
            <tr>
              <th>Train No</th>
              <th>Train Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>AC1</th>
              <th>AC2</th>
              <th>AC3</th>
              <th>Sleeper</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => (
              <tr key={index}>
                <td>{train.train_no}</td>
                <td>{train.train_name}</td>
                <td>{train.source}</td>
                <td>{train.destination}</td>
                <td>{train.ac1}</td>
                <td>{train.ac2}</td>
                <td>{train.ac3}</td>
                <td>{train.sleeper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrainList;
