const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  role: { type: String, default: 'doctor' }
}, { timestamps: true });

// ✅ SAHI TARIKA: Async use kar rahe ho toh 'next' ki zaroorat nahi hai
doctorSchema.pre('save', async function() {
  // Agar password badla nahi hai toh yahi se return ho jao
  if (!this.isModified('password')) return;

  // Password hash karo
  this.password = await bcrypt.hash(this.password, 10);
  
  // Async function mein 'next()' call karne ki zaroorat nahi hoti, 
  // function khatam hote hi Mongoose apne aap aage badh jata hai.
});

module.exports = mongoose.model('Doctor', doctorSchema);