const router = require("express").Router();
const Cat = require("../models/cats.model");
const User = require("../models/user.model");
const Location = require("../models/location.model");
const District = require("../models/district.model");

//get user
router.get("/:userID", async (req, res) => {
    try {
        let user = await User.findById(req.params.userID).populate(
            {
                path: 'favorites',
                model: 'Cat',
                select: 'names'
            },
        ).populate(
            {
                path: 'location',
                model: 'Location',
                select: 'street block',
                populate: {
                    path: 'district',
                    select: 'name locality',
                }
            }
        ).populate(
            {
                path: 'tracked',
                model: 'Location',
                select: 'street block',
                populate: {
                    path: 'district',
                    select: 'name locality',
                }
            }
        )
        return res.status(200).json({
            user,
            message: "Successfully fetched user!"
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Problem fetching data!" });
    }
})

// edit user
router.put("/:userID", async (req, res) => {
    try {
        let { name, location, favorites, imageID } = req.body;
        await User.findByIdAndUpdate(req.params.userID, { name, location, favorites, imageID });
        res.status(200).json({ message: "Successfully updated user profile" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})

//add tracked location
router.put("/:userID/tracked/:locationID", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userID, {
            $push: {
                tracked: req.params.locationID
            }
        })
        res.status(200).json({ message: "Successfully updated user profile" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})

//add favorites
router.put("/:userID/favorite/:catID", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userID, {
            $push: {
                favorites: req.params.catID
            }
        })
        res.status(200).json({ message: "Successfully added cat to favorites" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})

//delete profile
router.delete("/:userID", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userID);
        res.status(200).json({ message: "Successfully deleted user profile" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})

module.exports = router;