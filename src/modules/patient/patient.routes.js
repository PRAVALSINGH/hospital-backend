const express = require('express');
const router = express.Router();
const { registerPatient, loginPatient } = require('./patient.controller');

router.post('/register', registerPatient);
router.post('/login', loginPatient);

module.exports = router;