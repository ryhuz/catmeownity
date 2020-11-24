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
                path: 'favourites',
                model: 'Cat',
                populate: {
                    path: 'location',
                    model: 'Location',
                }
            },
        ).populate(
            {
                path: 'trackedLocations',
                model: 'Location',
                select: 'street',
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
        let { name, homeLocation, favourites, image } = req.body;
        await User.findByIdAndUpdate(req.params.userID, { name, homeLocation, favourites, image });
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
                trackedLocations: req.params.locationID
            }
        })
        res.status(200).json({ message: "Successfully added tracked location" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})
router.put("/:userID/untrack/:locationID", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userID, {
            $pull: {
                trackedLocations: req.params.locationID
            }
        })
        res.status(200).json({ message: "Successfully added tracked location" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})

/* get favorites from user */
router.get("/get-favourites/:userID", async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        return res.status(200).json({
            favourites: user.favourites,
            message: "Successfully fetched user favourites!"
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Problem fetching data!" });
    }
})

/* add favorites */
router.put("/:userID/favourite/:catID", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userID, {
            $push: {
                favourites: req.params.catID
            }
        })
        res.status(200).json({ 
            message: "Successfully added cat to favorites"
        });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})
/* remove favorites */
router.put("/:userID/unfavourite/:catID", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userID, {
            $pull: {
                favourites: req.params.catID
            }
        })
        res.status(200).json({ message: "Successfully removed cat from favorites" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding user" });
    }
})

/* get tracked locations from user */
router.get("/tracked/:userID", async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        return res.status(200).json({
            tracked: user.trackedLocations,
            message: "Successfully fetched user favourites!"
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Problem fetching data!" });
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