const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For later...
// const productionCompanySchema = new mongoose.Schema({
//    id: { type: Number, required: true },
//    logo_path: { type: String, default: null }, // Can be null if there's no logo
//    name: { type: String, required: true },
//    origin_country: { type: String, required: true }
// });

/*
   for later stages, belongs_to_collection, prd_comp, prod_countries, spoken_lang
*/

const movieSchema = new Schema({
   adult: { type: Boolean },
   backdrop_path: { type: String },
   budget: { type: Number, required: true },
   genres: { type: [String] },
   homepage: { type: String },
   imdb_id: { type: String },
   origin_country: { type: [String] },
   original_language: { type: String },
   original_title: { type: String, required: true },
   overview: { type: String, required: true },
   popularity: { type: Number },
   poster_path: { type: String },
   release_date: { type: Date, required: true },
   revenue: { type: Number, required: true },
   runtime: { type: Number, required: true },
   status: { type: String },
   tagline: { type: String, required: true },
   video: { type: Boolean },
   vote_average: { type: Number },
   vote_count: { type: Number },
});

module.exports = mongoose.model("Movies", movieSchema)