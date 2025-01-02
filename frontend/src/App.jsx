// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSignUp from './pages/UserSignup';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import UserLogin from './pages/UserLogin';

import Onboarding from './pages/Onboarding';
import CreateThread from './components/forms/CreateThread';
import ThreadDetails from './pages/ThreadDetails';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/register" element={<UserSignUp />} />
      <Route path="/onboarding" element={<Onboarding />} />

      <Route
        path="/home"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-thread"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <CreateThread />
          </PrivateRoute>
        }
      />
      <Route
        path="/thread/:id"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <ThreadDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
