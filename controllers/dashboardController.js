import doctor from '../models/doctor.js';
import patient from '../models/patient.js';
import visitHistory from '../models/visitHistory.js';
import balance from '../models/balance.js';
import purchaseHistory from '../models/purchaseHistory.js';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const adminStats = async(req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const [countDoctor, countPurchase, countQueue] = await Promise.all([
            doctor.count(),
            patient.count(),
            visitHistory.count({createdAt: { $gte: startOfDay, $lt: endOfDay }})
        ]);
        res.status(200).json({
            message : "Success",
            object : { countDoctor, countPurchase, countQueue }
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}

export const patientStats = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const [countBalance, countVisit, countPurchase] = await Promise.all([
            balance.find({username : request.username}).select('balance -_id'),
            visitHistory.count({patientName : 'pasien 1'}),
            purchaseHistory.aggregate([
                { $match: { username : request.username } },
                { $group: { _id: null,  totalPurchase: { $sum: '$totalBuy' }} }
            ])
        ]);
        res.status(200).json({
            message : "Success",
            object : { countBalance,countVisit,countPurchase }
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}

export const doctortStats = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const [countQueue, countPatient, countVisit] = await Promise.all([
            visitHistory.count({doctorName : 'Dr. John Doe', createdAt: { $gte: startOfDay, $lt: endOfDay }}),
            patient.count(),
            visitHistory.count({doctorName : 'Dr. John Doe'})
        ]);
        res.status(200).json({
            message : "Success",
            object : { countQueue,countPatient,countVisit }
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}