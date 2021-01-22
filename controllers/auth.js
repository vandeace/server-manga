const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models");

//===LOGIC LOGIN ===
exports.login = async (req, res) => {
  try {
    //we request email and body from req.body
    const { email, password } = req.body;
    //then we search the user using sequelize command findOne
    const userLogin = await user.findOne({
      //search based on email and put it in user variable or destructuring
      where: {
        email,
      },
    });
    //if the email we search is not available print invalid login
    if (!userLogin) {
      res.status(401).send({ message: "Invalid Login" });
      //if the user available then using bcrypt library for comparing the password that user input
    } else {
      bcrypt.compare(password, userLogin.password, (err, result) => {
        if (result) {
          //if the request email and password match we allow user to sign in
          jwt.sign(
            { id: userLogin.id },
            process.env.JWT_SECRET,
            (err, token) => {
              //we declare variable data that contains email and token
              const data = {
                email,
                token,
              };
              //we send the data to user
              res.status(200).send({ data });
            }
          );
          //if the result not matching we prompt message invalid
        } else {
          res.status(401).send({ message: "Invalid Email or Password" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: "server internal error" });
    console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    const saltRounds = 10;
    const { email, password } = req.body;
    const userRegister = await user.findOne({
      where: {
        email,
      },
    });
    if (!userRegister) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const value = {
          ...req.body,
          password: hash,
        };
        const newUser = await user.create(value);
        const id = newUser.id;
        jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, (err, token) => {
          const data = {
            id,
            email,
            token,
          };
          res.status(200).send(data);
        });
      });
    } else {
      res.status(400).send({ message: "Email already registered" });
    }
  } catch (error) {
    res.send(500).send({ message: "server internal error" });
    console.log(error);
  }
};
