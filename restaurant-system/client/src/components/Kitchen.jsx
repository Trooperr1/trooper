import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getSocket } from '../App';

function Kitchen() {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();

    const socket = getSocket();
    socket.on('new-order', () => {
      loadOrders();
      // Play sound notification
      playNotificationSound();
    });

    socket.on('order-updated', () => {
      loadOrders();
    });

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadOrders, 10000);

    return () => {
      socket.off('new-order');
      socket.off('order-updated');
      clearInterval(interval);
    };
  }, []);

  const loadOrders = async () => {
    const response = await axios.get('/api/kitchen/orders');
    setOrders(response.data);
  };

  const playNotificationSound = () => {
    // Simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status });
      loadOrders();
    } catch (error) {
      alert('Error updating order status');
    }
  };

  const getItemName = (item) => {
    if (i18n.language === 'ar') return item.name_ar || item.name;
    if (i18n.language === 'ku') return item.name_ku || item.name;
    return item.name;
  };

  const getOrderAge = (createdAt) => {
    const minutes = Math.floor((Date.now() - new Date(createdAt)) / 60000);
    return minutes;
  };

  const getAgeColor = (minutes) => {
    if (minutes < 10) return '#10b981';
    if (minutes < 20) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'preparing':
        return '#2563eb';
      case 'ready':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  return (
    <div>
      <div className="header">
        <h1 className="header-title">👨‍🍳 {t('kitchen_display')}</h1>
        <div className="header-actions">
          <div style={{ fontSize: '18px', fontWeight: '600' }}>
            {t('pending')}: {pendingOrders.length} | {t('preparing')}: {preparingOrders.length} | {t('ready')}: {readyOrders.length}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {/* Pending Orders */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#f59e0b' }}>
            ⏳ {t('pending')} ({pendingOrders.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pendingOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                getItemName={getItemName}
                getOrderAge={getOrderAge}
                getAgeColor={getAgeColor}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Preparing Orders */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#2563eb' }}>
            🔥 {t('preparing')} ({preparingOrders.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {preparingOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                getItemName={getItemName}
                getOrderAge={getOrderAge}
                getAgeColor={getAgeColor}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Ready Orders */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#10b981' }}>
            ✅ {t('ready')} ({readyOrders.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {readyOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                getItemName={getItemName}
                getOrderAge={getOrderAge}
                getAgeColor={getAgeColor}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, onStatusChange, getItemName, getOrderAge, getAgeColor, t }) {
  const age = getOrderAge(order.created_at);

  return (
    <div className="card" style={{
      borderLeft: `4px solid ${getAgeColor(age)}`,
      background: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
            {order.order_number}
          </h3>
          {order.table_number && (
            <p style={{ color: '#6b7280' }}>
              {t('table')} {order.table_number}
            </p>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: getAgeColor(age)
          }}>
            {age} min
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {new Date(order.created_at).toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        {order.items.map(item => (
          <div key={item.id} style={{
            padding: '8px',
            background: '#f9fafb',
            borderRadius: '6px',
            marginBottom: '6px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <strong>{getItemName(item)}</strong>
            <span style={{
              background: '#2563eb',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              x{item.quantity}
            </span>
          </div>
        ))}
      </div>

      {order.notes && (
        <div style={{
          padding: '8px',
          background: '#fef3c7',
          borderRadius: '6px',
          marginBottom: '12px',
          fontSize: '14px'
        }}>
          📝 {order.notes}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        {order.status === 'pending' && (
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={() => onStatusChange(order.id, 'preparing')}
          >
            {t('start_preparing')}
          </button>
        )}
        {order.status === 'preparing' && (
          <button
            className="btn btn-success"
            style={{ flex: 1 }}
            onClick={() => onStatusChange(order.id, 'ready')}
          >
            {t('mark_ready')}
          </button>
        )}
      </div>
    </div>
  );
}

export default Kitchen;
