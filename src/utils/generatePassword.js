// File: src/utils/generatePassword.js
const generatePassword = () => {
  return Math.random().toString(36).slice(-8); 
};

module.exports = generatePassword; // 👈 Ye line check karo