// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./_root/pages/Home";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import CreateThread from "./_root/pages/CreateThread";
import ThreadDetails from "./_root/pages/ThreadDetails";
import AuthLayout from "./_auth/AuthLayout";
import UserLogin from "./_auth/forms/UserLogin";
import Onboarding from "./_auth/forms/Onboarding";
import UserSignUp from "./_auth/forms/UserSignup";
import RootLayout from "./_root/RootLayout";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserSignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>


      <Route element = {<RootLayout/>}>
      <Route
        index
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
      
      </Route>
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
