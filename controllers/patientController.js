import patient from '../models/patient.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const getPatient = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const parameter = [];
        if ( request.param == 'fullname' ) {
            parameter.push({fullname : request.value});
        } else if ( request.param == 'bpjsNo' ) {
            parameter.push({bpjs : request.value});
        }
        patient.find({$or: parameter})
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

export const getListPatient = async(req, res) => {
    try {
        patient.find().then(response => {
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


export const savePatient = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const data = new patient(request);
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

export const deletePatient = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const id = request.id;
        patient.findByIdAndDelete(id).then(response => {
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

export const updatePatient = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        patient.updateOne(
            { _id: request.id },
            { $set: { fullname: request.fullname,
                bpjs: request.bpjs,
                gender: request.gender,
                birthDate: request.birthDate
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