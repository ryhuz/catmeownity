// view cats, view location
const router = require("express").Router();
const Cat = require("../models/cat.model.js");
const District = require("../models/district.model");

/* get cat data */
router.get('/', async (req, res) => {
 try {
  let cat = await Cat.find(req.params);
  return res.status(200).json({
   message: "Successfully fetched cats!",
  })

 } catch (error) { 
  res.status(400).json({ message: "Problem fetching cats data!"})
 }
});

/* get district data */
router.get('/district', async (req, res) => {
 try {
  let district = District.find(req.params)
  return res.status(200).json({
   message: "Successfully fetched district"
  })
 } catch (error) {
  res.status(400).json({ message: "Problem fetching district data!"})
 }
})