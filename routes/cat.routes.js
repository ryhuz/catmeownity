const router = require("express").Router();
const Cat = require("../models/cats.model");
const User = require("../models/user.model");
const Location = require("../models/location.model");
const District = require("../models/district.model");

// add new cat
router.post("/add", async (req, res) => {
    try {
        let { namesArr, breed, gender, colourArr, desc, locations, photos, sterilised } = req.body;
        let colour = colourArr.split(","); // not sure how the forms will be so I just put a split between commas for the array (temporary)
        let names = namesArr.split(",");
        let cat = new Cat({ names, breed, gender, colour, desc, locations, photos, sterilised });

        await cat.save();

        res.status(201).json({ message: "Cat has been added" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Could not add cat" })
    }
})

// edit cat for profile modal --> use cat ID
router.put("/:catID", async (req, res) => {
    try {
        let { names, breed, gender, colour } = req.body;
        await Cat.findByIdAndUpdate(req.params.catID, { names, breed, gender, colour });
        res.status(200).json({ message: "Successfully updated cat profile" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding cat data" });
    }
})

// delete cat --> use cat ID
router.delete("/:catID", async (req, res) => {
    try {
        await Cat.findByIdAndDelete(req.params.catID);
        res.status(200).json({ message: "Cat has been deleted" });
    } catch (error) {
        res.status(400).json({ message: "Could not do this" });
    }
})

// feed cat --> use user ID & cat ID
router.put("/:userID/feed/:catID", async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        let cat = await Cat.findByIdAndUpdate(req.params.catID, {
            $push: {
                fed: {
                    time: Date.now(),
                    byUser: user._id,
                }
            }
        })

        await cat.save();

        res.status(201).json({ message: "Successfully updated feeding records" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Could not do this" });
    }
})

// mark potential duplicate --> use cat ID
router.put("/:catID/duplicate", async (req, res) => {
    try {
        await Cat.findByIdAndUpdate(req.params.catID, {
            duplicate: true,
        })
        res.status(200).json({ message: "Successfully marked" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding cat data" });
    }
})

// mark potential missing --> use cat ID
router.put("/:catID/missing", async (req, res) => {
    try {
        await Cat.findByIdAndUpdate(req.params.catID, {
            missing: true,
        })
        res.status(200).json({ message: "Successfully marked" });
    } catch (error) {
        res.status(400).json({ message: "Trouble finding cat data" });
    }
})

/* Add cat photo */
router.put('/addphoto/:catID', async (req, res) => {
    try {
        let { image, isDefault, desc } = req.body;
        
        let photo = {
            image,
            desc,
            isDefault,
        }
        await Cat.findByIdAndUpdate(req.params.catID, {
            $push: {
                photos: photo
            }
        })

        res.status(200).json({ message: "successfully added photo to cat" });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "This email address has already been registered" })
        } else {
            res.status(400).json({ message: "Error here!" })
        }
    }
})



module.exports = router;