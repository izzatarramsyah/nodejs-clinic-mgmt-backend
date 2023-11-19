import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import dotenv from 'dotenv'
dotenv.config();

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if ( !refreshToken ){
            return  res.status(401).json({
                message : "Unauthorized Token"
            });
        }
        user.findOne({$or: [{refresh_token : refreshToken}]})
        .then(usr => {
            if (usr) {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err){
                        console.log(err)
                        return res.status(203).json({
                            message : "Forbidden"
                        });
                    } else {
                        const id = usr._id;
                        const username = usr.username;
                        const email = usr.email;
                        const accessToken = jwt.sign({id,username,email}, process.env.ACCESS_TOKEN_SECRET,{
                            expiresIn : '20s'
                        })
                        res.status(200).json({
                            accessToken : accessToken
                        });
                    }
                });
            } else {
                return res.status(203).json({
                    message : "User Invalid"
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

export default refreshToken;