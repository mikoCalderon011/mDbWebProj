const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genresSchema = require('./genres.model');

const resultSchema = new Schema({
   backdrop_path: { type: String, default: null },
   id: { type: Number, required: true },
   title: { type: String },
   original_title: { type: String },
   overview: { type: String },
   poster_path: { type: String, default: null },
   media_type: { type: String, required: true },
   adult: { type: Boolean, default: false },
   original_language: { type: String },
   genre_ids: [genresSchema],
   popularity: { type: Number },
   release_date: { type: Date },
   video: { type: Boolean, default: false },
   vote_average: { type: Number },
   vote_count: { type: Number }
});

const recommendationsSchema = new Schema({
   result: [resultSchema]
});

module.exports = recommendationsSchema;