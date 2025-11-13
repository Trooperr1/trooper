const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Database setup
const dbPath = path.join(__dirname, 'restaurant.db');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Simple session management (in-memory for local system)
const sessions = new Map();

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Helper function to broadcast updates
function broadcastUpdate(event, data) {
  io.emit(event, data);
}

// ============ AUTH ROUTES ============

app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
      .get(username, password);

    if (user) {
      const sessionId = uuidv4();
      sessions.set(sessionId, { userId: user.id, role: user.role, username: user.username });

      res.json({
        success: true,
        sessionId,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/logout', (req, res) => {
  const { sessionId } = req.body;
  sessions.delete(sessionId);
  res.json({ success: true });
});

app.get('/api/auth/session/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (session) {
    res.json({ valid: true, user: session });
  } else {
    res.json({ valid: false });
  }
});

// ============ MENU ROUTES ============

app.get('/api/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY display_order').all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menu', (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT m.*, c.name as category_name
      FROM menu_items m
      JOIN categories c ON m.category_id = c.id
      WHERE m.available = 1
    `;

    if (category) {
      query += ` AND m.category_id = ?`;
      const items = db.prepare(query).all(category);
      res.json(items);
    } else {
      const items = db.prepare(query).all();
      res.json(items);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menu/:id', (req, res) => {
  try {
    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/menu', (req, res) => {
  try {
    const { name, name_ar, name_ku, description, description_ar, description_ku, price, category_id } = req.body;
    const result = db.prepare(`
      INSERT INTO menu_items (name, name_ar, name_ku, description, description_ar, description_ku, price, category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, name_ar, name_ku, description, description_ar, description_ku, price, category_id);

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/menu/:id', (req, res) => {
  try {
    const { name, name_ar, name_ku, description, description_ar, description_ku, price, category_id, available } = req.body;
    db.prepare(`
      UPDATE menu_items
      SET name = ?, name_ar = ?, name_ku = ?, description = ?, description_ar = ?, description_ku = ?,
          price = ?, category_id = ?, available = ?
      WHERE id = ?
    `).run(name, name_ar, name_ku, description, description_ar, description_ku, price, category_id, available, req.params.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  try {
    db.prepare('UPDATE menu_items SET available = 0 WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ TABLE ROUTES ============

app.get('/api/tables', (req, res) => {
  try {
    const tables = db.prepare(`
      SELECT t.*,
             o.id as current_order_id,
             o.order_number as current_order_number,
             o.total_amount as current_order_total
      FROM restaurant_tables t
      LEFT JOIN orders o ON t.id = o.table_id
        AND o.status IN ('pending', 'preparing', 'ready')
        AND o.payment_status = 'unpaid'
      ORDER BY t.table_number
    `).all();

    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tables/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE restaurant_tables SET status = ? WHERE id = ?').run(status, req.params.id);

    const tables = db.prepare('SELECT * FROM restaurant_tables ORDER BY table_number').all();
    broadcastUpdate('tables-updated', tables);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ORDER ROUTES ============

app.get('/api/orders', (req, res) => {
  try {
    const { status, date } = req.query;
    let query = `
      SELECT o.*, t.table_number,
             (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
      FROM orders o
      LEFT JOIN restaurant_tables t ON o.table_id = t.id
    `;

    const conditions = [];
    const params = [];

    if (status) {
      conditions.push('o.status = ?');
      params.push(status);
    }

    if (date) {
      conditions.push('DATE(o.created_at) = ?');
      params.push(date);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY o.created_at DESC';

    const orders = db.prepare(query).all(...params);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const order = db.prepare(`
      SELECT o.*, t.table_number
      FROM orders o
      LEFT JOIN restaurant_tables t ON o.table_id = t.id
      WHERE o.id = ?
    `).get(req.params.id);

    const items = db.prepare(`
      SELECT oi.*, m.name, m.name_ar, m.name_ku
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      WHERE oi.order_id = ?
    `).all(req.params.id);

    res.json({ ...order, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const { table_id, items, notes, created_by } = req.body;

    // Generate order number
    const orderNumber = 'ORD-' + Date.now().toString().slice(-8);

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Insert order
    const orderResult = db.prepare(`
      INSERT INTO orders (order_number, table_id, total_amount, notes, created_by)
      VALUES (?, ?, ?, ?, ?)
    `).run(orderNumber, table_id, total, notes, created_by);

    const orderId = orderResult.lastInsertRowid;

    // Insert order items
    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, menu_item_id, quantity, price, subtotal, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const item of items) {
      insertItem.run(orderId, item.menu_item_id, item.quantity, item.price, item.price * item.quantity, item.notes);
    }

    // Update table status
    if (table_id) {
      db.prepare('UPDATE restaurant_tables SET status = ? WHERE id = ?').run('occupied', table_id);
    }

    // Get complete order data
    const order = db.prepare(`
      SELECT o.*, t.table_number
      FROM orders o
      LEFT JOIN restaurant_tables t ON o.table_id = t.id
      WHERE o.id = ?
    `).get(orderId);

    const orderItems = db.prepare(`
      SELECT oi.*, m.name, m.name_ar, m.name_ku
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      WHERE oi.order_id = ?
    `).all(orderId);

    const completeOrder = { ...order, items: orderItems };

    // Broadcast to kitchen
    broadcastUpdate('new-order', completeOrder);
    broadcastUpdate('tables-updated', db.prepare('SELECT * FROM restaurant_tables ORDER BY table_number').all());

    res.json({ success: true, order: completeOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const completedAt = status === 'completed' ? new Date().toISOString() : null;

    if (completedAt) {
      db.prepare('UPDATE orders SET status = ?, completed_at = ? WHERE id = ?')
        .run(status, completedAt, req.params.id);
    } else {
      db.prepare('UPDATE orders SET status = ? WHERE id = ?')
        .run(status, req.params.id);
    }

    // Update order items status
    if (status === 'preparing') {
      db.prepare('UPDATE order_items SET status = ? WHERE order_id = ?')
        .run('preparing', req.params.id);
    } else if (status === 'ready') {
      db.prepare('UPDATE order_items SET status = ? WHERE order_id = ?')
        .run('ready', req.params.id);
    }

    const order = db.prepare(`
      SELECT o.*, t.table_number
      FROM orders o
      LEFT JOIN restaurant_tables t ON o.table_id = t.id
      WHERE o.id = ?
    `).get(req.params.id);

    const items = db.prepare(`
      SELECT oi.*, m.name, m.name_ar, m.name_ku
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      WHERE oi.order_id = ?
    `).all(req.params.id);

    broadcastUpdate('order-updated', { ...order, items });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id/payment', (req, res) => {
  try {
    const { payment_method } = req.body;

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);

    db.prepare(`
      UPDATE orders
      SET payment_status = 'paid', payment_method = ?, status = 'completed', completed_at = ?
      WHERE id = ?
    `).run(payment_method, new Date().toISOString(), req.params.id);

    // Update table status
    if (order.table_id) {
      db.prepare('UPDATE restaurant_tables SET status = ? WHERE id = ?')
        .run('available', order.table_id);
    }

    // Update daily sales
    const today = new Date().toISOString().split('T')[0];
    const dailySale = db.prepare('SELECT * FROM daily_sales WHERE date = ?').get(today);

    if (dailySale) {
      const cashRevenue = payment_method === 'cash' ? dailySale.cash_revenue + order.total_amount : dailySale.cash_revenue;
      const cardRevenue = payment_method === 'card' ? dailySale.card_revenue + order.total_amount : dailySale.card_revenue;

      db.prepare(`
        UPDATE daily_sales
        SET total_orders = total_orders + 1,
            total_revenue = total_revenue + ?,
            cash_revenue = ?,
            card_revenue = ?
        WHERE date = ?
      `).run(order.total_amount, cashRevenue, cardRevenue, today);
    } else {
      db.prepare(`
        INSERT INTO daily_sales (date, total_orders, total_revenue, cash_revenue, card_revenue)
        VALUES (?, 1, ?, ?, ?)
      `).run(
        today,
        order.total_amount,
        payment_method === 'cash' ? order.total_amount : 0,
        payment_method === 'card' ? order.total_amount : 0
      );
    }

    broadcastUpdate('order-completed', { orderId: req.params.id });
    broadcastUpdate('tables-updated', db.prepare('SELECT * FROM restaurant_tables ORDER BY table_number').all());

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ REPORTS ROUTES ============

app.get('/api/reports/daily', (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];

    const summary = db.prepare(`
      SELECT
        COUNT(*) as total_orders,
        SUM(total_amount) as total_revenue,
        SUM(CASE WHEN payment_method = 'cash' THEN total_amount ELSE 0 END) as cash_revenue,
        SUM(CASE WHEN payment_method = 'card' THEN total_amount ELSE 0 END) as card_revenue
      FROM orders
      WHERE DATE(created_at) = ? AND payment_status = 'paid'
    `).get(targetDate);

    const ordersByHour = db.prepare(`
      SELECT
        strftime('%H', created_at) as hour,
        COUNT(*) as count
      FROM orders
      WHERE DATE(created_at) = ? AND payment_status = 'paid'
      GROUP BY hour
      ORDER BY hour
    `).all(targetDate);

    const topItems = db.prepare(`
      SELECT
        m.name, m.name_ar, m.name_ku,
        SUM(oi.quantity) as quantity,
        SUM(oi.subtotal) as revenue
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      JOIN orders o ON oi.order_id = o.id
      WHERE DATE(o.created_at) = ? AND o.payment_status = 'paid'
      GROUP BY oi.menu_item_id
      ORDER BY quantity DESC
      LIMIT 10
    `).all(targetDate);

    const categoryRevenue = db.prepare(`
      SELECT
        c.name, c.name_ar, c.name_ku,
        SUM(oi.subtotal) as revenue,
        SUM(oi.quantity) as items_sold
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      JOIN categories c ON m.category_id = c.id
      JOIN orders o ON oi.order_id = o.id
      WHERE DATE(o.created_at) = ? AND o.payment_status = 'paid'
      GROUP BY c.id
      ORDER BY revenue DESC
    `).all(targetDate);

    res.json({
      date: targetDate,
      summary,
      ordersByHour,
      topItems,
      categoryRevenue
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reports/weekly', (req, res) => {
  try {
    const weeklyData = db.prepare(`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as total_orders,
        SUM(total_amount) as total_revenue
      FROM orders
      WHERE created_at >= date('now', '-7 days') AND payment_status = 'paid'
      GROUP BY DATE(created_at)
      ORDER BY date
    `).all();

    res.json(weeklyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kitchen display - active orders
app.get('/api/kitchen/orders', (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT o.*, t.table_number
      FROM orders o
      LEFT JOIN restaurant_tables t ON o.table_id = t.id
      WHERE o.status IN ('pending', 'preparing', 'ready') AND o.payment_status = 'unpaid'
      ORDER BY o.created_at ASC
    `).all();

    const ordersWithItems = orders.map(order => {
      const items = db.prepare(`
        SELECT oi.*, m.name, m.name_ar, m.name_ku
        FROM order_items oi
        JOIN menu_items m ON oi.menu_item_id = m.id
        WHERE oi.order_id = ?
      `).all(order.id);

      return { ...order, items };
    });

    res.json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 Restaurant Management System Server running on port ${PORT}`);
  console.log(`📱 Access the application at: http://localhost:${PORT}`);
  console.log(`\n📊 Database: ${dbPath}`);
});
