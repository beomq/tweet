import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <BrowserRouter basename='/'>
      {isLoggedIn && <Navigation userObj={userObj} refreshUser={refreshUser} />}
      <div
        style={{
          maxWidth: 890,
          width: '100%',
          margin: '0 auto',
          marginTom: 80,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path='/' element={<Home userObj={userObj} />} />
              <Route
                path='/profile'
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <Route path='/' element={<Auth />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
