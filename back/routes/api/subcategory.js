const router = require("express").Router();
const SubCategory = require("../../models/SubCategory");
const jwt = require("jsonwebtoken");
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");

router.post("/", verifyTokenAndAdmin, (req, res) => {
  const { category, title } = req.body;
  const newSubCategory = new SubCategory({
    title,
    category,
  });
  newSubCategory
    .save()
    .then((data) => {
      res.status(201).json({ msg: "New Sub Category have been Created", data });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error from server", err });
    });
});

router.get("/", (req, res) => {
  getAllSubCategories(req, res);
});

router.get("/:id", (req, res) => {
  SubCategory.findOne({ _id: req.params.id }).populate('category', '-__v')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error from server", err });
    });
});

router.put("/:id", (req, res) => {
  SubCategory.updateOne({ _id: req.params.id }, {$set: req.body})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error from server", err });
    });
});

router.delete("/:id", verifyTokenAndAdmin, (req, res) => {
  SubCategory.deleteOne({ _id: req.params.id })
    .then(() => {
      getAllSubCategories(req, res);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error from server", err });
    });
});

router.get('/category/:id', (req, res) =>{
  SubCategory.find({category: req.params.id}).populate('category', '-__v')
  .then((data)=>{
    res.status(200).json(data)
  }).catch((error)=>{
    res.status(500).json({error, msg: "Error from server "})
  })
})

const getAllSubCategories = (req, res) =>{
  SubCategory.find().populate('category', '-__v')
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(500).json({ msg: "Error from server", err });
  });
}

module.exports = router;
