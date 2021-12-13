const router = require("express").Router();
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");
const Rate = require("../../models/Rating");
const User = require("../../models/Users");
const Products = require("../../models/Products");
//@route    POST api/rates
//@desc     Add rate
//@acess    public
router.post("/", verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { product } = req.body;
    const myProduct = await Products.findById(product);
    const rate = new Rate({
      user: user._id,
      product: product,
      rate: req.body.rate,
      productTitle: myProduct.title_en,
    });
   await rate.save();
  const myRate = await Rate.find({product})
  let sum = 0;
        for(let i = 0 ; i < myRate.length ; i++){
          sum += myRate[i].rate
          console.log(myRate[i]);
        }
        var avg = sum / myRate.length;
await Products.findOneAndUpdate(product, {$set: {stars: avg}},{new:true})
        res.status(200).json({rate});
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
