const role = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized: Please log in first"
            });
        }

        if(!roles.includes(req.user.role)){
            res.status(403).json({
                message: "Access Denied"
            })
        }

        next();
    }
}

export default role;