# 🍽️ Restaurant Management System

A complete, production-ready restaurant management system for a 15-table restaurant serving Pizza, Doner, Kurdish, and Arabic food. Works **100% offline** without internet connection.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### Core Functionality
- **🛒 Point of Sale (POS)** - Take orders, process payments (cash/card)
- **🪑 Table Management** - Track 15 tables with real-time status updates
- **👨‍🍳 Kitchen Display System** - Real-time order management for kitchen staff
- **📋 Menu Management** - Full CRUD operations for menu items
- **💵 Payment Processing** - Support for cash and card payments
- **📊 Reports & Analytics** - Daily and weekly sales reports with detailed analytics
- **🧾 Receipt Printing** - Print receipts and kitchen orders

### Technical Features
- **🔌 Works Offline** - Fully functional local system, no internet required
- **📱 Responsive Design** - Works on tablets, computers, and touch screens
- **🌍 Multi-Language** - English, Arabic, and Kurdish with RTL support
- **⚡ Real-Time Updates** - Socket.IO for instant communication between stations
- **👥 User Roles** - Admin, Cashier, and Kitchen roles with permissions
- **💾 Local Database** - SQLite database for reliable data storage
- **🎨 Modern UI** - Clean, intuitive interface with touch-friendly buttons

## 🎯 User Roles

### Admin
- Full access to all features
- POS and order management
- Menu management (add, edit, delete items)
- View reports and analytics
- Table management

### Cashier
- POS system access
- Create and manage orders
- Process payments
- View and manage tables

### Kitchen
- Kitchen display system
- View incoming orders
- Update order status (pending → preparing → ready)
- Audio notifications for new orders

## 🏗️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Better-SQLite3** - Fast, synchronous SQLite database
- **Socket.IO** - Real-time bidirectional communication
- **UUID** - Unique ID generation

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **i18next** - Internationalization framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client

### Database
- **SQLite** - Embedded database (no separate server needed)

## 📋 Prerequisites

- **Node.js** version 16 or higher
- **npm** version 7 or higher

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
# From the restaurant-system directory
npm run install-all
```

This command installs dependencies for:
- Root project
- Backend server
- Frontend client

### 2. Initialize Database

```bash
cd server
npm run init-db
cd ..
```

This creates the SQLite database with:
- Database schema (tables, orders, menu items, users)
- Default user accounts
- Sample menu items (Pizza, Doner, Kurdish Food, Arabic Food)
- 15 restaurant tables

### 3. Start the Application

#### Development Mode (for testing)
```bash
# From root directory - runs both server and client
npm run dev
```

This starts:
- Backend server on `http://localhost:3000`
- Frontend client on `http://localhost:5173`

The browser will automatically open to the client URL.

#### Production Mode
```bash
# Build the frontend
npm run build

# Start the server (serves built frontend)
npm start
```

Access the application at `http://localhost:3000`

## 🔐 Default Login Credentials

| Role    | Username | Password    | Access                      |
|---------|----------|-------------|-----------------------------|
| Admin   | admin    | admin123    | Full access to all features |
| Cashier | cashier  | cashier123  | POS and table management    |
| Kitchen | kitchen  | kitchen123  | Kitchen display only        |

**⚠️ Important:** Change these passwords in production!

## 📱 Using the System

### For Cashiers (Taking Orders)

1. **Login** with cashier credentials
2. **Navigate to POS** (📱 icon in sidebar)
3. **Select a category** (Pizza, Doner, Kurdish Food, Arabic Food)
4. **Click menu items** to add to cart
5. **Select a table** from dropdown
6. **Add notes** if needed
7. **Click "New Order"** to send to kitchen
8. **Process payment** - Choose Cash or Card

### For Kitchen Staff

1. **Login** with kitchen credentials
2. View orders in **3 columns**:
   - **Pending** - New orders waiting to start
   - **Preparing** - Currently being prepared
   - **Ready** - Completed orders
3. **Click "Start Preparing"** to begin cooking
4. **Click "Mark Ready"** when order is complete
5. **Audio notification** plays for new orders

### For Admins (Managing the System)

#### Menu Management
1. Navigate to **Menu** (📋 icon)
2. **Add new items** with multi-language support
3. **Edit existing items** (name, price, availability)
4. **Filter by category**

#### View Reports
1. Navigate to **Reports** (📊 icon)
2. View:
   - Daily sales summary
   - Top selling items
   - Revenue by category
   - Orders by hour
   - Weekly trends
3. **Select date** to view historical data
4. **Print reports** for record keeping

## 📂 Project Structure

```
restaurant-system/
├── server/                 # Backend Node.js server
│   ├── server.js          # Main server file with API routes
│   ├── initDatabase.js    # Database initialization script
│   ├── restaurant.db      # SQLite database (created on init)
│   └── package.json       # Server dependencies
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── POS.jsx
│   │   │   ├── Tables.jsx
│   │   │   ├── Kitchen.jsx
│   │   │   ├── MenuManagement.jsx
│   │   │   └── Reports.jsx
│   │   ├── App.jsx        # Main app component with routing
│   │   ├── main.jsx       # React entry point
│   │   ├── i18n.js        # Multi-language configuration
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Client dependencies
├── package.json           # Root package with scripts
└── README.md             # This file
```

## 🗄️ Database Schema

### Tables
- **users** - User accounts (admin, cashier, kitchen)
- **categories** - Menu categories with translations
- **menu_items** - Menu items with multi-language support
- **restaurant_tables** - 15 tables with status tracking
- **orders** - Customer orders with payment info
- **order_items** - Individual items in each order
- **daily_sales** - Aggregated sales data

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session/:id` - Validate session

### Menu
- `GET /api/categories` - Get all categories
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single item
- `POST /api/menu` - Add menu item (admin only)
- `PUT /api/menu/:id` - Update menu item (admin only)
- `DELETE /api/menu/:id` - Delete menu item (admin only)

### Tables
- `GET /api/tables` - Get all tables with status
- `PUT /api/tables/:id/status` - Update table status

### Orders
- `GET /api/orders` - Get orders (with filters)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/payment` - Process payment

### Reports
- `GET /api/reports/daily` - Daily sales report
- `GET /api/reports/weekly` - Weekly sales data

### Kitchen
- `GET /api/kitchen/orders` - Active orders for kitchen

## 🔧 Configuration

### Change Server Port

Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

Or set environment variable:
```bash
PORT=8080 npm start
```

### Change Language Default

Edit `client/src/i18n.js`:
```javascript
lng: localStorage.getItem('language') || 'en', // Change 'en' to 'ar' or 'ku'
```

### Add More Tables

Edit `server/initDatabase.js` and change the loop:
```javascript
for (let i = 1; i <= 20; i++) { // Change 15 to 20 for 20 tables
  insertTable.run(i, i, 'available', 4);
}
```

Then reinitialize database.

## 🖨️ Printing Setup

### Receipt Printing
The system supports browser printing. To set up:

1. **Configure your printer** in the operating system
2. **Set up print CSS** (already included in the application)
3. **Click Print button** in the POS or Reports screen
4. Browser print dialog will open with formatted content

### For Automatic Printing
To automatically print receipts, you can integrate with:
- ESC/POS thermal printers
- Network printers via CUPS (Linux)
- USB receipt printers

## 🚀 Deployment

### Option 1: Local Computer/Tablet

1. **Install Node.js** on the target device
2. **Copy the entire project folder** to the device
3. **Run installation** steps above
4. **Start in production mode**: `npm start`
5. **Access** at `http://localhost:3000`
6. **(Optional)** Set up as a system service to auto-start

### Option 2: Network Access

To access from multiple devices on the same network:

1. **Find your computer's local IP** address:
   ```bash
   # Linux/Mac
   ifconfig | grep inet

   # Windows
   ipconfig
   ```

2. **Update server** to listen on all interfaces.
   Edit `server/server.js`:
   ```javascript
   server.listen(PORT, '0.0.0.0', () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

3. **Start the server**: `npm start`

4. **Access from other devices**: `http://YOUR_IP_ADDRESS:3000`
   Example: `http://192.168.1.100:3000`

### Option 3: Windows Service (Auto-start)

Use a tool like `node-windows` to run as a Windows service.

### Option 4: Linux Service (systemd)

Create a systemd service file to auto-start on boot.

## 🔒 Security Recommendations

For production use:

1. **Change default passwords** immediately
2. **Use HTTPS** if accessing over network
3. **Implement proper password hashing** (current system uses plain text)
4. **Regular database backups** of `restaurant.db`
5. **Restrict network access** to trusted devices only
6. **Update dependencies** regularly: `npm update`

## 🐛 Troubleshooting

### Database Issues
```bash
# Reinitialize database (WARNING: deletes all data)
cd server
rm restaurant.db
npm run init-db
cd ..
```

### Port Already in Use
```bash
# Kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=8080 npm start
```

### Dependencies Not Installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Socket.IO Connection Issues
- Check firewall settings
- Ensure server is running
- Verify correct URL in client

## 📊 Backup & Data Management

### Backup Database
```bash
# The database file is located at:
server/restaurant.db

# Create backup
cp server/restaurant.db server/restaurant.db.backup
```

### Restore Database
```bash
cp server/restaurant.db.backup server/restaurant.db
```

### Export Reports
Use the Print function in the Reports page to save as PDF.

## 🤝 Support & Contribution

### Getting Help
- Check this README for common issues
- Review the code comments for technical details
- Test with demo accounts first

### Future Enhancements
Possible additions:
- Customer management
- Inventory tracking
- Employee time tracking
- Loyalty programs
- Online ordering integration
- Multiple branch support
- Cloud backup option

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

## 🎉 Quick Start Summary

```bash
# 1. Install dependencies
npm run install-all

# 2. Initialize database
cd server && npm run init-db && cd ..

# 3. Start the application
npm run dev

# 4. Login with:
# Username: admin | Password: admin123

# 5. Access at: http://localhost:5173
```

---

**Built with ❤️ for restaurant management**

For questions or issues, refer to the documentation above or check the code comments.
