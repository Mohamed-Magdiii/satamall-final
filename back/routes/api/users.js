const {
  verifytoken,
  verifyAuthorization,
  verifyTokenAndAdmin,
} = require("../../middleware/auth");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/Users");

//UPDATE
router.put("/:id", verifyAuthorization, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.put("/password/:id", verifyAuthorization, (req, res) => {
  const { currentpassword, newpassword } = req.body;
  User.findOne({ _id: req.params.id })
    .then((data) => {
      bcrypt
        .compare(currentpassword, data.password)
        .then((isCompared) => {
          if (isCompared) {
            bcrypt.hash(newpassword, 10, (err, hash) => {
              User.updateOne(
                { _id: req.params.id },
                { $set: { password: hash } }
              )
                .then(() => {
                  res
                    .status(200)
                    .json({ msg: "Password Updated Successfully " });
                })
                .catch((error) => {
                  res.status(500).json({ msg: "Error from server !!", error });
                });
            });
          } else {
            res.status(403).json({ msg: "Password isnot valid" });
          }
        })
        .catch((error) => {
          res.status(500).json({ error, msg: "Error from server !!" });
        });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//DELETE USER BY ID
router.delete("/:id", verifyAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("User IS Deleted Successfuly");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//GET USER BY ID
router.get("/me", verifytoken, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
