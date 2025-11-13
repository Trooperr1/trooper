# 🚀 Quick Setup Guide

This guide will help you set up the Restaurant Management System in under 5 minutes.

## Prerequisites Check

Before starting, ensure you have Node.js installed:

```bash
node --version  # Should be v16 or higher
npm --version   # Should be v7 or higher
```

If not installed, download from: https://nodejs.org/

## Step-by-Step Setup

### 1. Install All Dependencies (2 minutes)

```bash
cd restaurant-system
npm run install-all
```

This installs dependencies for the server and client.

### 2. Create Database (30 seconds)

```bash
cd server
npm run init-db
cd ..
```

You should see:
```
✅ Database initialization complete!

Default login credentials:
Admin    - username: admin    password: admin123
Cashier  - username: cashier  password: cashier123
Kitchen  - username: kitchen  password: kitchen123
```

### 3. Start the Application (10 seconds)

```bash
npm run dev
```

The application will start:
- Backend server: http://localhost:3000
- Frontend client: http://localhost:5173 (opens automatically)

## First Login

1. **Browser opens** to http://localhost:5173
2. **Select language** (English, Arabic, or Kurdish)
3. **Login** with:
   - Username: `admin`
   - Password: `admin123`

## Test the System

### Test POS (Cashier)

1. Go to **POS** in the sidebar
2. Select **Pizza** category
3. Click on **Margherita Pizza** to add to cart
4. Select **Table 1** from dropdown
5. Click **New Order**
6. Click **Cash** to complete payment

### Test Kitchen Display

1. **Logout** (bottom of sidebar)
2. **Login** with:
   - Username: `kitchen`
   - Password: `kitchen123`
3. You'll see the order you just created
4. Click **Start Preparing**
5. Click **Mark Ready**

### Test Reports (Admin)

1. **Logout** and login as **admin**
2. Go to **Reports** in sidebar
3. View today's sales data

## Production Deployment

When ready for production use:

```bash
# Build the frontend
npm run build

# Start in production mode
npm start
```

Access at: http://localhost:3000

## Network Access (Multiple Devices)

To access from tablets/other computers on the same network:

1. **Find your computer's IP address:**

   **Windows:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address"

   **Mac/Linux:**
   ```bash
   ifconfig | grep inet
   ```
   Look for IP like 192.168.x.x

2. **Start the server** (it already listens on all interfaces)

3. **Access from other devices:**
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: http://192.168.1.100:3000

## Troubleshooting

### Port 3000 Already in Use?

**Option 1: Use different port**
```bash
PORT=8080 npm start
```

**Option 2: Kill the process (Mac/Linux)**
```bash
lsof -ti:3000 | xargs kill -9
```

**Option 3: Kill the process (Windows)**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Can't Access from Other Devices?

1. **Check firewall** - Allow port 3000
2. **Same network** - Ensure devices are on same WiFi/LAN
3. **Correct IP** - Use `ipconfig` or `ifconfig` to verify IP

### Database Error?

Reinitialize database:
```bash
cd server
rm restaurant.db
npm run init-db
cd ..
```

## Daily Operations

### Starting the System Daily

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

### Backup Database

```bash
# Create dated backup
cp server/restaurant.db backups/restaurant_$(date +%Y%m%d).db
```

### View Logs

The terminal running `npm start` shows all activity logs.

## Default Data

The system comes pre-loaded with:

- **15 tables** (Table 1-15)
- **4 categories** (Pizza, Doner, Kurdish Food, Arabic Food)
- **15 menu items** (sample items in each category)
- **3 user accounts** (admin, cashier, kitchen)

## Next Steps

1. **Customize menu** - Login as admin → Menu → Add/Edit items
2. **Change passwords** - For security (currently in database)
3. **Test workflow** - Create orders, process payments, use kitchen display
4. **Train staff** - Show them the interface
5. **Setup printer** - Configure receipt printing

## Common Workflows

### Taking an Order (Cashier)
1. POS → Select category → Add items to cart
2. Select table → Add notes (if needed)
3. New Order → Choose payment method

### Preparing Order (Kitchen)
1. Kitchen Display → See new orders (hear notification)
2. Start Preparing → Work on order
3. Mark Ready → Notify cashier

### Managing Menu (Admin)
1. Menu → Add Menu Item
2. Fill in details in all languages
3. Set price and category
4. Save

### Viewing Sales (Admin)
1. Reports → Select date
2. View statistics
3. Print report

## Support

For detailed information, see **README.md**

## Success Checklist

- [ ] Node.js installed (v16+)
- [ ] Dependencies installed (`npm run install-all`)
- [ ] Database initialized (`npm run init-db`)
- [ ] Server started (`npm run dev`)
- [ ] Can login with admin/admin123
- [ ] Can create test order in POS
- [ ] Can see order in kitchen display
- [ ] Can view reports

---

**✅ Setup Complete!** You're ready to manage your restaurant.
