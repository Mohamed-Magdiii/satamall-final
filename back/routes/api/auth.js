const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register Account
router.post(
  "/register",
  [
    check("fullname", "Please Enter Your FullName").not().isEmpty(),
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Password must be more than 8 letter").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
      return  res.status(500).json({ errors: [{ msg: "user already exists" }] });
      }

      user = new User({
        fullname,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        _id: user._id,
        username: user.fullname,
        password: "",
        email: user.email,
        authToken: "auth-token-8f3ae836da744329a6f93bf20594b5cc",
        refreshToken: "auth-token-f8c137a2c98743f48b643e71161d90aa",
        roles: user.role === 'customer' ? [0] : 
        (user.role === 'admin' ? [1] : (user.role === 'vendor' ? [2] : [3])), // Administrator
        pic: "",
        fullname: user.fullname,
        firstname: user.fullname,
        lastname: user.fullname,
        occupation: "",
        companyName: "",
        phone: user.mobile,
        language: "en",
        timeZone: "International Date Line West",
        website: "https://keenthemes.com",
        emailSettings: {
          emailNotification: true,
          sendCopyToPersonalEmail: false,
          activityRelatesEmail: {
            youHaveNewNotifications: false,
            youAreSentADirectMessage: false,
            someoneAddsYouAsAsAConnection: true,
            uponNewOrder: false,
            newMembershipApproval: false,
            memberRegistration: true,
          },
          updatesFromKeenthemes: {
            newsAboutKeenthemesProductsAndFeatureUpdates: false,
            tipsOnGettingMoreOutOfKeen: false,
            thingsYouMissedSindeYouLastLoggedIntoKeen: true,
            newsAboutMetronicOnPartnerProductsAndOtherServices: true,
            tipsOnMetronicBusinessProducts: true,
          },
        },
        communication: {
          email: true,
          sms: true,
          phone: false,
        },
        address: {
          addressLine: "L-12-20 Vertex, Cybersquare",
          city: "San Francisco",
          state: "California",
          postCode: "45000",
        },
        socialNetworks: {
          linkedIn: "https://linkedin.com/admin",
          facebook: "https://facebook.com/admin",
          twitter: "https://twitter.com/admin",
          instagram: "https://instagram.com/admin",
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SEC,
        { expiresIn: "3d" },
        (err, token) => {
          if (!token) throw err;
          res.json({ token });
        });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

//Login Account
router.post('/login' ,  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Password must be more than 8 letter").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const {email, password } = req.body;
    try {
      let user = await User.findOne({ email })
      if (!user) {
      return   res.status(500).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatching =await bcrypt.compare(password , user.password);
      if (!isMatching) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        _id: user._id,
        username: user.fullname,
        password: "",
        email: user.email,
        authToken: "auth-token-8f3ae836da744329a6f93bf20594b5cc",
        refreshToken: "auth-token-f8c137a2c98743f48b643e71161d90aa",
        roles: user.role === 'customer' ? [0] : 
        (user.role === 'admin' ? [1] : user.role === 'vendor' ? [2] : [3]), // Administrator
        pic: "",
        fullname: user.fullname,
        firstname: user.fullname,
        lastname: user.fullname,
        occupation: "",
        companyName: "Keenthemes",
        phone: "456669067890",
        language: "en",
        timeZone: "International Date Line West",
        website: "https://keenthemes.com",
        emailSettings: {
          emailNotification: true,
          sendCopyToPersonalEmail: false,
          activityRelatesEmail: {
            youHaveNewNotifications: false,
            youAreSentADirectMessage: false,
            someoneAddsYouAsAsAConnection: true,
            uponNewOrder: false,
            newMembershipApproval: false,
            memberRegistration: true,
          },
          updatesFromKeenthemes: {
            newsAboutKeenthemesProductsAndFeatureUpdates: false,
            tipsOnGettingMoreOutOfKeen: false,
            thingsYouMissedSindeYouLastLoggedIntoKeen: true,
            newsAboutMetronicOnPartnerProductsAndOtherServices: true,
            tipsOnMetronicBusinessProducts: true,
          },
        },
        communication: {
          email: true,
          sms: true,
          phone: false,
        },
        address: {
          addressLine: "L-12-20 Vertex, Cybersquare",
          city: "San Francisco",
          state: "California",
          postCode: "45000",
        },
        socialNetworks: {
          linkedIn: "https://linkedin.com/admin",
          facebook: "https://facebook.com/admin",
          twitter: "https://twitter.com/admin",
          instagram: "https://instagram.com/admin",
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SEC,
        { expiresIn: "3d" },
        (err, token) => {
          if (!token) throw err;
          res.status(200).json({token, payload});
        });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
)

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        const secret = process.env.JWT_SEC + data.password;
        const payload = {
          email: data.email,
          id: data._id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "5m" });
        const link = `http://localhost:3000/reset-password/${data._id}/${token}`;
        const transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 587,
          auth: {
            user: "f5a32b70448826",
            pass: "e5a34395e3bba7"
          }
        });
        const options = {
          from: "email@domain.com",
          to: email,
          subject: "Recover Email Address",
          html: `<a href='${link}'>Recover Email Address</a>`,
        };
        transporter.sendMail(options, (err, info) => {
          if (err) {
            res.status(500).json({ msg: "Error from server !!", err });
          } else {
            res.status(200).json({
              msg: "Sent Successfully !! ",
              info,
            });
          }
        });
      } else {
        res.status(404).json({ msg: "Email not found " });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error from server !!", error });
    });
});

router.get("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  User.findOne({ _id: id })
    .then((data) => {
      if (data) {
        try {
          const secret = process.env.JWT_SEC + data.password;
          const payload = jwt.verify(token, secret);
          res
            .status(200)
            .json({ msg: "Valid User and valid token", email: data.email });
        } catch (error) {
          res.status(401).json({ error, msg: "You are not The Real User" });
        }
      } else {
        res.status(404).json({ msg: "You are not thw owner of this account " });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error from server !!", error });
    });
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  User.findOne({ _id: id })
    .then((data) => {
      if (data) {
        try {
          const secret = process.env.JWT_SEC + data.password;
          const payload = jwt.verify(token, secret);
          bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
              res.status(500).json({error: err})
            }else{
              User.updateOne({_id: id}, {$set: {password: hash}}).then((result) => {
                res.status(200).json({msg: "Password updated successfully "});
              }).catch((error) =>{
                res.status(500).json({msg: "Error from Server !! ",error})
              })
            }
          });
        } catch (error) {
          res.status(500).json({ msg: "Error Invalid ", error });
        }
      } else {
        res.status(404).json({ msg: "You are not thw owner of this account " });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error from server !!", error });
    });
});

module.exports = router;
