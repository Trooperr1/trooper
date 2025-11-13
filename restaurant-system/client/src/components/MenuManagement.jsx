import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function MenuManagement() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    name_ku: '',
    description: '',
    description_ar: '',
    description_ku: '',
    price: '',
    category_id: '',
    available: 1
  });

  useEffect(() => {
    loadCategories();
    loadMenuItems();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get('/api/categories');
    setCategories(response.data);
  };

  const loadMenuItems = async () => {
    const response = await axios.get('/api/menu?category=');
    setMenuItems(response.data);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      name_ar: '',
      name_ku: '',
      description: '',
      description_ar: '',
      description_ku: '',
      price: '',
      category_id: categories.length > 0 ? categories[0].id : '',
      available: 1
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      name_ar: item.name_ar || '',
      name_ku: item.name_ku || '',
      description: item.description || '',
      description_ar: item.description_ar || '',
      description_ku: item.description_ku || '',
      price: item.price,
      category_id: item.category_id,
      available: item.available
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`/api/menu/${editingItem.id}`, formData);
      } else {
        await axios.post('/api/menu', formData);
      }
      setShowModal(false);
      loadMenuItems();
    } catch (error) {
      alert('Error saving menu item: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/menu/${id}`);
        loadMenuItems();
      } catch (error) {
        alert('Error deleting item: ' + error.message);
      }
    }
  };

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return '';
    if (i18n.language === 'ar') return cat.name_ar || cat.name;
    if (i18n.language === 'ku') return cat.name_ku || cat.name;
    return cat.name;
  };

  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category_id === selectedCategory)
    : menuItems;

  return (
    <div>
      <div className="header">
        <h1 className="header-title">📋 {t('menu_management')}</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleAddNew}>
            ➕ {t('add_menu_item')}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="card">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {i18n.language === 'ar' ? cat.name_ar : i18n.language === 'ku' ? cat.name_ku : cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>{t('name')}</th>
              <th>{t('description')}</th>
              <th>{t('category')}</th>
              <th>{t('price')}</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>
                  <div><strong>{item.name}</strong></div>
                  {item.name_ar && <div style={{ fontSize: '13px', color: '#6b7280' }}>AR: {item.name_ar}</div>}
                  {item.name_ku && <div style={{ fontSize: '13px', color: '#6b7280' }}>KU: {item.name_ku}</div>}
                </td>
                <td style={{ maxWidth: '300px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>{item.description}</div>
                </td>
                <td>{getCategoryName(item.category_id)}</td>
                <td style={{ fontWeight: '700', color: '#2563eb' }}>${item.price.toFixed(2)}</td>
                <td>
                  <span className={`badge ${item.available ? 'badge-success' : 'badge-secondary'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: '14px' }}
                      onClick={() => handleEdit(item)}
                    >
                      {t('edit')}
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '6px 12px', fontSize: '14px' }}
                      onClick={() => handleDelete(item.id)}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingItem ? t('edit_menu_item') : t('add_menu_item')}
                </h2>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">{t('category')}</label>
                  <select
                    className="form-control"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('name')} (English)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('name')} (Arabic)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('name')} (Kurdish)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name_ku}
                    onChange={(e) => setFormData({ ...formData, name_ku: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('description')} (English)</label>
                  <textarea
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('description')} (Arabic)</label>
                  <textarea
                    className="form-control"
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('description')} (Kurdish)</label>
                  <textarea
                    className="form-control"
                    value={formData.description_ku}
                    onChange={(e) => setFormData({ ...formData, description_ku: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('price')}</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={formData.available === 1}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked ? 1 : 0 })}
                    />
                    <span>Available</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  {t('cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuManagement;
