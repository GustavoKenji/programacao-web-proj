const href = window.location.href;
const API_URL = href.includes("localhost") || href.includes('127.0.0.1') ? "http://localhost:3000" : "https://web-proj-backend.herokuapp.com";
