"use client"
import {React } from 'react';
import UnregisteredUserList from '@/components/unregisteredUser';
import './acceptUser.css';

const AcceptUsers = () => {

  return (
    <div className='container'>
      <UnregisteredUserList  />
    </div>
  );
};

export default AcceptUsers;