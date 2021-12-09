const router = require("express").Router();
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");
const Rate = require("../../models/Rating");
const User = require("../../models/Users");

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
    const newRate = await Rate.aggregate([{
    $group:{
      _id:'$product',
    count:{$sum:1},
    avg:{$avg:'$rate'}
  }
},{$project:{_id:1,count:1,avg:{$round:['$avg',1]}}}])
    res.status(200).json(newRate);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
}
});

//@route    GET api/blogs/:blog_id
//@desc     get blog by id
//@acess    Private
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", [
      "fullname",
      "email",
    ]);
    if (!blog) {
      res.status(400).json({ msg: "This blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      res.status(400).json({ msg: "This blog not found" });
    }
    res.status(500).send("Server Error");
  }
});
//@route    Delet api/blog/:id
//@desc     Delete blog by id
//@acess    Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(500).json({ msg: "blog Not Found" });
    }
    //check user
    if (blog.user.toString() !== req.user._id) {
      return res.status(400).json({ msg: "user not authorized" });
    }
    await blog.remove();
    res.json({ msg: "Blog Removed " });
  } catch (err) {
    console.log(err.message);
    if (err.kind === ObjectId) {
      res.status(400).json({ msg: "This blog not found" });
    }
    res.status(500).send("Server Error");
  }
});
//@route    PUT api/blogs/:blog_id
//@desc     update blog by id
//@acess    Private
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(blog);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
