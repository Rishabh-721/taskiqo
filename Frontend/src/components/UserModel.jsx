import React, { useState } from 'react'
import API from '../services/API'

const UserModel = ({user, onClose, userFetch, setSelectedUser}) => {
    const [loading, setLoading] = useState(false);

    const updateUser = async(action) => {
            console.log("was");
            console.log(user.isDeleted ? "Restore" : "Delete");
        try {
            console.log("to")
            console.log(user.isDeleted ? "Delete" : "Restore");
            setLoading(true);
            const response = await API('PATCH', `user/${user._id}/${action}`);
            setSelectedUser(response.data.data);
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
            userFetch();
            console.log("did");
            console.log(user.isDeleted ? "Deleted" : "Restored");
    }
}

  return (
    <div className="modal-overlay">
    <div className="modal">
        <h2>User Details</h2>

        <div className="user-info">

            <div className="info-row">
                <span>Name</span>
                <strong>{user.name}</strong>
            </div>

            <div className="info-row">
                <span>Email</span>
                <strong>{user.email}</strong>
            </div>

            <div className="info-row">
                <span>Role</span>
                <strong>{user.role}</strong>
            </div>

            <div className="info-row">
                <span>Status</span>

                <div className="status">
                    <span className={`status-dot ${user.isActive ? "active" : "inactive"}`}></span>
                    <strong>{user.isActive ? "Active" : "Inactive"}</strong>
                </div>
            </div>

            <div className="info-row">
                <span>Deleted</span>

                <div className="status">
                    <span className={`status-dot ${user.isDeleted ? "deleted" : "not-deleted"}`}></span>
                    <strong>{user.isDeleted ? "Deleted" : "Not Deleted"}</strong>
                </div>
            </div>

        </div>

        <div className="action-buttons">

            {user.isActive ? (
                <button
                    className="btn warning"
                    onClick={() => updateUser("deactivate")}
                    disabled={loading}
                >
                    Deactivate
                </button>
            ) : (
                <button
                    className="btn success"
                    onClick={() => updateUser("activate")}
                    disabled={loading}
                >
                    Activate
                </button>
            )}

            {user.isDeleted ? (
                <button
                    className="btn success"
                    onClick={() => updateUser("restore")}
                    disabled={loading}
                >
                    Restore
                </button>
            ) : (
                <button
                    className="btn danger"
                    onClick={() => updateUser("delete")}
                    disabled={loading}
                >
                    Delete
                </button>
            )}

            {!user.isDeleted && user.role !== "Super_Admin" && (
                <button
                    className="btn primary"
                    onClick={() => updateUser("promote")}
                    disabled={loading}
                >
                    Promote
                </button>
            )}

            {!user.isDeleted && user.role !== "Employee" && (
                <button
                    className="btn secondary"
                    onClick={() => updateUser("demote")}
                    disabled={loading}
                >
                    Demote
                </button>
            )}

            <button
                className="btn close"
                onClick={onClose}
            >
                Close
            </button>

        </div>
    </div>
</div>
        )
    }



export default UserModel;
