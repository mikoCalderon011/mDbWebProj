const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genresSchema = new Schema({
   id: { type: Number, required: true },
   name: { type: String, required: true }
});


module.exports = genresSchema;