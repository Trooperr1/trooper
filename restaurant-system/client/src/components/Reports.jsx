import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Reports() {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyReport, setDailyReport] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    loadDailyReport();
    loadWeeklyData();
  }, [selectedDate]);

  const loadDailyReport = async () => {
    const response = await axios.get(`/api/reports/daily?date=${selectedDate}`);
    setDailyReport(response.data);
  };

  const loadWeeklyData = async () => {
    const response = await axios.get('/api/reports/weekly');
    setWeeklyData(response.data);
  };

  const handlePrint = () => {
    window.print();
  };

  const getItemName = (item) => {
    if (i18n.language === 'ar') return item.name_ar || item.name;
    if (i18n.language === 'ku') return item.name_ku || item.name;
    return item.name;
  };

  const getCategoryName = (cat) => {
    if (i18n.language === 'ar') return cat.name_ar || cat.name;
    if (i18n.language === 'ku') return cat.name_ku || cat.name;
    return cat.name;
  };

  if (!dailyReport) {
    return (
      <div className="flex-center" style={{ minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1 className="header-title">📊 {t('reports')}</h1>
        <div className="header-actions">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: 'auto' }}
          />
          <button className="btn btn-primary" onClick={handlePrint}>
            🖨️ {t('print')}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-4">
        <div className="card" style={{ background: '#dbeafe', borderLeft: '4px solid #2563eb' }}>
          <div style={{ fontSize: '14px', color: '#1e40af', marginBottom: '4px' }}>
            {t('total_orders')}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a' }}>
            {dailyReport.summary.total_orders || 0}
          </div>
        </div>

        <div className="card" style={{ background: '#d1fae5', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '14px', color: '#065f46', marginBottom: '4px' }}>
            {t('total_revenue')}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#047857' }}>
            ${(dailyReport.summary.total_revenue || 0).toFixed(2)}
          </div>
        </div>

        <div className="card" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: '14px', color: '#92400e', marginBottom: '4px' }}>
            {t('cash_revenue')}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#b45309' }}>
            ${(dailyReport.summary.cash_revenue || 0).toFixed(2)}
          </div>
        </div>

        <div className="card" style={{ background: '#e0e7ff', borderLeft: '4px solid #6366f1' }}>
          <div style={{ fontSize: '14px', color: '#3730a3', marginBottom: '4px' }}>
            {t('card_revenue')}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#4338ca' }}>
            ${(dailyReport.summary.card_revenue || 0).toFixed(2)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Top Items */}
        <div className="card">
          <h2 className="card-header">🏆 {t('top_items')}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('quantity')}</th>
                <th>{t('total')}</th>
              </tr>
            </thead>
            <tbody>
              {dailyReport.topItems.map((item, index) => (
                <tr key={index}>
                  <td>{getItemName(item)}</td>
                  <td style={{ fontWeight: '600' }}>{item.quantity}</td>
                  <td style={{ fontWeight: '700', color: '#2563eb' }}>
                    ${item.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category Revenue */}
        <div className="card">
          <h2 className="card-header">📊 {t('category_revenue')}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>{t('category')}</th>
                <th>{t('items')}</th>
                <th>{t('total')}</th>
              </tr>
            </thead>
            <tbody>
              {dailyReport.categoryRevenue.map((cat, index) => (
                <tr key={index}>
                  <td>{getCategoryName(cat)}</td>
                  <td style={{ fontWeight: '600' }}>{cat.items_sold}</td>
                  <td style={{ fontWeight: '700', color: '#10b981' }}>
                    ${cat.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders by Hour */}
      <div className="card">
        <h2 className="card-header">⏰ {t('orders_by_hour')}</h2>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', minWidth: '800px', alignItems: 'flex-end', height: '200px' }}>
            {Array.from({ length: 24 }, (_, i) => {
              const hourData = dailyReport.ordersByHour.find(h => parseInt(h.hour) === i);
              const count = hourData ? hourData.count : 0;
              const maxCount = Math.max(...dailyReport.ordersByHour.map(h => h.count), 1);
              const height = (count / maxCount) * 150;

              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                    {count}
                  </div>
                  <div style={{
                    width: '100%',
                    height: `${height}px`,
                    background: '#2563eb',
                    borderRadius: '4px 4px 0 0',
                    minHeight: count > 0 ? '20px' : '0'
                  }}></div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                    {i}:00
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="card">
        <h2 className="card-header">📈 {t('weekly_report')}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>{t('total_orders')}</th>
              <th>{t('total_revenue')}</th>
            </tr>
          </thead>
          <tbody>
            {weeklyData.map((day, index) => (
              <tr key={index}>
                <td>{new Date(day.date).toLocaleDateString()}</td>
                <td style={{ fontWeight: '600' }}>{day.total_orders}</td>
                <td style={{ fontWeight: '700', color: '#10b981' }}>
                  ${day.total_revenue.toFixed(2)}
                </td>
              </tr>
            ))}
            {weeklyData.length > 0 && (
              <tr style={{ background: '#f3f4f6', fontWeight: '700' }}>
                <td>Total</td>
                <td>{weeklyData.reduce((sum, day) => sum + day.total_orders, 0)}</td>
                <td style={{ color: '#10b981' }}>
                  ${weeklyData.reduce((sum, day) => sum + day.total_revenue, 0).toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
