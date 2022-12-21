const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.allock =  async (req, res) => {
  const userid = req.userId;

  var boy;
  try {
    const user = await User.findOne({
      where: {
        id: userid,
      },
    });

    if (!user) {
      // req.session = null;
      return res.status(200).send({status: "0", message: "Kindly login your account."});
    }

    const lock =await safe.findAll({
      where:{
        username:user.username,
      },
    });
    console.log(lock);

    return res.status(200).send({
      status:"1",
      message:"result fetch successfully",
      lock:lock,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
