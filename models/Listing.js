const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true,
    },
    image: [
        {
            type: String,
        },
    ],
    bedRooms: {
        type: Number,
    },
    baths: {
        type: Number,
    },
    squareFootage: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: Number,
    },
    propertyType: {
        type: String,
    },
    yearBuilt: {
        type: String,
    },
    cooling: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    county: {
        type: String,
    },
    description: {
        type: String,
    },
    featuredListing: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Listing', ListingSchema);
