import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getSocket } from '../App';

function Tables() {
  const { t, i18n } = useTranslation();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    loadTables();

    const socket = getSocket();
    socket.on('tables-updated', (updatedTables) => {
      setTables(updatedTables);
    });

    socket.on('order-updated', () => {
      loadTables();
      if (selectedTable) {
        loadOrderDetails(selectedTable.current_order_id);
      }
    });

    return () => {
      socket.off('tables-updated');
      socket.off('order-updated');
    };
  }, []);

  const loadTables = async () => {
    const response = await axios.get('/api/tables');
    setTables(response.data);
  };

  const loadOrderDetails = async (orderId) => {
    if (!orderId) return;
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error loading order details:', error);
    }
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    if (table.current_order_id) {
      loadOrderDetails(table.current_order_id);
    } else {
      setOrderDetails(null);
    }
  };

  const handleChangeStatus = async (tableId, status) => {
    try {
      await axios.put(`/api/tables/${tableId}/status`, { status });
      loadTables();
    } catch (error) {
      alert('Error updating table status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#10b981';
      case 'occupied':
        return '#ef4444';
      case 'reserved':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getItemName = (item) => {
    if (i18n.language === 'ar') return item.name_ar || item.name;
    if (i18n.language === 'ku') return item.name_ku || item.name;
    return item.name;
  };

  return (
    <div>
      <div className="header">
        <h1 className="header-title">🪑 {t('tables')}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Tables Grid */}
        <div>
          <div className="grid grid-4">
            {tables.map(table => (
              <div
                key={table.id}
                className="card"
                style={{
                  cursor: 'pointer',
                  borderLeft: `4px solid ${getStatusColor(table.status)}`,
                  background: selectedTable?.id === table.id ? '#dbeafe' : 'white'
                }}
                onClick={() => handleTableClick(table)}
              >
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                  {t('table')} {table.table_number}
                </h2>
                <div className={`badge badge-${table.status === 'available' ? 'success' : table.status === 'occupied' ? 'danger' : 'warning'}`}>
                  {t(table.status)}
                </div>
                {table.current_order_id && (
                  <div style={{ marginTop: '12px', fontSize: '14px' }}>
                    <div style={{ color: '#6b7280' }}>{t('order_number')}</div>
                    <div style={{ fontWeight: '600' }}>{table.current_order_number}</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#2563eb', marginTop: '4px' }}>
                      ${table.current_order_total?.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Table Details */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '20px' }}>
            {selectedTable ? (
              <>
                <h2 className="card-header">
                  {t('table')} {selectedTable.table_number}
                </h2>

                <div className="form-group">
                  <label className="form-label">{t('order_status')}</label>
                  <select
                    className="form-control"
                    value={selectedTable.status}
                    onChange={(e) => handleChangeStatus(selectedTable.id, e.target.value)}
                  >
                    <option value="available">{t('available')}</option>
                    <option value="occupied">{t('occupied')}</option>
                    <option value="reserved">{t('reserved')}</option>
                  </select>
                </div>

                {orderDetails && (
                  <>
                    <div style={{
                      padding: '16px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#6b7280' }}>{t('order_number')}: </span>
                        <strong>{orderDetails.order_number}</strong>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#6b7280' }}>{t('order_status')}: </span>
                        <span className={`badge badge-${orderDetails.status === 'pending' ? 'warning' : orderDetails.status === 'ready' ? 'success' : 'primary'}`}>
                          {t(orderDetails.status)}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>{t('time')}: </span>
                        <strong>{new Date(orderDetails.created_at).toLocaleTimeString()}</strong>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
                      {t('items')}
                    </h3>
                    <div style={{ marginBottom: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                      {orderDetails.items.map(item => (
                        <div key={item.id} style={{
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          marginBottom: '8px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong>{getItemName(item)}</strong>
                            <span>x{item.quantity}</span>
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '14px' }}>
                            ${item.price.toFixed(2)} × {item.quantity} = ${item.subtotal.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      padding: '16px',
                      background: '#2563eb',
                      color: 'white',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>{t('total')}</span>
                        <span style={{ fontSize: '24px', fontWeight: '700' }}>
                          ${orderDetails.total_amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <p>{t('select_table')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
