const db = require("../models");
const User = db.user;
const bill= db.bill;
const data3=db.data;
const mcd=db.mcd;
var request = require('request');
const {response} = require("express");
const axios = require('axios');

exports.listdata = async (req, res) => {
    try {
        const options = {
            'method': 'GET',
            'url': 'https://reseller.mcd.5starcompany.com.ng/api/v1/data/mtn',
            'headers': {
                'Authorization': 'Bearer rocqaIlgQZ7S22pno8kiXwgaGsRANJEHD5ai49nX7CrXBfZVS7vvRfCzYmdzZ2GuqmB6JgrUZBmFjwNXUDF9zEV25tWH7ADv7SjcJuOlWypRxpoy28KQU0U2D3XWjKQybBYjNixsMCBv1GJxQPNMcC'
            }
        };

        const response = await axios(options);
        const data = response.data.data; // Assuming the response contains JSON data

        const processedData = data.map(process => {
            return {
                plan_id: process.coded,
                network: process.network,
                plan: process.name,
                category: process.category,
                code: process.coded,
                amount: process.price,
                tamount: process.price,
                ramount: process.price
            };
        });

        // Assuming 'data3' is a model you want to use for saving data to a database
        // Assuming 'create' is a method to create a new record
        for (const process of processedData) {
            await mcd.create(process);
        }

        return res.status(200).json(response.data.data);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};
