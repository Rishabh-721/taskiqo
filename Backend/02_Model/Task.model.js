import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Urgent"],
        default: "Low"
    },
    dueDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["Pending", "In-Progress", "Submitted", "Compleated"],
        default: "Pending"
    },
    assignedTo: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        work: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
    }],
});

const Task = mongoose.model("Task", taskSchema);

export default Task;