import User from "../02_Model/User.model.js";

    const activate = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User is not in Database"
                });
            }

            if(user.isActive){
                return res.status(400).json({
                    message: `User is already activated`
                })
            }

            user.isActive = true;
            user.sessionVersion++;
            await user.save()
            

            
            res.status(200).json({
                message: "User account activated successfully",
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }


    const deactivate = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User is not in Database"
                });
            }

            if(!user.isActive){
                return res.status(400).json({
                    message: `User is already deactivated`
                })
            }

            
            user.isActive = false;
            user.sessionVersion++;
            await user.save()

            res.status(200).json({
                message: "User account deactivated successfully",
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })     
        }
    }

    const promote = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);
            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(user.role === "Super_Admin"){
            return res.status(400).json({
                message: "User can't be Promoted Further"
            })
            }else if(user.role === "Admin"){
            user.role = "Super_Admin"
            }else{
            user.role = "Admin"
            }

            user.sessionVersion++;
            await user.save();
            
            res.status(200).json({
                message: `User is promoted to ${user.role}`,
                data: user,
            })
        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const demote = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);
            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(user.role === "Employee"){
            return res.status(400).json({
                message: "User can't be Demoted Further"
            })
            }else if(user.role === "Admin"){
            user.role = "Employee"
            }else{
            user.role = "Admin"
            }

            user.sessionVersion++;
            await user.save();
            
            res.status(200).json({
                message: `User is demoted to ${user.role}`,
                data: user,
            }) 
        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const softDelete = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(user.isDeleted){
                return res.status(400).json({
                    message: "User is Already Deleted" 
                })
            }

            user.isDeleted = true;
            user.sessionVersion++;
            
            await user.save();

            res.status(200).json({
                message: "User Account is Deleted Successfully",
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const restoreUser = async(req, res) => {
        try {
            const {id} = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(!user.isDeleted){
                return res.status(400).json({
                    message: `User is not deleted and can't be restored`
                })
            }

            user.isDeleted = false;
            user.sessionVersion++;
            await user.save();

            res.status(200).json({
                message: `User restored successfully`,
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const userListSuperAdmin = async(req, res) => {
        try {
            const { role, isActive, isDeleted, search} = req.query;
            const id = req.user.id;

            const filter = {
                _id: { $ne: id },
            };

            if(role){
                filter.role = role;
            }

            if(isActive !== undefined){
                filter.isActive = isActive === "true";
            }

            if(isDeleted !== undefined){
                filter.isDeleted = isDeleted === "true";
            }

            let msg;

            const users = await User.find(filter);
            
            if((users.length === 0)){
                if(Object.keys(filter).length > 0){
                    const mesg = Object.entries(filter).map(([key, value]) => `${key} is ${value}`).join(", ");
                    msg = `No User Found when ${mesg}`
                }else{
                    msg = "No User Found"
                }
            }else{
                msg = "User Found Successfully"
            }
            

            res.status(200).json({
                message : msg,
                totalUsers: users.length,
                data: users,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

        const userListAdmin = async(req, res) => {
        try {
            const {isActive, isDeleted } = req.query;

            const filter = {};

            filter.role = "Employee";

            if(isActive !== undefined){
                filter.isActive = isActive === "true";
            }

            if(isDeleted !== undefined){
                filter.isDeleted = isDeleted === "true";
            }

            let msg;


            const users = await User.find(filter);
            
            if((users.length === 0)){
                if(Object.keys(filter).length > 0){
                    const mesg = Object.entries(filter).map(([key, value]) => `${key} is ${value}`).join(", ");
                    msg = `No User Found when ${mesg}`
                }else{
                    msg = "No User Found"
                }
            }else{
                msg = "User Found Successfully"
            }
            

            res.status(200).json({
                message : msg,
                data: users,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }



    export {activate, deactivate, promote, demote, softDelete, restoreUser, userListSuperAdmin, userListAdmin};