const router = require('express').Router();
const Listing = require('../models/listing');
const verify = require('../verifyToken');

//Get all Listings
//GET '/api/listings/'
//accepts 'city' query to find listings based on city
router.get('/', async (req, res) => {
    const cityQuery = req.query.city;
    let listings = [];

    try {
        if (cityQuery) {
            listings = await Listing.find({ city: cityQuery });
        } else {
            listings = await Listing.find({});
            if (listings.length === 0) {
                return res.status(500).json({ error: 'No listings found!' });
            }
        }

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
        return res.status(200).json(listing);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update Listing
//PUT 'api/listing/:listingID
router.put('/:id', verify, async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        return res.status(200).json(updatedListing);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete Listing
//DELETE 'api/listings/:id'
router.delete('/:id', verify, async (req, res) => {
    try {
        await Listing.findOneAndDelete(req.params.id);

        res.status(200).json('Listing has been deleted.');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
