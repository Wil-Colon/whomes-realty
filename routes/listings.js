const router = require('express').Router();
const Listing = require('../models/listing');
const verify = require('../verifyToken');

//Get all Listings
//GET '/api/listings/'
router.get('/', async (req, res) => {
    try {
        let listings = await Listing.find({});

        if (listings.length === 0) {
            return res.status(500).json({ error: 'No listings found!' });
        }

        res.status(200).json(listings);
    } catch (err) {
        console.log(err);
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
        console.log(err);
    }
});

//Update Listing
//PUT 'api/listings/:listingID
router.put('/:id', verify, async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res
                .status(500)
                .json({ error: 'No listings found to update.' });
        }

        const updatedListing = await Listing.findOneAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        return res.status(200).json(updatedListing);
    } catch (err) {
        console.log(err);
    }
});

//Delete Listing
//DELETE 'api/listings/:id'
router.delete('/:id', verify, async (req, res) => {
    try {
        await Listing.findOneAndDelete(req.params.id);

        res.status(200).json('Listing has been deleted.');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
