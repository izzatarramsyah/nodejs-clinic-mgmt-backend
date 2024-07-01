import purchaseHistory from '../models/purchaseHistory.js';
import balance from '../models/balance.js';

import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const purchaseMedicine = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        var resp = [];
        let sum = 0;
        for (let i = 0; i < request.length; i++) {
            sum += Number(request[i].quantity * request[i].price)
            const data = new purchaseHistory(request[i]);
            data.save().then(response => {
                resp.push(response);
            });
        }
        balance.find({ username: request[0].username }).then(respBalance => {
            let currentBalance = respBalance[0].balance - sum;
            balance.updateOne(
                { username: request[0].username },
                { $set: { balance: currentBalance } });
        });
        res.status(200).json({
            message : "Success",
            object : resp
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }   
}

export const history = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const parameter = [];
        if ( request.param == 'date' ) {
            parameter.push({ createdAt: { $gte: request.startDate, $lte:  request.endDate }});
        } 
        purchaseHistory.find({$or: parameter}).then(response => {
            res.status(200).json({
                message : "Success",
                object : response
            });
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}
