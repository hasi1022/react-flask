// src/api.js
const API = process.env.REACT_APP_API_URL;

export async function signup(userData) {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  if (res.status === 401) return null;
  return res.json();
}

export async function getTrains() {
  const res = await fetch(`${API}/trains`);
  return res.json();
}

export async function bookTicket(ticketData) {
  const res = await fetch(`${API}/ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticketData)
  });
  return res.json();
}

export async function getTicket(pnr) {
  const res = await fetch(`${API}/ticket/${pnr}`);
  return res.status === 200 ? res.json() : null;
}

export async function cancelTicket(pnr) {
  const res = await fetch(`${API}/ticket/${pnr}`, {
    method: "DELETE"
  });
  return res.json();
}
