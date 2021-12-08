const router = require("express").Router();
const Category = require("../../models/Categories");
const { check, validationResult } = require("express-validator");
const { verifyTokenAndAdmin } = require("../../middleware/auth");

//Router api/categories
router.post(
  "/",
  [verifyTokenAndAdmin, [check("title", "This Field Is Reuired")]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    }

    const { title } = req.body;
    try {
      const cat = await Category.findOne({ title });
      if (cat) {
        return res.status(500).json({ msg: "this title is used before" });
      }
      const category = new Category({
        title,
      });
      await category.save();
      res.json(category);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);
//GET AL Gategories
router.get("/", async (req, res) => {
  try {
    const category = await Category.find().sort({ title: 1 });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne({_id: req.params.id})
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Router Put api/categories/id
//Edit Category title
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(updateCategory)
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


router.delete('/:id', verifyTokenAndAdmin ,async (req,res)=>{
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({msg: "Category Deleted"})
  } catch (error) {
    res.status(500).send("Server Error");

  }
})

module.exports = router;
