const router = require("express").Router();
const Cat = require("../models/cats.model");
const User = require("../models/user.model");
const Desc = require("../models/desc.model");

// add new comment && push to cat model
router.post("/:catID/desc/:userID", async (req, res) => {
    try {
        let { comment } = req.body;
        let user = await User.findById(req.params.userID);
        let cat = await Cat.findById(req.params.catID);

        //desc for Cat
        let desc = new Desc({
            comment, 
            reference: user._id,
            referenceModal: 'User',
        });
        await desc.save();

        //desc for User
        let desc1 = new Desc({
            comment, 
            reference: cat._id,
            referenceModal: 'Cat',
        });
        await desc1.save();

        //push to Cat
        await Cat.findByIdAndUpdate(req.params.catID, {
            $push: {
                desc: desc._id,
            }
        })
        await cat.save();

        //push to User
        await User.findByIdAndUpdate(req.params.userID, {
            $push: {
                desc: desc1._id,
            }
        })
        await user.save();

        res.status(201).json({ message: "Comment has been added" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Could not add comment" })
    }
})

//delete comment
router.delete("/:descID/:userID", async (req, res) => {
    try {
        await Desc.findByIdAndDelete(req.params.descID);
        res.status(200).json({ message: "Comment has been deleted" });
    } catch (error) {
        res.status(400).json({ message: "Could not do this" });
    }
})

//edit comment
router.put("/:descID", async (req, res) => {
    try {
        let { comment } = req.body;
        await Desc.findByIdAndUpdate(req.params.descID, { 
            comment
        });
        res.status(200).json({ message: "Successfully updated comment" });
    } catch (error) {
        res.status(400).json({ message: "Trouble updating comment" });
    }
})

module.exports = router;