const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

//api/auth
//Check validity of access token
router.get('/', verify, async (req, res) => {
    try {
        res.status(200).json({ tokenPass: 'valid' });
    } catch (err) {
        // console.error(err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

//REGISTER
//'api/auth/register'
router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                CryptoJS.enc.Utf8.parse(req.body.password),
                process.env.SECRET_KEY
            ),
        });

        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'User exists' });
    }
});

//Login
//'api/auth/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json('Wrong password or username!');
        }

        const bytes = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json('Wrong password or username!');
        }

        const { password, ...info } = user._doc;

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
