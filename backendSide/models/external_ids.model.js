const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const external_idsSchema = new Schema({
   imdb_id: { type: String, required: false },
   wikidata_id: { type: String, required: false },
   facebook_id: { type: String, required: false },
   instagram_id: { type: String, required: false },
   twitter_id: { type: String, required: false }
});

module.exports = external_idsSchema;