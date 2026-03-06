import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'; // new
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>   {/* <-- new */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />

            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="book-appointment" element={<BookAppointment />} />
              <Route path="my-appointments" element={<MyAppointments />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Optional: catch-all 404 */}
            <Route path="*" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;