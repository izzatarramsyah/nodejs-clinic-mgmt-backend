import doctor from '../models/doctor.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const getDoctor = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const parameter = [];
        if ( request.param == 'fullname' ) {
            parameter.push({fullname : request.value});
        } else if ( request.param == 'nip' ) {
            parameter.push({nip : request.nip});
        }
        doctor.find({$or: parameter})
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

export const saveDoctor = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const data = new doctor(request);
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

export const getListDoctor = async(req, res) => {
    try {
        doctor.find().then(response => {
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

export const deleteDoctor = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const id = request.id;
        doctor.findByIdAndDelete(id).then(response => {
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

export const updateDoctor = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        doctor.updateOne(
            { _id: request.id },
            { $set: { name: request.name,
                nip: request.nip,
                specialization: request.specialization,
                visitingTime: request.visitingTime
            } },
        ).then(response => {
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