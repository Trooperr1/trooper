const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'restaurant.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

console.log('Initializing database...');

// Create tables
db.exec(`
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'cashier', 'kitchen')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Menu categories
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_ar TEXT,
    name_ku TEXT,
    display_order INTEGER DEFAULT 0
  );

  -- Menu items
  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_ar TEXT,
    name_ku TEXT,
    description TEXT,
    description_ar TEXT,
    description_ku TEXT,
    price REAL NOT NULL,
    category_id INTEGER NOT NULL,
    available INTEGER DEFAULT 1,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  -- Tables
  CREATE TABLE IF NOT EXISTS restaurant_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_number INTEGER UNIQUE NOT NULL,
    status TEXT DEFAULT 'available' CHECK(status IN ('available', 'occupied', 'reserved')),
    capacity INTEGER DEFAULT 4
  );

  -- Orders
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    table_id INTEGER,
    total_amount REAL NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
    payment_status TEXT DEFAULT 'unpaid' CHECK(payment_status IN ('unpaid', 'paid')),
    payment_method TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    created_by INTEGER,
    notes TEXT,
    FOREIGN KEY (table_id) REFERENCES restaurant_tables(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
  );

  -- Order items
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    menu_item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price REAL NOT NULL,
    subtotal REAL NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'preparing', 'ready')),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
  );

  -- Daily sales summary
  CREATE TABLE IF NOT EXISTS daily_sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE UNIQUE NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_revenue REAL DEFAULT 0,
    cash_revenue REAL DEFAULT 0,
    card_revenue REAL DEFAULT 0
  );
`);

console.log('Database tables created successfully!');

// Insert default admin user (password: admin123)
const insertAdmin = db.prepare(`
  INSERT OR IGNORE INTO users (username, password, role)
  VALUES (?, ?, ?)
`);
insertAdmin.run('admin', 'admin123', 'admin');
insertAdmin.run('cashier', 'cashier123', 'cashier');
insertAdmin.run('kitchen', 'kitchen123', 'kitchen');

console.log('Default users created!');

// Insert categories
const insertCategory = db.prepare(`
  INSERT OR IGNORE INTO categories (id, name, name_ar, name_ku, display_order)
  VALUES (?, ?, ?, ?, ?)
`);

insertCategory.run(1, 'Pizza', 'بيتزا', 'پیتزا', 1);
insertCategory.run(2, 'Doner', 'دونر', 'دۆنەر', 2);
insertCategory.run(3, 'Kurdish Food', 'الطعام الكردي', 'خواردنی کوردی', 3);
insertCategory.run(4, 'Arabic Food', 'الطعام العربي', 'خواردنی عەرەبی', 4);

console.log('Categories created!');

// Insert sample menu items
const insertMenuItem = db.prepare(`
  INSERT OR IGNORE INTO menu_items (id, name, name_ar, name_ku, description, description_ar, description_ku, price, category_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Pizza
insertMenuItem.run(1, 'Margherita Pizza', 'بيتزا مارغريتا', 'پیتزای مارگەریتا', 'Classic tomato, mozzarella, basil', 'طماطم، موزاريلا، ريحان', 'تەماتە، مۆزارێلا، ڕەیحان', 12.99, 1);
insertMenuItem.run(2, 'Pepperoni Pizza', 'بيتزا ببروني', 'پیتزای پێپەرۆنی', 'Pepperoni, cheese, tomato sauce', 'ببروني، جبن، صلصة طماطم', 'پێپەرۆنی، پەنیر، سۆسی تەماتە', 14.99, 1);
insertMenuItem.run(3, 'Vegetarian Pizza', 'بيتزا نباتية', 'پیتزای ڕووەکی', 'Mixed vegetables, cheese', 'خضروات مشكلة، جبن', 'سەوزەی تێکەڵ، پەنیر', 13.99, 1);
insertMenuItem.run(4, 'Meat Lovers Pizza', 'بيتزا محبي اللحوم', 'پیتزای خۆشەویستانی گۆشت', 'Beef, chicken, sausage, cheese', 'لحم بقر، دجاج، سجق، جبن', 'گۆشتی مانگا، مریشک، سووجووق، پەنیر', 16.99, 1);

// Doner
insertMenuItem.run(5, 'Chicken Doner Wrap', 'لفة دونر دجاج', 'دۆنەری مریشک', 'Grilled chicken, vegetables, sauce', 'دجاج مشوي، خضروات، صلصة', 'مریشکی برژاو، سەوزە، سۆس', 8.99, 2);
insertMenuItem.run(6, 'Beef Doner Wrap', 'لفة دونر لحم', 'دۆنەری گۆشت', 'Grilled beef, vegetables, sauce', 'لحم بقر مشوي، خضروات، صلصة', 'گۆشتی برژاو، سەوزە، سۆس', 9.99, 2);
insertMenuItem.run(7, 'Mixed Doner Plate', 'صحن دونر مختلط', 'قاپی دۆنەری تێکەڵ', 'Chicken and beef with rice', 'دجاج ولحم مع أرز', 'مریشک و گۆشت لەگەڵ برنج', 15.99, 2);

// Kurdish Food
insertMenuItem.run(8, 'Dolma', 'دولمة', 'دۆڵمە', 'Stuffed grape leaves with rice and meat', 'ورق عنب محشي بالأرز واللحم', 'گەڵای مێو پڕکراو بە برنج و گۆشت', 11.99, 3);
insertMenuItem.run(9, 'Biryani', 'برياني', 'بریانی', 'Spiced rice with chicken or lamb', 'أرز متبل مع دجاج أو لحم ضأن', 'برنجی بۆنخۆش لەگەڵ مریشک یان بەرخ', 13.99, 3);
insertMenuItem.run(10, 'Kubba', 'كبة', 'کوبا', 'Bulgur shells stuffed with meat', 'أقراص البرغل محشوة باللحم', 'قاوەی پڕکراو بە گۆشت', 10.99, 3);
insertMenuItem.run(11, 'Tepsi', 'طبسي', 'تەپسی', 'Baked meat with vegetables', 'لحم مخبوز مع خضروات', 'گۆشتی کولاو لەگەڵ سەوزە', 14.99, 3);

// Arabic Food
insertMenuItem.run(12, 'Shawarma', 'شاورما', 'شاوەرما', 'Marinated meat wrap with garlic sauce', 'لفة لحم متبل مع صلصة الثوم', 'گۆشتی نومکراو لەگەڵ سۆسی سیر', 9.99, 4);
insertMenuItem.run(13, 'Falafel Plate', 'صحن فلافل', 'قاپی فەلافڵ', 'Fried chickpea balls with tahini', 'كرات حمص مقلية مع طحينة', 'گۆی نۆکی سوورکراو لەگەڵ تەحینە', 8.99, 4);
insertMenuItem.run(14, 'Hummus with Meat', 'حمص باللحم', 'هومس بە گۆشت', 'Chickpea puree topped with spiced meat', 'هريس الحمص مع لحم متبل', 'هەریسەی نۆک لەگەڵ گۆشتی بۆنخۆش', 12.99, 4);
insertMenuItem.run(15, 'Kebab Platter', 'صحن كباب', 'قاپی کەباب', 'Grilled meat skewers with rice', 'أسياخ لحم مشوي مع أرز', 'سیخی گۆشتی برژاو لەگەڵ برنج', 16.99, 4);

console.log('Sample menu items created!');

// Insert 15 tables
const insertTable = db.prepare(`
  INSERT OR IGNORE INTO restaurant_tables (id, table_number, status, capacity)
  VALUES (?, ?, ?, ?)
`);

for (let i = 1; i <= 15; i++) {
  insertTable.run(i, i, 'available', 4);
}

console.log('15 tables created!');

console.log('\n✅ Database initialization complete!');
console.log('\nDefault login credentials:');
console.log('Admin    - username: admin    password: admin123');
console.log('Cashier  - username: cashier  password: cashier123');
console.log('Kitchen  - username: kitchen  password: kitchen123');

db.close();
