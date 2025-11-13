import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Layout({ user, onLogout }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.body.dir = lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr';
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          🍽️ Restaurant
        </div>

        <ul className="sidebar-menu">
          {(user.role === 'admin' || user.role === 'cashier') && (
            <>
              <li>
                <Link to="/pos" className={isActive('/pos') ? 'active' : ''}>
                  📱 {t('pos')}
                </Link>
              </li>
              <li>
                <Link to="/tables" className={isActive('/tables') ? 'active' : ''}>
                  🪑 {t('tables')}
                </Link>
              </li>
            </>
          )}

          {(user.role === 'admin' || user.role === 'kitchen') && (
            <li>
              <Link to="/kitchen" className={isActive('/kitchen') ? 'active' : ''}>
                👨‍🍳 {t('kitchen')}
              </Link>
            </li>
          )}

          {user.role === 'admin' && (
            <>
              <li>
                <Link to="/menu" className={isActive('/menu') ? 'active' : ''}>
                  📋 {t('menu')}
                </Link>
              </li>
              <li>
                <Link to="/reports" className={isActive('/reports') ? 'active' : ''}>
                  📊 {t('reports')}
                </Link>
              </li>
            </>
          )}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #374151' }}>
          <div style={{ padding: '12px', background: '#374151', borderRadius: '8px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '4px' }}>{t(user.role)}</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>{user.username}</div>
          </div>

          <div className="language-selector" style={{ marginBottom: '12px', flexWrap: 'wrap' }}>
            <button
              className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              EN
            </button>
            <button
              className={`language-btn ${i18n.language === 'ar' ? 'active' : ''}`}
              onClick={() => changeLanguage('ar')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              AR
            </button>
            <button
              className={`language-btn ${i18n.language === 'ku' ? 'active' : ''}`}
              onClick={() => changeLanguage('ku')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              KU
            </button>
          </div>

          <button onClick={onLogout} className="btn btn-danger" style={{ width: '100%' }}>
            {t('logout')}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
