// login, register
const router = require("express").Router();
const User = require("../models/user.model");
var passport = require("../lib/passportConfig");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const uploadController = require('../lib/upload')

/* Image Upload */
router.post("/profilepic", uploadController.uploadFile);

/* Register */
router.post("/register", async (req, res) => {
    try {
        let { email, password, name, location, imageID } = req.body;
        let hashedPassword = await bcrpyt.hash(password, 10);
        let user = new User(
            {
                email,
                password: hashedPassword,
                name,
            }
        );
        if (location !== "") {           // if there is a location included
            user.location = location;
        }
        await user.save();
        // give token to user upon successful registration
        const body = { _id: user._id };
        const token = jwt.sign({ user: body }, process.env.TOP_SECRET, { expiresIn: 84600000 });
        return res.status(200).json({ token });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "This email address has already been registered" })
        } else {
            res.status(400).json({ message: "Error here!" })
        }
    }
});

/* Login */
router.post('/login', async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err) {
                const error = new Error('An error occurred.');
                return next(error);
            }
            if (!user) {
                return res.status(400).json({ msg: 'Invalid email or password' })
            }

            req.login(
                user,
                { session: false },
                async (error) => {
                    if (error) return next(error);

                    const body = { _id: user._id };
                    const token = jwt.sign({ user: body }, process.env.TOP_SECRET, { expiresIn: 84600000 });

                    return res.status(200).json({ token });
                }
            );
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

/* Get user profile */
router.get('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id).populate(
            {
                path: 'favorites',
                model: 'Cat',
            },
        )

        if (user) {
            return res.status(200).json({ user });
        } else {
            res.status(400).json({ user: false })
        }
    } catch (e) {
        res.status(400).json({ message: 'error fetching user' })
    }
})
module.exports = router;