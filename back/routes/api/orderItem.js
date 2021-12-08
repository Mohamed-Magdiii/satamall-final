/** @format */

const router = require("express").Router();
const OrderItem = require("../../models/OrderItem");
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");

router.post("/", verifytoken, (req, res) => {
  const { order, product, quantity } = req.body;
  const order_item = new OrderItem({
    order,
    product,
    quantity,
  });
  order_item
    .save()
    .then((data) => {
      res.status(201).json({ msg: "New Order Item have been Created", data });
    })
    .catch((error) => {
      res.status(500).json({ err: "Error from Server", error });
    });
});

router.get("/", verifyTokenAndAdmin, (req, res) => {
  OrderItem.find({}).populate({
      path: 'order',
      populate: {
       path: 'customer',
       model: 'User'
      }
  }).populate('product')
  .then((data)=>{
      res.status(200).json(data)
  }).catch((error)=>{
      res.status(500).json({msg: "Error from server", error})
  })
});

/*get Order Item By Order */
router.get("/order/:id", verifyTokenAndAdmin, (req, res) => {
    OrderItem.find({order: req.params.id}).populate({
      path: 'order',
     populate: {
       path: 'customer',
       model: 'User'
     }
  }).populate('product')
    .then((data)=>{
        res.status(200).json(data)
    }).catch((error)=>{
        res.status(500).json({msg: "Error from server", error})
    })
  });

module.exports = router;
