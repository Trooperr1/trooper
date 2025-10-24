# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Local Development (Recommended for Development)

1. **Install MongoDB**:
```bash
# On macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# On Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
```bash
# The .env file is already created with default values
# Update it with your email credentials if you want email notifications
nano .env
```

4. **Seed the database**:
```bash
npm run seed
```

5. **Start the server**:
```bash
npm run dev
```

6. **Test the API**:
```bash
curl http://localhost:5000/api/health
```

### Option 2: Using Docker (Recommended for Production)

1. **Start everything with Docker Compose**:
```bash
docker-compose up -d
```

2. **Seed the database**:
```bash
docker-compose exec api npm run seed
```

3. **View logs**:
```bash
docker-compose logs -f api
```

4. **Stop everything**:
```bash
docker-compose down
```

## 🧪 Testing the API

### Using cURL

**Health Check**:
```bash
curl http://localhost:5000/api/health
```

**Get All Services**:
```bash
curl http://localhost:5000/api/services
```

**Create Appointment**:
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerPhone": "+41 76 123 45 67",
    "customerEmail": "john@example.com",
    "barber": {
      "name": "Kamaran",
      "phone": "+41788700244"
    },
    "appointmentDate": "2025-11-01",
    "appointmentTime": "14:30",
    "service": "Coupe + Barbe - 40 CHF"
  }'
```

**Get Available Slots**:
```bash
curl http://localhost:5000/api/appointments/availability/Kamaran/2025-11-01
```

### Using Postman

1. Import the `postman_collection.json` file into Postman
2. The collection includes all API endpoints with example requests
3. Update the `base_url` variable if needed (default: http://localhost:5000)

## 📊 Database Seeding

The seeder script populates the database with:
- 7 default services (La Coupe, La Barbe, etc.)
- 3 team members (Kamaran, Hassan, Shuana)

Run it with:
```bash
npm run seed
```

## 🔧 Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running:
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change the PORT in `.env` file or kill the process using port 5000:
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Email Sending Fails
**Solution**:
- Make sure you've set up App Password in Gmail
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`
- For development, email errors won't stop the API from working

## 📱 Integrating with Frontend

Update your frontend to call the API:

```javascript
// Example: Create appointment
const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Appointment created:', data.data);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Example: Get all services
const getServices = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/services');
    const data = await response.json();

    if (data.success) {
      console.log('Services:', data.data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🎯 Next Steps

1. ✅ API is running
2. ⬜ Update `.env` with real email credentials
3. ⬜ Test all endpoints with Postman
4. ⬜ Integrate with frontend
5. ⬜ Add authentication for admin routes
6. ⬜ Deploy to production

## 📚 Further Reading

- [Full API Documentation](./README.md)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)

---

**Need Help?** Check the [README.md](./README.md) for detailed documentation or contact: rahimshuana@gmail.com
