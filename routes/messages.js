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

//PUT Mark Message Read/UnRead by ID
//PUT '/api/messages/:id'
router.put('/:id', async (req, res) => {
    try {
        const message = await Messages.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { unRead: req.body.read } },
            { new: true }
        );

        if (!message) {
            return res.status(500).json('No message found!');
        }

        const allMessages = await Messages.find({});

        res.status(200).json(allMessages.reverse());
    } catch (err) {
        res.status(200).json(err);
    }
});

//Mark Message Read/UnRead by ID. Holds.
//PATCH '/api/messages/markmultipleread
//Notes: req.body.id = array of message ID's to mark as read.

router.patch('/markmultipleread', async (req, res) => {
    try {
        const messages = await Messages.updateMany(
            { _id: req.body.id },
            { $set: { unRead: req.body.read } },
            { multi: true }
        );

        const allMessages = await Messages.find({});

        res.status(200).json(allMessages.reverse());
    } catch (err) {
        res.status(200).json(err);
    }
});

module.exports = router;
