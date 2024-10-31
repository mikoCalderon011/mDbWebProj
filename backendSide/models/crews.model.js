const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crewsSchema = new Schema({
   adult: { type: Boolean, required: true, default: false },
   gender: { type: Number, required: true },
   id: { type: Number, required: true, unique: true },
   // mongo_id: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'Person' },
   known_for_department: { type: String, required: true },
   name: { type: String, required: true },
   original_name: { type: String, required: true, },
   popularity: { type: Number, default: 0.0 },
   profile_path: { type: String, default: null },
   credit_id: { type: String, required: true },
   department: { type: String, required: true },
   job:  { type: String, required: true },
});

module.exports = crewsSchema;