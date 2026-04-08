const Patient = require('./patient.model');
const jwt = require('jsonwebtoken');

// Token Generator Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new patient
exports.registerPatient = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await Patient.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const patient = await Patient.create({ name, email, password, phone });

    res.status(201).json({
      success: true,
      token: generateToken(patient._id),
      data: { id: patient._id, name: patient.name, email: patient.email }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login patient
exports.loginPatient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (patient && (await patient.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(patient._id),
        data: { id: patient._id, name: patient.name, email: patient.email }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};