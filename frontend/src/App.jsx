import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskDashboard from './components/TaskDashboard';
import Login from './components/Login';
import { useAuth } from './auth/AuthContext';


export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <TaskDashboard /> : <Navigate to="/auth" />} />
      <Route path="/auth" element={<Login />} />
    </Routes>
  );
}
