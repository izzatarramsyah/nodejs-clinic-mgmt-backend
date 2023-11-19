import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if ( token == null ) {
        return  res.status(401).json({
            message : "Unauthorized Token "
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log(err)
        if (err) {
            return  res.status(403).json({
                message : "Forbidden"
            });
        }
        req.email = decoded.email;
        next();
    })
}

export default verifyToken;