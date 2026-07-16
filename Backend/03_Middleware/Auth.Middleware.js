import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../02_Model/User.model.js";

const auth = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "No Token Found"
        })
    }
    
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({
                message: `User Dosen't exist`
            })
        }

        if(user.isDeleted){
            return res.status(401).json({
                message: "Account has been Deleted"
            })  
        }

        if(!user.isActive){
            return res.status(401).json({
                message: "Account is inactive"
            })  
        }

        if (decoded.purpose !== "Auth") {
            return res.status(401).json({
                message: "Token for wrong purpose"
            });
        }

        if(decoded.role !== user.role){
            return res.status(401).json({
                message: "User role is incorrect, kindly relogin"
            })
        }

        if(decoded.sessionVersion !== user.sessionVersion){
            return res.status(401).json({
                message: `Session expired. Please login again.`
            })
        }

        req.user = {
            id: user._id,
            role: user.role,
        };

        next();

    } catch (error) {
        res.status(401).json({
            message: `Auth Error : ${error.message}`
        })
    }
}

export default auth;