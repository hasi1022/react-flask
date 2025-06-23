// src/component/BookTicket.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function BookTicket() {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    class: "",
    train_name: "",
    train_no: "",
    source: "",
    destination: "",
    fare: ""
  });

  // Fetch all trains on mount
  useEffect(() => {
    axios.get("http://localhost:5000/trains")
      .then(res => setTrains(res.data))
      .catch(() => alert("Failed to load trains"));
  }, []);
 
  // When train changes, update train info and fetch its route
  const handleTrainChange = (e) => {
    const selectedTrain = trains.find(t => t.train_name === e.target.value);
    if (selectedTrain) {
      setForm({
        ...form,
        train_name: selectedTrain.train_name,
        train_no: selectedTrain.train_no,
        source: "",
        destination: "",
        class: "",
        fare: ""
      });

      // Fetch station list for the selected train
      axios.post("http://localhost:5000/train_route", { train_name: selectedTrain.train_name })
        .then(res =>
          { console.log('station from API',res.data);
          setStations(res.data)})
        .catch(() => alert("Failed to load station route"));
    }
  };

  // When class changes or source/destination changes, recalculate fare
  useEffect(() => {
    const { train_name, source, destination, class: selectedClass } = form;
    if (train_name && source && destination && selectedClass) {
      axios.post("http://localhost:5000/calculate_fare", {
        train_name,
        source,
        destination,
        class: selectedClass
      }).then(res => {
        setForm(prev => ({ ...prev, fare: res.data.fare }));
      }).catch(() => {
        setForm(prev => ({ ...prev, fare: "" }));
        alert("Failed to calculate fare");
      });
    }
  }, [form.source, form.destination, form.class]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/ticket", form);
      alert("Ticket booked successfully");
      setForm({
        name: "",
        age: "",
        gender: "",
        class: "",
        train_name: "",
        train_no: "",
        source: "",
        destination: "",
        fare: ""
      });
      setStations([]);
    } catch (err) {
      alert("Failed to book ticket");
    }
  };

  return (
    <div className="container p-4 mt-3 rounded" style={{ backgroundColor: "lightgreen", maxWidth: "600px" }}>
      <h3 className="text-center mb-3">Book Your Ticket</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Passenger Name" value={form.name} onChange={handleChange} required />
        <input className="form-control mb-2" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <select className="form-control mb-2" name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Not to say">Not to say</option>
        </select>
        <select className="form-control mb-2" name="train_name" value={form.train_name} onChange={handleTrainChange} required>
          <option value="">Select Train</option>
          {trains.map(train => (
            <option key={train.train_no} value={train.train_name}>
              {train.train_name} ({train.train_no})
            </option>
          ))}
        </select>
        <select className="form-control mb-2" name="source" value={form.source} onChange={handleChange} required>
          <option value="">Select Source Station</option>
          {stations.map((s, i) => (
            <option key={i} value={s.station_name}>{s.station_name}</option>
          ))}
        </select>
        <select className="form-control mb-2" name="destination" value={form.destination} onChange={handleChange} required>
          <option value="">Select Destination Station</option>
          {stations.map((s, i) => (
            <option key={i} value={s.station_name}>{s.station_name}</option>
          ))}
        </select>
        <select className="form-control mb-2" name="class" value={form.class} onChange={handleChange} required>
          <option value="">Select Class</option>
          <option value="ac1">AC1</option>
          <option value="ac2">AC2</option>
          <option value="ac3">AC3</option>
          <option value="sleeper">Sleeper</option>
        </select>
        <input className="form-control mb-3" placeholder="Cost" value={form.fare || ""} readOnly />
        <button className="btn btn-dark w-100">Book Ticket</button>
      </form>
    </div>
  );
}

export default BookTicket;
