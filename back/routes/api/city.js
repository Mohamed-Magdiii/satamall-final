const router = require("express").Router();
const City = require("../../models/City");
const Country = require("../../models/Country");
const { verifyTokenAndAdmin } = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");

//Router api/country
router.post(
  "/",
  [verifyTokenAndAdmin, [check("city", "This Field Is Reuired").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    }

    const { city, countryId } = req.body;
    try {
     const getCountry= await Country.findById(countryId);
      const newCity = new City({
        city,
        countryId:getCountry._id,
        countryname:getCountry.country
      });
      await newCity.save();
      res.status(200).json(newCity);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

//GET All Cities
router.get("/", async (req, res) => {
  try {
    const city = await City.find().sort({ title: 1 });
    res.status(200).json(city);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//Router Put api/city/id
//Edit city title
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateCity = await City.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCity);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//Router delete api/city/id
//delete city title
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "City Deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
