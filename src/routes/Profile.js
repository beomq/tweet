import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const getMyBtweets = async () => {
    const q = query(
      collection(dbService, 'btweets'),
      where('creatorId', '==', `${userObj.uid}`),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };

  useEffect(() => {
    getMyBtweets();
  }, []);

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      console.log(userObj);
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='profileForm'>
        <input
          type='text'
          placeholder='Display name'
          onChange={onChange}
          value={newDisplayName}
          autoFocus
        />
        <input
          type='submit'
          value='Update Profile'
          className='formBtn'
          style={{ marginTop: 10 }}
        />
      </form>
      <span className='formBtn cancleBtn logOut' onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
