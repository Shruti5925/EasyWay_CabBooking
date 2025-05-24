import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import BookingList from "./components/BookingList";
import { DriverAppContext } from "./context/DriverContext";
import Sidebar from "./components/Sidebar";
import DriverDashboard from "./components/DriverDashboard";

function App() {
  const { dtoken } = useContext(DriverAppContext);

  return (
    <Router>
      <ToastContainer />
      {dtoken && <Navbar />}
      <div className="flex">
        {dtoken && <Sidebar />}
        <div className="flex-1 p-4">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={!dtoken ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!dtoken ? <Register /> : <Navigate to="/" />}
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={dtoken ? <DriverDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={dtoken ? <DriverDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/books"
              element={dtoken ? <BookingList /> : <Navigate to="/login" />}
            />

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to={dtoken ? "/" : "/login"} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
