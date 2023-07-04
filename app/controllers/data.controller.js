const db = require("../models");
const User = db.user;
const bill= db.bill;
const data=db.data;
var request = require('request');
const {response} = require("express");

exports.data =  async (req, res) => {
    const userid = req.body.userId;
    var boy;
    try {
        let authorities = [];


        const allplan= await data.findAll({
            where:{
                network:req.body.network,
                status:'1',
            },
        });

        // console.log(allplan);
        return res.status(200).send(allplan);

    } catch (error) {
        return res.status(201).send({
            message: error.message});
    }

    res.status(200).send("User Content.");

};
