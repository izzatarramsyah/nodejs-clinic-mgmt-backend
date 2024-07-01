import queue from '../models/queue.js';
import dotenv from 'dotenv'
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const addQueue = (req , res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const data = new queue(request);
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

export const getQueue = async(req, res) => {
    try {
        const [queueGeneral, queueDentist, queuePediatric] = await Promise.all([
            queue.findOne({poli : 'UMUM', status : 'IDLE'}).sort({ date: 1 }),
            queue.findOne({poli : 'GIGI', status : 'IDLE'}).sort({ date: 1 }),
            queue.findOne({poli : 'IBU DAN ABAK', status : 'IDLE'}).sort({ date: 1 }),
        ]);
        res.status(200).json({
            message : "Success",
            object : { queueGeneral,queueDentist,queuePediatric }
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}
