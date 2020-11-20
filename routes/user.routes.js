// login, register
const router = require("express").Router();
const User = require("../models/user.model");
var passport = require("../lib/passportConfig");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");

/* Register */
router.post("/register", async (req, res) => {
    try {
        let { email, password, name } = req.body;
        let hashedPassword = await bcrpyt.hash(password, 10);
        let user = new User(
            {
                email,
                password: hashedPassword,
                name,
            }
        );
        await user.save();
        // give token to user upon successful registration
        const body = { _id: user._id };
        const token = jwt.sign({ user: body }, process.env.TOP_SECRET);
        return res.json({ token });
    } catch (error) {
        res.status(400).json({ message: "Error here!" })
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
                return res.status(400).json({ message: 'user not found' })
            }

            req.login(
                user,
                { session: false },
                async (error) => {
                    if (error) return next(error);

                    const body = { _id: user._id };
                    const token = jwt.sign({ user: body }, process.env.TOP_SECRET);

                    return res.json({ token });
                }
            );
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;