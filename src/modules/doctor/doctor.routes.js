const express = require('express');
const router = express.Router();
const doctorController = require('./doctor.controller');

// Dhyan de: Yahan function ke peeche () nahi lagana hai
router.post('/add', doctorController.addDoctor); 
router.get('/list', doctorController.getAllDoctors);

module.exports = router;