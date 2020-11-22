// view cats, view location
const router = require("express").Router();
const Cat = require("../models/cats.model.js");
const District = require("../models/district.model");
const Location = require("../models/location.model.js");
const mongoose = require('mongoose')

/* get cat data from location*/
router.get('/cats/:location', async (req, res) => {
    try {
        let locationID = req.params.location;
        let locationName = await Location.findById(locationID);
        let cats = await Cat.find({ locations: locationID });

        return res.status(200).json({
            location: locationName.street,
            cats,
            message: "Successfully fetched cats!",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Problem fetching cats data!" })
    }
});
/* get single cat data */
router.get("/cat/:catID", async (req, res) => {
    try {
        let cat = await Cat.findById(req.params.catID).populate(
            {
                path: 'locations',
                model: 'Location',
                select: 'street block',
                populate: {
                    path: 'district',
                    select: 'name locality',
                }
            }
        )
        return res.status(200).json({
            cat,
            message: "Successfully fetched cat!"
        });
    } catch (error) {
        res.status(400).json({ message: "Problem fetching data!" });
    }
})
/* get district data from NSEW*/
router.get('/district/:area', async (req, res) => {
    try {
        let area = req.params.area;
        if (area === "all") {
            let districts = await District.find();
            return res.status(200).json({
                districts,
                message: "Successfully fetched all districts"
            })
        } else {
            area = area[0].toUpperCase() + area.slice(1);
            let districts = await District.find({ locality: area });
            return res.status(200).json({
                districts,
                message: "Successfully fetched district"
            })
        }

    } catch (error) {
        res.status(400).json({ message: "Problem fetching district data!" })
    }
})
/* get locations in a district */
router.get('/location/:area', async (req, res) => {
    try {
        let district = req.params.area;
        let locations = await Location.find({ district });
        return res.status(200).json({
            locations,
            message: "Successfully fetched district"
        })
    } catch (error) {
        res.status(400).json({ message: "Problem fetching location data" })
    }
})

module.exports = router;