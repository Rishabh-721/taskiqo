import User from "../02_Model/User.model.js";
import {hashingPwd, matchingPwd} from "../04_Utils/PwdChange.utils.js"
import generateToken from "../04_Utils/CreatingToken.utils.js";


const signUp = async(req, res) => {
    try {
    
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Please Provide All Required Info"
            })
        }

        const isExist = await User.findOne({ email });

        if(isExist){
            return res.status(400).json({
                message: `User Already Exists, Kindly Login With Correct Info`
            })
        }
        const hashedPwd = await hashingPwd(password);

        const user = await User.create({
            name,
            email,
            password: hashedPwd,
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: `User created successfully. Please wait for Super Admin approval.`,
            data: userResponse,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Please Provide All Required Info"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if(!user){
            return res.status(401).json({
               message: "Invalid email or password." 
            });
        }

        if (user.isDeleted) {
            return res.status(403).json({
                message: "Account has been deleted."
            });
        }

        if(!user.isActive){
            return res.status(400).json({
                message: "Kindly Ask Super Admin for Approval"
            })
        }

        const isMatch = await matchingPwd(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: `Invalid email or password.`
            })
        }

        const data = {
            id: user._id,
            role: user.role,
            sessionVersion: user.sessionVersion,
            purpose: "Auth",
        }

        const token = generateToken(data, "7d");

        res.status(200).json({
            message: `User Logged in Successfully`,
            token,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })   
    }
}


const profile = async(req, res) => {

    const id = req.user.id;

    const user = await User.findById(id);

    if(!user || user.isDeleted){
        return res.status(401).json({
            message: "User dosen't exist"
        })
    }

    const userData = {
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role,
    }

    res.status(200).json({
        message: "User Found Successfully",
        data: userData,
    })
}

export {signUp, login, profile};