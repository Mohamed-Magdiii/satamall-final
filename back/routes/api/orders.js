/** @format */

const router = require("express").Router();
const Orders = require("../../models/Orders");
const OrderItems = require('../../models/OrderItem');
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");
const User = require("../../models/Users");

router.post("/", verifytoken, (req, res) => {
  const { type, is_paid, price, shipping_cost, phone, address } = req.body;
  const new_order = new Orders({
    customer: req.user._id,
    type,
    is_paid,
    price,
    shipping_cost,
    phone, 
    address
  });
  new_order
    .save()
    .then((data) => {
      res.status(201).json({ msg: "New Order have been Created", data });
    })
    .catch((error) => {
      res.status(500).json({ err: "Error from Server", error });
    });
});

router.delete("/:id", verifyTokenAndAdmin, (req, res) => {
  Orders.deleteOne({ _id: req.params.id })
    .then(() => {
      OrderItems.deleteMany({order: req.params.id}).then(()=>{
        getAllOrders(req, res);
      }).catch((err)=>{
        res.status(500).json({msg: "Error while deleting Order Items from server", err})
      })
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error from server", error });
    });
});

router.get("/", verifyTokenAndAdmin, (req, res) => {
  getAllOrders(req, res);
});

const getAllOrders = (req, res) => {
  Orders.find()
    .populate("customer", "-password")
    .select("-__v")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error From Server", error });
    });
};

router.get("/type/:type", verifyTokenAndAdmin, (req, res) => {
  Orders.find({ type: req.params.type })
    .populate("customer", "-password -__v")
    .select("-__v")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error From Server", error });
    });
});


router.get("/:id", verifyTokenAndAdmin, (req, res) => {
  Orders.findOne({ _id: req.params.id })
    .populate("customer", "-password -__v")
    .select("-__v")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error From Server", error });
    });
});



router.put('/:id', verifyTokenAndAdmin, (req, res) => {
  Orders.updateOne({_id: req.params.id}, {$set: req.body}).then((data)=>{
    res.status(200).json(data)
  }).catch((error)=>{
    res.status(500).json({error, msg: "Error from server !! "})
  })
})

module.exports = router;
