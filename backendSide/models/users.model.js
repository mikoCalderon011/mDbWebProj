const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRole = Number(process.env.ROLE_USER);
const adminRole = Number(process.env.ROLE_ADMIN);

const userSchema = new Schema({
   full_name: { type: String, required: true, maxLength: 420 },
   email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
   password: { type: String, required: true, minLength: 8, maxLength: 64  },
   profile: { type: String },
   roles: { 
      type: [Number], 
      enum: [userRole, adminRole], 
      default: [userRole] 
   },
   refreshToken: { type: String }
});

module.exports = mongoose.model("Users", userSchema)