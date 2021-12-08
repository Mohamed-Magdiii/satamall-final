const router = require("express").Router();
const Category = require("../../models/Categories");
const { check, validationResult } = require("express-validator");
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");
const User = require("../../models/Users");
const Products = require("../../models/Products");
const multer =require('multer')

const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null, './public/uploads')
  },
  filename:(req,file,callback)=>{
    callback(null,file.originalname)
  }
})
const uploads = multer({storage:storage})

//Router api/Products
router.post(
  "/",
  verifyTokenAndAdmin,
   
  uploads.single("image"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(500).json({ errors: errors.array() });
    }

    const { title_en, description, price, color,store,size, sale,onsale ,categoryId,status } = req.body;
    try {
      const user = await User.findById(req.user._id);
      const cat = await Category.findById(categoryId)
     const product = new Products({
        title_en,
        description,
        price,
        color,
        size,
        store,
        sale,
        onsale,
        status,
        categoryId,
        image:req.file.name,
        categoryTitle:cat.title, 
        user: user._id,
        name: user.username,
      });
      console.log(image);
  await product.save();
    res.status(200).json(product)
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);
//Router Put api/categories/id
//Edit Category title
router.put("/:id", verifyTokenAndAdmin  , async (req, res) => {
  try {
    const updateProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//GET Product By ID
router.get("/:id", verifytoken,async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//GET AL Products
router.get("/", async (req, res) => {
  try {
    const product = await Products.find().sort({ createdAt: -1 });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
