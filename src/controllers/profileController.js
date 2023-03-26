const ProfileModel = require("../models/profileModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.status = (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
};

//creating user profile
exports.createProfile = (req, res) => {
  let reqBody = req.body;
  ProfileModel.create(reqBody, (e, data) => {
    if (e) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Profile created",
        data: data,
      });
    }
  });
};

exports.UserLogIn = (req, res) => {
  let UserName = req.body.UserName;
  let Password = req.body.Password;
  ProfileModel.find({ UserName: UserName, Password: Password }, (e, data) => {
    if (e) {
      res.status(404).json({ success: false, message: "can't reach profile" });
    } else {
      if (data.length > 0) {
        //create token
        let Payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          data: data[0],
        };
        let Token = jwt.sign(Payload, process.env.SECRET);
        res.status(200).json({
          success: true,
          token: Token,
          data: data[0],
        });
      } else {
        res.status(401).json({ status: "Unauthorized" });
      }
    }
  });
};

exports.SelectProfile = (req, res) => {
  let UserName = req.headers.username;
  ProfileModel.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

exports.UpdateProfile = (req, res) => {
  let UserName = req.headers.username;
  let reqBody = req.body;
  ProfileModel.updateOne(
    { UserName: UserName },
    { $set: reqBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};
