const router = require("express").Router();
const { verifytoken } = require('../../middleware/auth');
const User = require("../../models/Users");
const Wishlist = require("../../models/Wishlist");
const Product = require("../../models/Products");

//Router api/wishlist
router.post(
  "/",
  verifytoken, 
  async (req, res) => {
    try {
     const user = await User.findById(req.user._id);
     const product = await Product.findById(req.body.product)
     if(user && product){
         return res.status(500).json({msg:"You already added it to favourites before"})
     }
       const wishlist = new Wishlist({
           user:user._id,
           product:req.body.product
       })
      await wishlist.save();
      res.status(200).json(wishlist);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);
//Router api/wishlist
router.delete(
    "/",
    verifytoken, 
    async (req, res) => {
      try {
         await User.findByIdAndDelete(req.user._id)
        res.status(200).json({msg :"You Removed it from Favourites"});
      } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
      }
    }
  );
  

module.exports = router;
