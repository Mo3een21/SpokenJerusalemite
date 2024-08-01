"use client";

import React, { useEffect, useState } from 'react';
import { db, auth } from '../app/firebase/firebase';
import { getDocs, collection, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import ListModal from './ListModal'; // Import ListModal
import './adminUser.css'; // Ensure this import

const AdminUserList = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState({ field: 'firstName', order: 'asc' });
    const [isAdminListModalOpen, setIsAdminListModalOpen] = useState(false); // State for ListModal
    const [selectedAdminUser, setSelectedAdminUser] = useState(null); // State for selected user

    useEffect(() => {
        const checkOwnerStatus = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, 'Users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists() && (userDoc.data().status === 'owner' || userDoc.data().status === 'admin')) {
                    setIsOwner(true);
                } else {
                    alert("You do not have permission to access this page.");
                }
            }
            setLoading(false);
        };

        checkOwnerStatus();
    }, []);

    useEffect(() => {
        const fetchAdminUsers = async () => {
            try {
                const collectionRef = collection(db, 'Users');
                const querySnapshot = await getDocs(collectionRef);
                const admins = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.status === "admin" || data.status === "owner") {
                        admins.push({ id: doc.id, ...data });
                    }
                });

                setAdminUsers(admins);
            } catch (error) {
                console.error("Error fetching admin users: ", error);
            }
        };

        if (isOwner) {
            fetchAdminUsers();
        }
    }, [isOwner]);

    const openAdminListModal = (user) => {
        setSelectedAdminUser(user);
        setIsAdminListModalOpen(true);
    };

    const closeAdminListModal = () => {
        setSelectedAdminUser(null);
        setIsAdminListModalOpen(false);
    };

    const deleteAdminUser = async (uid) => {
        try {
            const userDocRef = doc(db, 'Users', uid);
            await deleteDoc(userDocRef);
            setAdminUsers(adminUsers.filter(user => user.id !== uid));
            alert("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    const promoteToOwner = async (uid) => {
        try {
            const userDocRef = doc(db, 'Users', uid);
            await updateDoc(userDocRef, { status: 'owner' });
            setAdminUsers(adminUsers.map(user => user.id === uid ? { ...user, status: 'owner' } : user));
            alert("User promoted to owner successfully");
        } catch (error) {
            console.error("Error promoting user to owner: ", error);
        }
    };

    const sortUsers = (field) => {
        const order = sortOrder.field === field && sortOrder.order === 'asc' ? 'desc' : 'asc';
        const sortedUsers = [...adminUsers].sort((a, b) => {
            if (field === 'isActive') {
                if (a[field] === b[field]) return 0;
                return order === 'asc' ? (a[field] ? -1 : 1) : (a[field] ? 1 : -1);
            } else {
                if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
                if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
                return 0;
            }
        });
        setSortOrder({ field, order });
        setAdminUsers(sortedUsers);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isOwner) {
        return null;
    }

    return (
        <div className="table-container">
            <h1>Admin and Owner Users</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>
                            <div className="header-container">
                                <span>Name</span>
                                <button onClick={() => sortUsers('firstName')} className="sort-button">
                                    <img src="/assets/images/sort.png" alt="Sort" />
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="header-container">
                                <span>Email</span>
                                <button onClick={() => sortUsers('email')} className="sort-button">
                                    <img src="/assets/images/sort.png" alt="Sort" />
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="header-container">
                                <span>Phone Number</span>
                                <button onClick={() => sortUsers('phoneNumber')} className="sort-button">
                                    <img src="/assets/images/sort.png" alt="Sort" />
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="header-container">
                                <span>Activity</span>
                                <button onClick={() => sortUsers('isActive')} className="sort-button">
                                    <img src="/assets/images/sort.png" alt="Sort" />
                                </button>
                            </div>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adminUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                {user.isActive ? (
                                    <img src="/assets/images/activeIcon.png" alt="Active" className="status-icon" />
                                ) : (
                                    <img src="/assets/images/inactiveIcon.png" alt="Inactive" className="status-icon" />
                                )}
                            </td>
                            <td>
                                <button onClick={() => deleteAdminUser(user.id)} className="delete-user-button">
                                    <img src="/assets/images/deleteStory.png" alt="Delete" className="delete-user-icon" />
                                </button>
                                {user.status === 'admin' && (
                                    <button onClick={() => promoteToOwner(user.id)} className="promote-user-button">
                                        Promote to Owner
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isAdminListModalOpen && (
                <ListModal isOpen={isAdminListModalOpen} onClose={closeAdminListModal}>
                    <div className="list-modal-content">
                        <h2>Admin User Details</h2>
                        {selectedAdminUser && (
                            <>
                                <p><strong>Name:</strong> {selectedAdminUser.firstName} {selectedAdminUser.lastName}</p>
                                <p><strong>Email:</strong> {selectedAdminUser.email}</p>
                                <p><strong>Phone Number:</strong> {selectedAdminUser.phoneNumber}</p>
                                <p><strong>Activity:</strong> {selectedAdminUser.isActive ? (
                                    <img src="/assets/images/activeIcon.png" alt="Active" className="status-icon" />
                                ) : (
                                    <img src="/assets/images/inactiveIcon.png" alt="Inactive" className="status-icon" />
                                )}</p>
                            </>
                        )}
                        <div className="admin-button-container">
                            <button onClick={closeAdminListModal} className="admin-close-button">Close</button>
                        </div>
                    </div>
                </ListModal>
            )}
        </div>
    );
};

export default AdminUserList;
