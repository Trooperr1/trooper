import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import io from 'socket.io-client';

// Components
import Login from './components/Login';
import Layout from './components/Layout';
import POS from './components/POS';
import Tables from './components/Tables';
import Kitchen from './components/Kitchen';
import MenuManagement from './components/MenuManagement';
import Reports from './components/Reports';

// Global socket instance
let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3000');
  }
  return socket;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check for existing session
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      axios.get(`/api/auth/session/${sessionId}`)
        .then(response => {
          if (response.data.valid) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem('sessionId');
          }
        })
        .catch(() => {
          localStorage.removeItem('sessionId');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData, sessionId) => {
    setUser(userData);
    localStorage.setItem('sessionId', sessionId);
  };

  const handleLogout = () => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      axios.post('/api/auth/logout', { sessionId });
    }
    localStorage.removeItem('sessionId');
    setUser(null);
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          <Route index element={<Navigate to={getDefaultRoute(user.role)} replace />} />
          {(user.role === 'admin' || user.role === 'cashier') && (
            <>
              <Route path="pos" element={<POS user={user} />} />
              <Route path="tables" element={<Tables user={user} />} />
            </>
          )}
          {(user.role === 'admin' || user.role === 'kitchen') && (
            <Route path="kitchen" element={<Kitchen />} />
          )}
          {user.role === 'admin' && (
            <>
              <Route path="menu" element={<MenuManagement />} />
              <Route path="reports" element={<Reports />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function getDefaultRoute(role) {
  switch (role) {
    case 'admin':
      return '/pos';
    case 'cashier':
      return '/pos';
    case 'kitchen':
      return '/kitchen';
    default:
      return '/pos';
  }
}

export default App;
