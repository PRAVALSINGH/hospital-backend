const Doctor = require('./doctor.model');
const sendEmail = require('../../utils/sendEmail');
const generatePassword = require('../../utils/generatePassword');

exports.addDoctor = async (req, res, next) => {
  try {
    const { name, email, specialization, experience } = req.body;

    // 1. Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // 2. Generate Temporary Password
    const tempPassword = generatePassword();

    // 3. Create Doctor in DB
    const newDoctor = await Doctor.create({
      name,
      email,
      password: tempPassword,
      specialization,
      experience
    });

    // 4. Send Credentials via Email
    const emailMessage = `
      <h1>Welcome to MedCare, Dr. ${name}</h1>
      <p>Your account has been created by the Admin.</p>
      <p><strong>Login Credentials:</strong></p>
      <ul>
        <li>Email: ${email}</li>
        <li>Temporary Password: ${tempPassword}</li>
      </ul>
      <p>Please change your password after your first login.</p>
    `;

    await sendEmail({
      email: email,
      subject: "MedCare Hospital - Your Login Credentials",
      message: emailMessage
    });

    // ✅ Response hamesha return karo professional practice ke liye
    return res.status(201).json({ 
      success: true, 
      message: "Doctor added and credentials sent to email" 
    });

  } catch (error) {
    // ⚠️ YE LINE BADLO: Express 5 mein next(error) zaroori hai
    next(error); 
  }
};

exports.getAllDoctors = async (req, res) => {
    const doctors = await Doctor.find().select('-password'); // Password hide rakhenge
    res.status(200).json(doctors);
};