// schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true, // name required
        unique: true // no 2 docs should have same name field
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true // causes mongoose to add 'createdAt' and 'updatedAt'
});

// model - first arg always capitalized & singular 
const Campsite = mongoose.model('Campsite', campsiteSchema);
// mongoose.model returns constructor function

module.exports = Campsite;