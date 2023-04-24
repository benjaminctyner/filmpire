import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
//get access to profile name or id fomr the redux state, then dispplay it

const Profile = () => {
  const { user } = useSelector(userSelector);
  return <div>{`${user.id}'s Profile`}</div>;
};

export default Profile;
