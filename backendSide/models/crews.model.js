const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crewsSchema = new Schema({
   adult: { type: Boolean, default: false },
   gender: { type: Number, required: true },
   id: { type: Number },
   // mongo_id: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'Person' },
   known_for_department: { type: String, required: true },
   name: { type: String},
   original_name: { type: String },
   popularity: { type: Number, default: 0.0 },
   profile_path: { type: String, default: null },
   credit_id: { type: String },
   department: { type: String },
   job:  { type: String },
});

module.exports = crewsSchema;