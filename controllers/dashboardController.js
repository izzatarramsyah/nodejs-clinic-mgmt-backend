import doctor from '../models/doctor.js';
import patient from '../models/patient.js';
import visitHistory from '../models/visitHistory.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const adminStats = async(req, res) => {
    try {
        doctor.find().then(res1 => {
            patient.find().then(res2 => {
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);
                visitHistory.find({date: {
                      $gte: startOfDay,
                      $lt: endOfDay
                    }}).then(res3 => {
                    res.status(200).json({
                        message : "Success",
                        countDoctor : res1.length,
                        countPatient : res2.length,
                        countQueue : res3.length
                    });
                });
            });
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}
