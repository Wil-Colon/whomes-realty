const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Active',
    },
    image: [String],
    bedRooms: {
        type: String,
    },
    baths: {
        type: String,
    },
    bathFeatures: {
        type: String,
    },
    squareFootage: {
        type: String,
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
        type: String,
    },
    propertyType: {
        type: [String],
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
    parking: {
        type: String,
    },
    appliances: {
        type: String,
    },
    basement: {
        type: String,
    },
    hoaFee: {
        type: String,
    },
    featuredListing: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Listing', ListingSchema);
