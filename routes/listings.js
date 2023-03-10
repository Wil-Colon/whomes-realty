const router = require('express').Router();
const Listing = require('../models/listing');
const verify = require('../verifyToken');

//Get listing by ID
router.get('/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(400).json('No listings Found!');
        }

        res.status(200).json(listing);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all Listings
//GET '/api/listings/'
//accepts 'city' query to find listings based on city
//accepts 'featuredListing' query to pull only featured listings
router.get('/', async (req, res) => {
    const noimageQuery = req.query.noimage;
    const query = req.query;
    let listings = [];

    console.log(query);

    try {
        if (noimageQuery) {
            listings = await Listing.find({}).select(
                '-image -propertyType -__v'
            );
            return res.status(200).json(listings);
        }

        listings = await Listing.find(query);

        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Create Listing
//POST 'api/listings/newlisting
router.post('/newlisting', verify, async (req, res) => {
    try {
        const listingFields = {
            ...req.body,
        };

        let listing = new Listing(listingFields);

        await listing.save();

        const allListings = await Listing.find({});

        return res.status(200).json(allListings);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update Listing
//PUT 'api/listing/:listingID
router.put('/:id', verify, async (req, res) => {
    try {
        await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).exec();

        const allListings = await Listing.find({});

        return res.status(200).json(allListings);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete Listing
//DELETE 'api/listings/:id'
router.delete('/:id', verify, async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);

        const allListings = await Listing.find({}).select(
            '-image -propertyType -__v'
        );

        return res.status(200).json(allListings);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
