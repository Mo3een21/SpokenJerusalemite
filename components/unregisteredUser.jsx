import React, { useEffect, useState } from 'react';
import { db } from '../app/firebase/firebase';
import { getDocs, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const UnregisteredUserList = () => {
  const [users, setUsers] = useState([]);

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

    fetchUsers();
  }, []);

  const handleAccept = async (uid) => {
    try {
      const userDocRef = doc(db, 'Users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log('User data:', userDoc.data().status);
        await updateDoc(userDocRef, { status: 'admin' });
        console.log('User status updated to admin');

        // Update state to remove the accepted user
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
        console.log('User data:', userDoc.data().status);
        await updateDoc(userDocRef, { status: 'rejected' });
        console.log('User status updated to rejected');

        // Update state to remove the rejected user
        setUsers(users.filter(user => user.id !== uid));
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <button onClick={() => handleAccept(user.id)} className="icon-buttons">
            <img src="assets/images/check.png" alt="accept" />
          </button>
          <button onClick={() => handleReject(user.id)} className="icon-buttons">
            <img src="assets/images/close.png" alt="reject" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UnregisteredUserList;