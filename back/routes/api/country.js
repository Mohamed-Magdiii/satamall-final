const router = require('express').Router()
const Country = require('../../models/Country')
const { verifyTokenAndAdmin } = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");

//Router api/country
router.post(
    "/",
    [verifyTokenAndAdmin, [check("country", "This Field Is Reuired").not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(500).json({ errors: errors.array() });
      }
  
      const { country } = req.body;
      try {
        const cat = await Country.findOne({ country });
        const newCountry = new Country({
            country,
        });
        await newCountry.save();
        res.status(200).json(newCountry);
      } catch (error) {
        res.status(500).send("Server Error");
      }
    }
  );
  //GET All Countries
  router.get("/", async (req, res) => {
    try {
      const country = await Country.find().sort({ title: 1 });
      res.status(200).json(country);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });
  
  //Router Put api/country/id
  //Edit country title
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updateCountry = await Country.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateCountry)
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });
  router.delete('/:id', verifyTokenAndAdmin ,async (req,res)=>{
    try {
      await Country.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: "Country Deleted"})
    } catch (error) {
      res.status(500).send("Server Error");
  
    }
  })
  
  module.exports = router;
  