import patient from '../models/patient.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const getPatient = async(req, res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = JSON.parse(req.body);
        const fullname = request.fullname;
        patient.find({$or: [{fullname : fullname}]})
        .then(response => {
            res.status(200).json({
                message : "Successfuly Get Patient",
                object : response
            });
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}

export const savePatient = (req , res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = JSON.parse(req.body);
        const data = new patient(request);
        data.save().then(response => {
            res.status(200).json({
                message : "Registrasi Berhasil",
                object : response
            });
        });
    } catch ( error ) {
        res.status(500).json({
            message : 'Err : ' + error.message
        });
    }   
}
