import user from '../models/user.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import doctor from '../models/doctor.js';
import patient from '../models/patient.js';
import visitHistory from '../models/visitHistory.js';
import { Aes256 } from '../security/aes256.js';

dotenv.config();

export const getUser = async(req, res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = JSON.parse(req.body);
        const uname = request.username;
        user.findOne({$or: [{username : uname}]})
        .then(usr => {
            res.status(200).json({
                message : "Successfuly Get User",
                object : usr
            });
        });
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
}

export const login = async(req, res) => {
    try {
        const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        console.log(request)
        const reqBody = request.body;
        const uname = reqBody.username;
        const password = reqBody.password;
        user.findOne({$or: [{username : uname}]})
        .then(usr => {
            if (usr) {
                bcrypt.compare(password, usr.password, function(err, result) {
                    if (err) {
                        return res.status(500).json({
                            message : err.message
                        });
                    }
                    if ( result ) {
                        const id = usr._id;
                        const username = usr.username;
                        const password = usr.password;
                        const menuId = usr.menuId;
                        const email = usr.email;
                        const role = usr.role;
                        const accessToken = jwt.sign({id,username,password,menuId,role,email}, process.env.ACCESS_TOKEN_SECRET,{
                            expiresIn : '20s'
                        })
                        const refreshToken = jwt.sign({id,username,password,menuId,role,email}, process.env.REFRESH_TOKEN_SECRET,{
                            expiresIn : '1d'
                        })
                        usr.refresh_token = refreshToken;
                        updateToken(id, refreshToken);
                        res.cookie('refreshToken' , refreshToken, {
                            httpOnly : true,
                            maxAge : 24*60*60*1000
                        });
                        res.status(200).json({
                            responseCode : 200,
                            accessToken : accessToken,
                            refreshToken : refreshToken,
                        });
                        // user.findByIdAndUpdate(id , usr, 
                        //     function (err, docs) { 
                        //     if (err){ 
                        //         res.status(500).json({
                        //             message : err.message
                        //         });
                        //     } else { 
                        //         res.cookie('refreshToken' , refreshToken, {
                        //             httpOnly : true,
                        //             maxAge : 24*60*60*1000
                        //         });
                        //         res.status(200).json({
                        //             accessToken : accessToken,
                        //         });
                        //     } 
                        // });
                    } else {
                        return res.status(500).json({
                            responseCode : 201,
                            responseMessage : "Password Tidak Sesuai "
                        });
                    }
                });                    
            } else {
                return res.status(500).json({
                    responseCode : 201,
                    responseMessage : "User Belum Terdaftar"
                });
            }
        });
    } catch ( error ) {
        res.status(500).json({
            responseCode : 201,
            responseMessage : error.message
        });
    }
}

const updateToken = async (id, refreshToken) => { 
    try { 
        const updatedResult = 
            await user.findByIdAndUpdate( 
                { _id: id }, 
                { 
                    refresh_token : refreshToken
                } ,
                { 
                    new: true,
                    runValidators: true
                }
            ); 
        console.log(updatedResult); 
    } catch (error) { 
        console.log(error); 
    } 
};

export const register = (req , res) => {
    try {
        // const request = JSON.parse(Aes256.decryptUsingAES256(req.body));
        const request = req.body;
        const reqUser = new user(request);
        const email = reqUser.email;
        const username = email.substring(0, email.indexOf("@"));
        reqUser.username = username;
        //const salt = bcrypt.genSalt();
        bcrypt.hash(reqUser.password, 10, function(err, hashPassword) {
            if (err) {
                return res.status(500).json({
                    message : 'Err decrypt password : ' + err.message
                });
            }
            reqUser.password = hashPassword;
            reqUser.save().then(reqUser => {
                res.status(200).json({
                    message : "Registrasi Berhasil",
                    object : reqUser
                });
            });
        });
    } catch ( error ) {
        res.status(500).json({
            message : 'Err : ' + error.message
        });
    }   
}

export const logout = (req , res) => {
    try {
        const request = req.body;
        const uname = request.username;
        user.findOne({$or: [{username : uname}]})
        .then(usr => {
            if (usr) {
                const id = usr._id;
                updateToken(id, null);
                res.clearCookie('refreshToken');
                    res.status(200).json({
                    responseCode : 200,
                    message : "Logout Success"
                });
            }
        });
        // const refreshToken = req.cookies.refreshToken;
        // if ( !refreshToken ) {
        //     res.status(204).json({
        //         message : "Invalid"
        //     });
        // } else {
        //     user.findOne({$or: [{refresh_token : refreshToken}]})
        //     .then(usr => {
        //         if (usr) {
        //             const id = usr._id;
        //             // usr.refresh_token = null;
        //             updateToken(id, null);
        //             res.clearCookie('refreshToken');
        //             res.status(200).json({
        //                 message : "Logout Success"
        //             });
        //             // user.findByIdAndUpdate(id , usr, 
        //             //     function (err, docs) { 
        //             //     if (err){ 
        //             //         res.status(500).json({
        //             //             message : error.message
        //             //         });
        //             //     } else { 
        //             //         res.clearCookie('refreshToken');
        //             //         res.status(200).json({
        //             //             message : "Logout Success"
        //             //         });
        //             //     } 
        //             // });
        //         }else {
        //             res.status(204).json({
        //                 message : "Invalid"
        //             });
        //         }
        //     });
        // }
    } catch ( error ) {
        res.status(500).json({
            message : error.message
        });
    }
};
