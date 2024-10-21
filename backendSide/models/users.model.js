const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   full_name: { type: String, required: true, maxLength: 420 },
   email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
   password: { type: String, required: true, minLength: 8, maxLength: 64  },
   profile: { type: String },
   role: { 
      type: [String], 
      enum: ['user', 'admin'], 
      default: ['user'] 
   },
   refreshToken: { type: String }
});

module.exports = mongoose.model("Users", userSchema)