const { Router } = require("express");
const User = require("../models/User");
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    console.log(req.body)

    try {
        if (!req?.body) return res.status(400).json({ success: false, message: 'Email and password are required' });
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ success: false, message: 'Email required' });
        if (!password) return res.status(400).json({ success: false, message: 'Password required' });

        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) return res.status(400).json({ success: false, message: 'Email already exists', data: null });

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const user = new User({
            email: req.body.email,
            password: hashedPassword
        })

        const savedUser = await user.save();

        return res.status(201).json({
            success: true,
            message: 'User registered!',
            data: savedUser
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ success: false, message: 'Email required' });
        if (!password) return res.status(400).json({ success: false, message: 'Password required' });

        const existingUser = await User.findOne({ email: email }).select('+password');
        if (!existingUser) return res.status(400).json({ success: false, message: 'Email not found' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ success: false, message: 'Invalid password', data: null });

        const payload = {
            _id: existingUser._id,
            email: existingUser.email
        };

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        );

        return res.status(200).json({
            success: true,
            message: 'User logged in!',
            data: {
                token: accessToken,
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                }
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
})

module.exports = router;