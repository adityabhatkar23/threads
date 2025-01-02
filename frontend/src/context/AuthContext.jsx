import  { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  // Configure axios defaults when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify token and load user data
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/profile', {
            withCredentials: true
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error loading user:', error);
          logout();
        }
      }
    };

    loadUser();
  }, [token]);

  const login = (tokenValue, userData) => {
    localStorage.setItem('token', tokenValue);
    setToken(tokenValue);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Make a request to the server to handle logout
      await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear local storage and reset state
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      token 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 