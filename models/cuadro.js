const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const CuadroSchema = new Schema({
    title: String,
    price: String,
    description: String,
    images: [ { url: String, public_id: String } ],
    location: String
});

module.exports = mongoose.model('Cuadro', CuadroSchema)