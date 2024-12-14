const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    star_actors: { type: Array, required: true},
    director: { type: String, required: true},
    genre: { type: String, required: true}
})

module.exports = mongoose.model('tv_shows', postSchema);