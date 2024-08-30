import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./screens/dashboard";
import Vehicles from "./screens/vehicles";
import TransactionHistory from "./screens/transactionHistory";
import Settings from "./screens/settings";

function ProtectedRoutes({isAuthenticated}:{isAuthenticated: boolean}) {
  if (!isAuthenticated) {
    return <Navigate to={{ pathname: "" }} />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="transactionhistory" element={<TransactionHistory />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default ProtectedRoutes;
