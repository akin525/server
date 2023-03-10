const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.add =  async (req, res) => {
  const userid = req.body.userId;

  var boy;
  try {
    let authorities = [];
    var amount=req.body.amount;

    const user = await User.findOne({
      where: {
        id: userid,
      },
    });

    if (!user) {
      // req.session = null;
      return res.status(200).send({status: "0", message: "Kindly login your account."});
    }

    if (parseInt(user.wallet) < parseInt(req.body.amount)) {
      return  res.status(200).send({
        status:"0",
        balance:user.wallet,
        message:"insufficient balance"
      });
    }
    const rebalance=parseInt(user.wallet)-parseInt(req.body.amount);

    const user1 = await User.update(
        { wallet: rebalance },
        {
          where: {
            id: userid,
          },
        });

    const add =await safe.findOne({
      where:{
        id:req.body.id,
      },
    });

    const main=parseInt(add.balance) + parseInt(req.body.amount);

    const objectToUpdate = {
     balance:main,
    }
    safe.findAll({ where: { id: add.id}}).then((result) => {
      if(result){
        result[0].set(objectToUpdate);
        result[0].save();
      }
    })

    return res.status(200).send({
      status:"1",
      message:"Amount added successfully",
      amount:main,
      add:add,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
