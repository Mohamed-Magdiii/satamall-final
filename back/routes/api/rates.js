const router = require("express").Router();
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");
const Rate = require("../../models/Rating");
const User = require("../../models/Users");
const Product = require("../../models/Products");
//@route    POST api/rates
//@desc     Add rate
//@acess    public
router.post("/", verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const rate = new Rate({
      user: user._id,
      product: req.body.product,
      rate: req.body.rate,
    });
    await rate.save();
    res.status(200).json(rate);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/rates
// @desc     get all rates
// @acess    public

router.get("/",verifytoken, async (req, res) => {
  try {
    const newRate = await Rate.aggregate(
      [{
    $group:{
      _id:'$product',
    count:{$sum:1},
    avg:{$avg:'$rate'}
  }
},
{$project:{_id:1,count:1,avg:{$round:['$avg',1]}}}
]).sort({avg:1})
    res.status(200).json(newRate);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
}
});



module.exports = router;
