import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel"; // we’ll create this next
import HomePage from "./components/HomePage";
import TwitterDownloader from "./components/Twitter";

function App() {
  const [admin, setAdmin] = useState(null); // store logged-in admin info

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/* Signup page */}
        <Route 
          path="/signup" 
          element={admin ? <Navigate to="/admin" /> : <Signup />} 
        />

        {/* Login page */}
        <Route 
          path="/login" 
          element={admin ? <Navigate to="/admin" /> : <Login setAdmin={setAdmin} />} 
        />

        {/* Admin panel */}
        <Route 
          path="/admin" 
          element={admin ? <AdminPanel admin={admin} /> : <Navigate to="/login" />} 
        />
        <Route path="/twitter" element={<TwitterDownloader />} />

        {/* Default route */}
        <Route 
          path="/" 
          element={<Navigate to="/home" />} 
        />
      </Routes>
      
    </Router>
  );
}

export default App;
