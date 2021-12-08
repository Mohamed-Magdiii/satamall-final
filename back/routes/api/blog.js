const router = require("express").Router()
const {  verifyTokenAndAdmin } = require('../../middleware/auth')
const Blog = require('../../models/Blog')
const {check , validationResult}= require('express-validator')
const User = require('../../models/Users')
const multer =require('multer')

const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null, './public/blogs')
  },
  filename:(req,file,callback)=>{
    callback(null,file.originalname)
  }
})
const uploads = multer({
  storage:storage,
  // fileFilter:(req,file, callback)=>{
  //   checkFileType(file,callback)
  // }
})

//Check File Type
const checkFileType = (file, callback)=>{
  //allowed ext
  const fileTypes= /jpeg|jpg|png|gif/;
  //check ext 
const extname = fileTypes.test(file.originalname.toLowerCase())
//check mime 
const mimetype = fileTypes.test(file.mimetype)
}

//@route    POST api/blog
//@desc     Add blog
//@acess    Private
router.post('/' ,
 [  verifyTokenAndAdmin,
  uploads.single('image') ,
    [check('title', 'This Field Required').not().isEmpty()] 
] ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user._id)
      const blog = new Blog({
          title:req.body.title,
          description:req.body.description,
          user:user._id,
          image:req.file.path
      })
      await blog.save()
      res.status(200).json(blog)
    } catch (error) {
      console.log(error);
     res.status(500).send("Server Error")
 }
})

//@route    GET api/blogs
//@desc     get all blogs
//@acess    public

router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find().populate('user' , ['fullname' , 'email']).sort({ date: -1 });
    res.status(200).json(blog);
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
    const blog = await Blog.findById(req.params.id).populate('user',['fullname', 'email']);
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
module.exports = router