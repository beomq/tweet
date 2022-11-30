import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { dbService, storageService } from 'fbase';
import Btweet from 'components/Btweet';
import BtweetFactory from 'components/BtweetFactory';

const Home = ({ userObj }) => {
  const [btweets, setBtweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'btweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const btweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBtweets(btweetArray);
    });
  }, []);

  return (
    <div className='container'>
      <BtweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {btweets.map((btweet) => (
          <Btweet
            btweetObj={btweet}
            key={btweet.id}
            isOwner={btweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
