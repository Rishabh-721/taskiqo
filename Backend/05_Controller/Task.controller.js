import Task from "../02_Model/Task.model.js";
import User from "../02_Model/User.model.js";

const taskCreation = async (req, res) => {
    try {
        const id = req.user.id;


        const {
            title,
            description,
            priority,
            dueDate,
            status,
            assignedTo
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required."
            })
        }

        if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
            return res.status(400).json({
                message: "At least one user must be assigned."
            });
        }

        for (const assignment of assignedTo) {
            const user = await User.findById(assignment.user);      
            if (!user) {
                return res.status(404).json({
                    message: `User ${assignment.user} not found`
                });
            }
        }

        const task = await Task.create({
            title,
            description,
            createdBy: id,
            priority,
            dueDate,
            status,
            assignedTo
        })

        res.status(201).json({
            message: "Task is created Sucessfully",
            data: task,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskUpdate = async (req, res) => {
    try {
        const userid = req.user.id;
        const id = req.params.id;
        const {
            title,
            description,
            priority,
            dueDate,
            status,
            assignedTo
        } = req.body;


        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required."
            });
        }

        if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
            return res.status(400).json({
                message: "At least one user must be assigned."
            });
        }

        const task = await Task.findById(id);


        if (!task) {
            return res.status(404).json({
                message: "Task not Found"
            })
        }

        if (task.createdBy.toString() !== userid.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this task."
            });
        }

        task.title = title;
        task.description = description;
        task.priority = priority;
        task.dueDate = dueDate;
        task.status = status;
        task.assignedTo = assignedTo;

        await task.save();

        res.status(200).json({
            message: `Task Has been Updated Successfully`,
            data: task,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskDelete = async (req, res) => {
    try {
        const userid = req.user.id;

        const {
            id
        } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task Not not Found"
            })
        }

        if (!task.createdBy.equals(userid)) {
            return res.status(403).json({
                message: "User is Unauthorize"
            })
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task Deleted Sucessfully",
            data: task,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskReassingAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { newAdminId } = req.body;

        if (!newAdminId) {
            return res.status(400).json({
                message: "New admin ID is required."
            });
        }

        const oldAdmin = await User.findById(id);
        const newAdmin = await User.findById(newAdminId);

        if (!oldAdmin || !newAdmin) {
            return res.status(404).json({
                message: "Admin Not Found"
            })
        }



        if (oldAdmin._id.equals(newAdmin._id)) {
            return res.status(400).json({
                message: "Old and new admin cannot be the same."
            });
        }

        if (oldAdmin.role !== "Admin" || newAdmin.role !== "Admin") {
            return res.status(400).json({
                message: `Old Admin is ${oldAdmin.role} & New Admin is ${newAdmin.role}`
            })
        }

        const result = await Task.updateMany({
            createdBy: oldAdmin._id
        }, {
            $set: {
                createdBy: newAdmin._id
            }
        });

        res.status(200).json({
            message: `Task Reassigned Sucessfully`,
            tasksReassigned: result.modifiedCount,
            data: result,
        });

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskListSuperAdmin = async (req, res) => {
    try {
        const {
            createdBy,
            priority,
            dueDate,
            status,
            assignedTo
        } = req.query;

        const filter = {};

        if (priority) {
            filter.priority = priority;
        }

        if (dueDate) {
            filter.dueDate = dueDate;
        }

        if (status) {
            filter.status = status;
        }

        if (createdBy) {
            filter.createdBy = createdBy;
        }

        if (assignedTo) {
            filter["assignedTo.user"] = assignedTo;
        }

        const tasks = await Task.find(filter);

        let msg;
        if (tasks.length === 0) {
            msg = "No Task Found"
        } else {
            msg = "Task Found Successfully"
        }

        res.status(200).json({
            message: msg,
            totalTasks: tasks.length,
            data: tasks,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskListAdmin = async (req, res) => {
    try {
        const userid = req.user.id;

        const {
            priority,
            dueDate,
            status,
            assignedTo
        } = req.query;

        const filter = {};

        filter.createdBy = userid;

        if (priority) {
            filter.priority = priority;
        }

        if (dueDate) {
            filter.dueDate = dueDate;
        }

        if (status) {
            filter.status = status;
        }

        if (assignedTo) {
            filter["assignedTo.user"] = assignedTo;
        }

        const tasks = await Task.find(filter);

        let msg;
        if (tasks.length === 0) {
            msg = "No Task Found"
        } else {
            msg = "Task Found Successfully"
        }

        res.status(200).json({
            message: msg,
            totalTasks: tasks.length,
            data: tasks,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskListEmployee = async (req, res) => {
    try {
        const userid = req.user.id;

        const {
            priority,
            dueDate,
            status,
            isCompleted
        } = req.query;

        const filter = {};

        filter["assignedTo.user"] = userid;

        if (isCompleted !== undefined) {
            filter["assignedTo.isCompleted"] = isCompleted;
        }

        if (priority) {
            filter.priority = priority;
        }

        if (dueDate) {
            filter.dueDate = dueDate;
        }

        if (status) {
            filter.status = status;
        }

        const tasks = await Task.find(filter);

        let msg;
        if (tasks.length === 0) {
            msg = "No Task Found"
        } else {
            msg = "Task Found Successfully"
        }

        res.status(200).json({
            message: msg,
            totalTasks: tasks.length,
            data: tasks,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const assignedIsCompleated = async (req, res) => {
    try {
        const assignedTaskId = req.params.id;
        const userid = req.user.id;

        const task = await Task.findOne({
            "assignedTo._id": assignedTaskId
        });

        if (!task) {
            return res.status(400).json({
                message: "No Task Found"
            })
        }

        if (task.status === "Compleated" || task.status === "Submitted") {
            return res.status(404).json({
                message: `Task is already ${task.status}`
            });
        }

        const assignment = task.assignedTo.id(assignedTaskId);

        if (!assignment.user.equals(userid)) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        if (assignment.isCompleted) {
            return res.status(400).json({
                message: "Task already marked completed"
            });
        }

        assignment.isCompleted = true;

        const allCompleted = task.assignedTo.every(
            a => a.isCompleted
        );

        task.status = allCompleted ? "Submitted" : "In-Progress";

        await task.save();

        return res.status(200).json({
            message: "Task marked completed successfully",
            data: task
        });

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}

const review = async(req, res) => {
    try {
    const taskId = req.params.id;
    const userid = req.user.id;
    const {assignedTaskId} = req.body;

    const task = await Task.findById(taskId);

    if(!task){
        return res.status(404).json({
            message: `Task not Found`
        })
    }

    if(!task.createdBy.equals(userid)){
        return res.status(400).json({
            message: "Unorthorized"
        })
    }

    if(!Array.isArray(assignedTaskId)){
            return res.status(404).json({
                message: "Provide task assigned to id thats to be cancle"
            })
    }
        
    if(assignedTaskId.length > 0){
        
    for(const id of assignedTaskId){
        const assignment = task.assignedTo.id(id);
        if(!assignment){
            return res.status(404).json({
                message: `Assignment ${id} not found`
            });
        }
        assignment.isCompleted = false;
    }

    const allCancled = task.assignedTo.every( a => !a.isCompleted);

    task.status = allCancled ? "Pending" : "In-Progress";

    }else{
        task.status = "Compleated"
    }

    await task.save();

    res.status(200).json({
        message: "Review Done Sucessfully",
        data: task,
    })
        
    } catch (error) {
        return res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}
const dashboard = async(req, res) => {
    try {
        const id = req.user.id;
        const role = req.user.role;

        let dashboard = {};

        if(role === "Super_Admin"){
            dashboard = {
            totalUsers : await User.countDocuments({isDeleted : false}),
            activeUsers : await User.countDocuments({isDeleted : false, isActive: true}),
            inactiveUsers : await User.countDocuments({isDeleted : false, isActive: false}),
            deletedUsers : await User.countDocuments({isDeleted: true}),

            isSuperAdmin : await User.countDocuments({isDeleted : false,role : "Super_Admin"}),
            isAdmin : await User.countDocuments({isDeleted : false,role : "Admin"}),
            isEmployee : await User.countDocuments({isDeleted : false,role : "Employee"}),

            totalTasks : await Task.countDocuments(),
            pendingTasks : await Task.countDocuments({status: "Pending"}),
            inProgressTasks : await Task.countDocuments({status: "In-Progress"}),
            submittedTasks : await Task.countDocuments({status: "Submitted"}),
            completedTasks : await Task.countDocuments({status: "Compleated"}),
            }
        }else if(role === "Admin"){
            dashboard = {
                totalTasks : await Task.countDocuments({createdBy: id}),
                pendingTasks : await Task.countDocuments({createdBy: id, status: "Pending"}),
                inProgressTasks : await Task.countDocuments({createdBy: id,status: "In-Progress"}),
                submittedTasks : await Task.countDocuments({createdBy: id,status: "Submitted"}),
                completedTasks : await Task.countDocuments({createdBy: id,status: "Compleated"}),
            }
        }else if (role === "Employee") {
            dashboard = {
                totalTasks : await Task.countDocuments({"assignedTo.user": id}),
                pendingTasks : await Task.countDocuments({"assignedTo.user": id, status: "Pending"}),
                inProgressTasks : await Task.countDocuments({"assignedTo.user": id,status: "In-Progress"}),
                submittedTasks : await Task.countDocuments({"assignedTo.user": id,status: "Submitted"}),
                completedTasks : await Task.countDocuments({"assignedTo.user": id,status: "Compleated"}),
            }
        }

        res.status(200).json({
            message: "Dashboard Created Sucessfully",
            data: dashboard,
        })

    } catch (error) {
        return res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}

export {
    taskCreation,
    taskUpdate,
    taskDelete,
    taskReassingAdmin,
    taskListSuperAdmin,
    taskListAdmin,
    taskListEmployee,
    assignedIsCompleated,
    review,
    dashboard,
};