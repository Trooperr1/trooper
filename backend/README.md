# Coiffure Melimelo Backend API

A comprehensive RESTful API for managing appointments, services, team members, and contact messages for Coiffure Melimelo barber shop.

## 🚀 Features

- **Appointment Management**: Create, read, update, and delete appointments
- **Service Management**: Manage barber shop services
- **Team Management**: Handle team member profiles
- **Contact Management**: Process contact form submissions
- **Email Notifications**: Automated email notifications for appointments and contacts
- **Availability Checking**: Check available time slots for specific barbers
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Robust error handling middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/coiffure-melimelo

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@coiffuremelimelo.ch

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

4. **Start MongoDB**:
```bash
# On Linux/Mac
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. **Seed the database** (optional):
```bash
npm run seed
```

6. **Start the development server**:
```bash
npm run dev
```

The server will be running at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 🏥 Health Check
- **GET** `/api/health` - Check if the server is running

#### 📅 Appointments

- **POST** `/api/appointments` - Create a new appointment
  ```json
  {
    "customerName": "John Doe",
    "customerPhone": "+41 76 123 45 67",
    "customerEmail": "john@example.com",
    "barber": {
      "name": "Kamaran",
      "phone": "+41788700244"
    },
    "appointmentDate": "2025-11-01",
    "appointmentTime": "14:30",
    "service": "Coupe + Barbe - 40 CHF",
    "message": "Optional message"
  }
  ```

- **GET** `/api/appointments` - Get all appointments
  - Query params: `barber`, `date`, `status`, `page`, `limit`

- **GET** `/api/appointments/:id` - Get single appointment

- **PUT** `/api/appointments/:id` - Update appointment

- **DELETE** `/api/appointments/:id` - Delete appointment

- **GET** `/api/appointments/availability/:barber/:date` - Get available time slots
  - Example: `/api/appointments/availability/Kamaran/2025-11-01`

#### ✂️ Services

- **GET** `/api/services` - Get all services
  - Query params: `isActive`

- **GET** `/api/services/:id` - Get single service

- **POST** `/api/services` - Create new service
  ```json
  {
    "name": "Premium Cut",
    "description": "Luxury haircut service",
    "price": 50,
    "currency": "CHF",
    "duration": 60,
    "icon": "✂️"
  }
  ```

- **PUT** `/api/services/:id` - Update service

- **DELETE** `/api/services/:id` - Delete service

#### 👥 Team Members

- **GET** `/api/team` - Get all team members
  - Query params: `isActive`

- **GET** `/api/team/:id` - Get single team member

- **POST** `/api/team` - Create new team member
  ```json
  {
    "name": "John Smith",
    "experience": 10,
    "phone": "+41 76 123 45 67",
    "whatsappNumber": "41761234567",
    "email": "john@example.com",
    "photoUrl": "https://example.com/photo.jpg",
    "specialties": ["Fade", "Beard Trim"],
    "bio": "Experienced barber"
  }
  ```

- **PUT** `/api/team/:id` - Update team member

- **DELETE** `/api/team/:id` - Delete team member

#### 📧 Contact Messages

- **POST** `/api/contact` - Create new contact message
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+41 76 123 45 67",
    "subject": "Question about services",
    "message": "I would like to know more about..."
  }
  ```

- **GET** `/api/contact` - Get all contact messages
  - Query params: `status`, `page`, `limit`

- **GET** `/api/contact/:id` - Get single contact message

- **PUT** `/api/contact/:id` - Update contact message (reply)
  ```json
  {
    "status": "replied",
    "reply": "Thank you for your message..."
  }
  ```

- **DELETE** `/api/contact/:id` - Delete contact message

### Response Format

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": [ ... ] // For validation errors
}
```

## 🗄️ Database Models

### Appointment Schema
```javascript
{
  customerName: String (required),
  customerPhone: String (required),
  customerEmail: String,
  barber: {
    name: String (required),
    phone: String (required)
  },
  appointmentDate: Date (required),
  appointmentTime: String (required),
  service: String (required),
  message: String,
  status: ['pending', 'confirmed', 'completed', 'cancelled'],
  notificationSent: Boolean,
  timestamps: true
}
```

### Service Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  currency: String (default: 'CHF'),
  duration: Number (minutes),
  icon: String,
  isActive: Boolean,
  order: Number,
  timestamps: true
}
```

### TeamMember Schema
```javascript
{
  name: String (required),
  experience: Number (required),
  phone: String (required),
  whatsappNumber: String (required),
  email: String,
  photoUrl: String,
  specialties: [String],
  bio: String,
  isActive: Boolean,
  order: Number,
  workingHours: {
    monday: Boolean,
    tuesday: Boolean,
    ...
  },
  timestamps: true
}
```

### Contact Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String,
  message: String (required),
  status: ['new', 'read', 'replied'],
  reply: String,
  timestamps: true
}
```

## 📧 Email Configuration

The API sends automated emails for:
- Appointment confirmations (to customers)
- New appointment notifications (to barbers)
- Contact form submissions (to admin)

### Setting up Gmail SMTP

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings → Security
   - Click on "App passwords"
   - Generate a new password for "Mail"
3. Use the generated password in your `.env` file

## 🔒 Security Considerations

**IMPORTANT**: In production, you should:

1. Add authentication middleware for protected routes
2. Use HTTPS for all communications
3. Implement rate limiting
4. Add input sanitization
5. Use environment-specific configurations
6. Implement proper CORS policies
7. Add request logging
8. Set up monitoring and alerting

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test
```

## 📦 Deployment

### Using PM2 (Process Manager)

1. Install PM2:
```bash
npm install -g pm2
```

2. Start the application:
```bash
pm2 start src/server.js --name coiffure-api
```

3. Save the process list:
```bash
pm2 save
```

### Using Docker

1. Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

2. Build and run:
```bash
docker build -t coiffure-api .
docker run -p 5000:5000 --env-file .env coiffure-api
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
FRONTEND_URL=https://coiffuremelimelo.ch
# ... other production configs
```

## 📝 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run seed` - Seed the database with initial data
- `npm test` - Run tests

## 🔄 Business Hours

The shop is open:
- **Tuesday - Friday**: 09:00 - 19:00
- **Saturday**: 08:30 - 18:00
- **Sunday & Monday**: Closed

Time slots are automatically generated at 30-minute intervals during business hours.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC

## 👥 Support

For support, email: rahimshuana@gmail.com

## 🎯 Roadmap

- [ ] Add authentication and authorization
- [ ] Implement SMS notifications via Twilio
- [ ] Add WhatsApp Business API integration
- [ ] Create admin dashboard
- [ ] Add analytics and reporting
- [ ] Implement payment integration
- [ ] Add customer loyalty program
- [ ] Multi-language support
- [ ] Mobile app API support

---

**Developed with ❤️ for Coiffure Melimelo**
