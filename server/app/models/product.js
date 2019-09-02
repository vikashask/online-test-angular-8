let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    created_by: { type: String, required: true },
    price: { type: Number, required: true },
}, {
    versionKey: false
});

module.exports = mongoose.model('product', ProductSchema);
