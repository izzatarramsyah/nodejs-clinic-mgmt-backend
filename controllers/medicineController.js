import medicine from '../models/medicine.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const getListMedicine = async(req, res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        medicine.find().then(response => {
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

export const getMedicine = async(req, res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = req.body;
        const parameter = [];
        if ( request.param == 'name' ) {
            parameter.push({name : request.value});
        } else if ( request.param == 'category' ) {
            parameter.push({category : request.value});
        }
        medicine.find({$or: parameter})
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

export const saveMedicine = (req , res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = req.body;
        const data = new medicine(request);
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
