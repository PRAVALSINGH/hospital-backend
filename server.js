const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Pehle Config load karo taaki process.env mil sake
dotenv.config();

// 2. Phir Database aur Routes import karo
const connectDB = require('./src/config/db');
const doctorRoutes = require('./src/modules/doctor/doctor.routes');
const patientRoutes = require('./src/modules/patient/patient.routes');
// Database Connect karein
connectDB();

const app = express();

// 3. Middlewares
app.use(cors()); // Frontend connection ke liye
app.use(express.json()); // JSON parse karne ke liye

// Debugging ke liye (Optional)
console.log("Checking Routes:", doctorRoutes);

// 4. API Routes
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/patients', patientRoutes);
// Health Check Route
app.get('/', (req, res) => {
  res.send('MedCare Hospital API is running...');
});

// 5. ⚠️ Global Error Handler (Express 5.x ke liye Zaroori)
// Ye middleware 'next(error)' ko handle karega
app.use((err, req, res, next) => {
  console.error("💥 Backend Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});