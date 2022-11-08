const router = require('express').Router();
const Messages = require('../models/Messages');
const verify = require('../verifyToken');

//Get all Messages
//GET '/api/messages/'
// add query to get unread messages only
router.get('/', verify, async (req, res) => {
    const readQuery = req.query.unread;
    let messages = [];

    try {
        if (readQuery) {
            messages = await Messages.find({ unRead: readQuery });
            return res.status(200).json(messages);
        }

        messages = await Messages.find({});
        res.status(200).json(messages);
    } catch (err) {
        res.status(200).json(err);
    }
});

//Get single messages by ID
//GET '/api/messages/'
router.get('/:id', verify, async (req, res) => {
    let message = [];
    try {
        message = await Messages.findById(req.params.id);

        if (!message) {
            return res.status(500).json('No message found!');
        }
        res.status(200).json(message);
    } catch (err) {
        res.status(200).json(err);
    }
});

//Create Message
//POST 'api/messages/newMessage
router.post('/newMessage', async (req, res) => {
    try {
        const messageField = req.body;

        let message = new Messages(messageField);

        await message.save();

        return res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete message by Id
//DELETE 'api/messages/delete/:id'
router.delete('/delete/', verify, async (req, res) => {
    try {
        // const message = await Messages.findByIdAndDelete(req.params.id);
        const message = await Messages.deleteMany({
            _id: { $in: req.body.id },
        });

        if (!message) {
            return res.status(500).json('No message found!');
        }

        res.status(201).json(`deleted document`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
