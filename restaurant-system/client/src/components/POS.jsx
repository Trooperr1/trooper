import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getSocket } from '../App';

function POS({ user }) {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    loadCategories();
    loadMenuItems();
    loadTables();

    const socket = getSocket();
    socket.on('tables-updated', (updatedTables) => {
      setTables(updatedTables);
    });

    return () => {
      socket.off('tables-updated');
    };
  }, []);

  const loadCategories = async () => {
    const response = await axios.get('/api/categories');
    setCategories(response.data);
    if (response.data.length > 0) {
      setSelectedCategory(response.data[0].id);
    }
  };

  const loadMenuItems = async (categoryId = null) => {
    const url = categoryId ? `/api/menu?category=${categoryId}` : '/api/menu';
    const response = await axios.get(url);
    setMenuItems(response.data);
  };

  const loadTables = async () => {
    const response = await axios.get('/api/tables');
    setTables(response.data);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    loadMenuItems(categoryId);
  };

  const addToCart = (item) => {
    const existingItem = cart.find(i => i.menu_item_id === item.id);
    if (existingItem) {
      setCart(cart.map(i =>
        i.menu_item_id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setCart([...cart, {
        menu_item_id: item.id,
        name: item.name,
        name_ar: item.name_ar,
        name_ku: item.name_ku,
        price: item.price,
        quantity: 1
      }]);
    }
  };

  const updateQuantity = (itemId, delta) => {
    setCart(cart.map(item =>
      item.menu_item_id === itemId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.menu_item_id !== itemId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCreateOrder = async () => {
    if (!selectedTable) {
      alert(t('select_table'));
      return;
    }
    if (cart.length === 0) {
      alert(t('select_items'));
      return;
    }

    try {
      const response = await axios.post('/api/orders', {
        table_id: selectedTable,
        items: cart,
        notes,
        created_by: user.id
      });

      if (response.data.success) {
        setCurrentOrder(response.data.order);
        setShowPayment(true);
      }
    } catch (error) {
      alert('Error creating order: ' + error.message);
    }
  };

  const handlePayment = async (method) => {
    try {
      await axios.put(`/api/orders/${currentOrder.id}/payment`, {
        payment_method: method
      });

      alert(t('payment_success'));
      setCart([]);
      setNotes('');
      setSelectedTable(null);
      setCurrentOrder(null);
      setShowPayment(false);
      loadTables();
    } catch (error) {
      alert('Error processing payment: ' + error.message);
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
        <h1 className="header-title">📱 {t('pos')}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Menu Section */}
        <div>
          {/* Categories */}
          <div className="card">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {i18n.language === 'ar' ? cat.name_ar : i18n.language === 'ku' ? cat.name_ku : cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-3">
            {menuItems.map(item => (
              <div key={item.id} className="card" style={{ cursor: 'pointer' }} onClick={() => addToCart(item)}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{getItemName(item)}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                  {i18n.language === 'ar' ? item.description_ar : i18n.language === 'ku' ? item.description_ku : item.description}
                </p>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#2563eb' }}>
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '20px' }}>
            <h2 className="card-header">{t('order')}</h2>

            {/* Table Selection */}
            <div className="form-group">
              <label className="form-label">{t('table')}</label>
              <select
                className="form-control"
                value={selectedTable || ''}
                onChange={(e) => setSelectedTable(parseInt(e.target.value))}
              >
                <option value="">{t('select_table')}</option>
                {tables.filter(t => t.status === 'available').map(table => (
                  <option key={table.id} value={table.id}>
                    {t('table_number')}{table.table_number}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Items */}
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '16px' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                  {t('no_items')}
                </p>
              ) : (
                cart.map(item => (
                  <div key={item.menu_item_id} style={{
                    padding: '12px',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong>{getItemName(item)}</strong>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => removeFromCart(item.menu_item_id)}
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 12px' }}
                          onClick={() => updateQuantity(item.menu_item_id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 12px' }}
                          onClick={() => updateQuantity(item.menu_item_id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: '700' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">{t('notes')}</label>
              <textarea
                className="form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="2"
              ></textarea>
            </div>

            {/* Total */}
            <div style={{
              padding: '16px',
              background: '#2563eb',
              color: 'white',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: '600' }}>{t('total')}</span>
                <span style={{ fontSize: '28px', fontWeight: '700' }}>${getTotal()}</span>
              </div>
            </div>

            {/* Actions */}
            <button
              className="btn btn-success btn-large"
              style={{ width: '100%' }}
              onClick={handleCreateOrder}
              disabled={cart.length === 0 || !selectedTable}
            >
              {t('new_order')}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && currentOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{t('payment')}</h2>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '8px' }}>
                  {t('order_number')}: <strong>{currentOrder.order_number}</strong>
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb' }}>
                  ${currentOrder.total_amount.toFixed(2)}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <button
                  className="btn btn-success btn-large"
                  onClick={() => handlePayment('cash')}
                >
                  💵 {t('cash')}
                </button>
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => handlePayment('card')}
                >
                  💳 {t('card')}
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowPayment(false)}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default POS;
