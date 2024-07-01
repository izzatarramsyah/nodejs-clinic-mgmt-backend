import medicalRecord from '../models/medicalRecord.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const saveMedicalRecord = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const data = new medicalRecord(request);
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

export const getHistory = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const parameter = [];
        if ( request.param == 'patientName' ) {
            parameter.push({patientName : request.value});
        } else  if ( request.param == 'date' ) {
            parameter.push({ createdAt: { $gte: request.startDate, $lte:  request.endDate }});
        }
        medicalRecord.find({$or: parameter})
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

export const getHistoryByDoctor = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const parameter = [];
        parameter.push({doctorName : request.value});
        if ( request.param == 'patientName' ) {
            parameter.push({patientName : request.value});
        } else  if ( request.param == 'date' ) {
            parameter.push({ createdAt: { $gte: request.startDate, $lte:  request.endDate }});
        }
        medicalRecord.find({$or: parameter})
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