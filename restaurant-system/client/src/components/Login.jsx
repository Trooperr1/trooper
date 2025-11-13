import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Login({ onLogin }) {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.body.dir = lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { username, password });
      if (response.data.success) {
        onLogin(response.data.user, response.data.sessionId);
      }
    } catch (err) {
      setError(t('login_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">🍽️ Restaurant System</h1>

        <div className="language-selector" style={{ marginBottom: '32px', justifyContent: 'center' }}>
          <button
            className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className={`language-btn ${i18n.language === 'ar' ? 'active' : ''}`}
            onClick={() => changeLanguage('ar')}
          >
            العربية
          </button>
          <button
            className={`language-btn ${i18n.language === 'ku' ? 'active' : ''}`}
            onClick={() => changeLanguage('ku')}
          >
            کوردی
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t('username')}</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('password')}</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
            {loading ? '...' : t('login')}
          </button>
        </form>

        <div style={{ marginTop: '32px', padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}><strong>Demo Accounts:</strong></p>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>Admin: admin / admin123</p>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>Cashier: cashier / cashier123</p>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>Kitchen: kitchen / kitchen123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
