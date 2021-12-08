/** @format */

const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../../middleware/auth");
const Offers = require("../../models/Offers");

router.post("/", verifyTokenAndAdmin, (req, res) => {
  const { price, from, to, quantity, products } = req.body;
  const new_offer = new Offers({
    price,
    from,
    to,
    quantity,
    products,
  });
  new_offer
    .save()
    .then((data) => {
      res.status(201).json({ msg: "New Offer have been created ", data });
    })
    .catch((error) => {
      res.status(500).json({ err: "Error from server", error });
    });
});

router.get("/", verifyTokenAndAdmin, (req, res) => {
  Offers.find()
    .populate("products")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ msg: "error from server !!", error });
    });
});

router.get("/:id", verifyTokenAndAdmin, (req, res) => {
  Offers.findOne({ _id: req.params.id })
    .populate("products")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ msg: "error from server !!", error });
    });
});

router.delete("/:id", verifyTokenAndAdmin, (req, res) => {
  Offers.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ msg: "error from server !!", error });
    });
});

module.exports = router;
