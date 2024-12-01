const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// In casts.model.js
const castsSchema = new Schema({
   adult: { type: Boolean, default: false },
   gender: { type: Number, default: null },
   id: { type: Number, default: null },
   known_for_department: { type: String, default: null },
   name: { type: String, default: null },
   original_name: { type: String, default: null },
   popularity: { type: Number, default: 0.0 },
   profile_path: { type: String, default: null },
   cast_id: { type: Number, default: null },
   character: { type: String, default: null },
   credit_id: { type: String, default: null },
   order: { type: Number, default: null }
}, { strict: false });


module.exports = castsSchema;