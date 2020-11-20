// view cats, view location
const router = require("express").Router();
const Cat = require("../models/cats.model.js");
const District = require("../models/district.model");
const Location = require("../models/location.model.js");

/* get cat data */
router.get('/cats', async (req, res) => {
    try {
        let cat = await Cat.find(req.params);
        return res.status(200).json({
            message: "Successfully fetched cats!",
        })
    } catch (error) {
        res.status(400).json({ message: "Problem fetching cats data!" })
    }
});

/* get district data */
router.get('/district/:area', async (req, res) => {
    try {
        let area = req.params.area;
        area = area[0].toUpperCase() + area.slice(1);
        let districts = await District.find({ locality: area });
        return res.status(200).json({
            districts,
            message: "Successfully fetched district"
        })
    } catch (error) {
        res.status(400).json({ message: "Problem fetching district data!" })
    }
})
/* get location data */
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