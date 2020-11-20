// view cats, view location
const router = require("express").Router();
const Cat = require("../models/cats.model.js");
const District = require("../models/district.model");

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
        console.log(area);
        let districts = await District.find({ locality: area });
        console.log(districts);
        return res.status(200).json({
            districts,
            message: "Successfully fetched district"
        })
    } catch (error) {
        res.status(400).json({ message: "Problem fetching district data!" })
    }
})

module.exports = router;