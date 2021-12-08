const router = require('express').Router()
const Region = require('../../models/Region')
const { verifyTokenAndAdmin } = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");
const City =require('../../models/City')
//Router api/country
router.post(
    "/",
    [verifyTokenAndAdmin, [check("region", "This Field Is Reuired").not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(500).json({ errors: errors.array() });
      }
  
      const { region,cityId,price } = req.body;
      try {
        const getCity= await City.findById(cityId);
        ;
        const newRegion = new Region({
          region,
          cityId:getCity._id,
          cityname:getCity.city,
          price,
          countryname:getCity.countryname
        });
        await newRegion.save();
        res.status(200).json(newRegion);
      } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
      }
    }
  );

  //GET AL Regions
  router.get("/", async (req, res) => {
    try {
      const region = await Region.find().sort({ title: 1 });
      res.status(200).json(region);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });
  
  //Router Put api/city/id
  //Edit city title
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updateRegion = await Region.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateRegion)
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  });

  //Router delete api/city/id
  //delete city title
  router.delete('/:id', verifyTokenAndAdmin ,async (req,res)=>{
    try {
      await Region.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: "Region Deleted"})
    } catch (error) {
      res.status(500).send("Server Error");
  
    }
  })
  
  module.exports = router;
  