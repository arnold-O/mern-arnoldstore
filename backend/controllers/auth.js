const User = require("../model/user");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "user already reqisterd found",
      });

    const { firstName, lastName, email, password } = req.body;

    const _user = new User({

      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          status: "successful",
          user: "user created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });

    if (user) {
      if (user.authenticate(req.body.password )) {
        const token = createToken(user._id);
        const { _id, firstName, email, lastName, fullName } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
           
            fullName,
            email,
          },
        });
      } else {
        return res.status(400).json({
          message: "invalid credentials",
        });
      }
    } else {
      return res.status(400).json({
        message: "somethging went wrong",
      });
    }
  });
};



