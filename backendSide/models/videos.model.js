const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videosSchema = new Schema({
   iso_639_1: { type: String },
   iso_3166_1: { type: String },
   name: { type: String, required: true },
   key: { type: String, required: true },
   site: { type: String, required: true },
   size: { type: Number, required: true },  
   type: { type: String, required: true },
   official: { type: Boolean, default: false },
   published_at: { type: Date }
});

module.exports = videosSchema;