import inventory from '../models/inventory.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const getInventory = async(req, res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = req.body;
        const parameter = [];
        if ( request.param == 'name' ) {
            parameter.push({name : request.value});
        } else if ( request.param == 'category' ) {
            parameter.push({category : request.value});
        }
        inventory.find({$or: parameter})
        .then(response => {
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


export const saveInventory = (req , res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = req.body;
        const data = new inventory(request);
        data.save().then(response => {
            res.status(200).json({
                message : "Success",
                object : response
            });
        });
    } catch ( error ) {
        res.status(500).json({
            message : 'Err : ' + error.message
        });
    }   
}
