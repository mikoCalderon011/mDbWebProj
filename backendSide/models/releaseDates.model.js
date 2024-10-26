const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const releaseDateSchema = new Schema({
   certification: { type: String, required: true },
   descriptors: { type: [String], default: [] },
   iso_639_1: { type: String, default: "" },
   note: { type: String, default: "" },
   release_date: { type: Date, required: true },
   type: { type: Number, required: true }
});

const resultSchema = new mongoose.Schema({
   iso_3166_1: { type: String, required: true },
   release_dates: { type: [releaseDateSchema], required: true }
});

const releaseDatesSchema = new mongoose.Schema({
   results: { type: [resultSchema], required: true }
});

module.exports = releaseDatesSchema;