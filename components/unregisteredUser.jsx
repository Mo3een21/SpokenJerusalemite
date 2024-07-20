"use client";

import React, { useEffect, useState } from 'react';
import { db, auth } from '../app/firebase/firebase';
import { getDocs, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import ListModal from './ListModal'; // Import ListModal
import './acceptUser.css'; // Ensure this import

const UnregisteredUserList = () => {
  const [users, setUsers] = useState([]);
  const [isAdminOrOwner, setIsAdminOrOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState({ field: 'requestDate', order: 'asc' });
  const [isListModalOpen, setIsListModalOpen] = useState(false); // State for ListModal
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const router = useRouter();

  useEffect(() => {
    const checkAdminOrOwnerStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && (userDoc.data().status === 'admin' || userDoc.data().status === 'owner')) {
          setIsAdminOrOwner(true);
        } else {
          alert("You do not have permission to access this page.");
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    checkAdminOrOwnerStatus();
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const collectionRef = collection(db, 'Users');
        const querySnapshot = await getDocs(collectionRef);
        const pendingUsers = [];

        querySnapshot.forEach((doc) => {
          if (doc.data().status === "pending") {
            pendingUsers.push({ id: doc.id, ...doc.data() });
          }
        });

        setUsers(pendingUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    if (isAdminOrOwner) {
      fetchUsers();
    }
  }, [isAdminOrOwner]);

  const handleAccept = async (uid) => {
    try {
      const userDocRef = doc(db, 'Users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, { status: 'admin' });

        setUsers(users.filter(user => user.id !== uid));
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };

  const handleReject = async (uid) => {
    try {
      const userDocRef = doc(db, 'Users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, { status: 'rejected' });

        setUsers(users.filter(user => user.id !== uid));
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };

  const sortUsers = (field) => {
    const order = sortOrder.field === field && sortOrder.order === 'asc' ? 'desc' : 'asc';
    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setSortOrder({ field, order });
    setUsers(sortedUsers);
  };

  const openListModal = (user) => {
    setSelectedUser(user);
    setIsListModalOpen(true);
  };

  const closeListModal = () => {
    setSelectedUser(null);
    setIsListModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdminOrOwner) {
    return null;
  }

  return (
    <div className="table-container">
      <h1>Pending Requests</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>
              <div className="header-container">
                <button onClick={() => sortUsers('firstName')} className="sort-button">
                  <img src="/assets/images/sort.png" alt="Sort" />
                </button>
                <span>Name</span>
              </div>
            </th>
            <th>
              <div className="header-container">
                <button onClick={() => sortUsers('email')} className="sort-button">
                  <img src="/assets/images/sort.png" alt="Sort" />
                </button>
                <span>Email</span>
              </div>
            </th>
            <th>
              <div className="header-container">
                <button onClick={() => sortUsers('requestDate')} className="sort-button">
                  <img src="/assets/images/sort.png" alt="Sort" />
                </button>
                <span>Request Date</span>
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.requestDate).toLocaleString()}</td>
              <td>
                <button onClick={() => handleAccept(user.id)} className="icon-buttons accept">
                  <img src="/assets/images/tick.png" alt="Accept" />
                </button>
                <button onClick={() => handleReject(user.id)} className="icon-buttons reject">
                  <img src="/assets/images/cross.png" alt="Reject" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isListModalOpen && (
        <ListModal isOpen={isListModalOpen} onClose={closeListModal}>
          <div className="list-modal-content">
            <h2>User Details</h2>
            {selectedUser && (
              <>
                <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Request Date:</strong> {new Date(selectedUser.requestDate).toLocaleString()}</p>
              </>
            )}
            <div className="button-container">
              <button onClick={closeListModal} className="close-button">Close</button>
            </div>
          </div>
        </ListModal>
      )}
    </div>
  );
};

export default UnregisteredUserList;
