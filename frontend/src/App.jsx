import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel"; // we’ll create this next

function App() {
  const [admin, setAdmin] = useState(null); // store logged-in admin info

  return (
    <Router>
      <Routes>
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

        {/* Default route */}
        <Route 
          path="/" 
          element={<Navigate to="/signup" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
