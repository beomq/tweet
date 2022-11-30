import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { dbService, storageService } from 'fbase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const BtweetFactory = ({ userObj }) => {
  const [btweet, setBtweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url'
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const BtweetData = {
      text: btweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, 'btweets'), BtweetData);
    setBtweet('');
    setAttachment('');
  };

  const onChange = (e) => {
    setBtweet(e.target.value);
  };

  const onfileChange = (e) => {
    const theFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment('');
  };

  return (
    <form onSubmit={onSubmit} className='factoryForm'>
      <div className='factoryInput__container'>
        <input
          className='factoryInput__input'
          type='text'
          value={btweet}
          onChange={onChange}
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type='submit' value='&rarr;' className='factoryInput__arrow' />
      </div>
      <label htmlFor='attach-file' className='factoryInput__label'>
        <span>Add Photo</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id='attach-file'
        type='file'
        accept='image/*'
        onChange={onfileChange}
        style={{ opacity: 0 }}
      />

      {attachment && (
        <div className='factoryForm__attachment'>
          <img
            src={attachment}
            width='50px'
            height='50px'
            alt='your file img'
          />
          <div className='factoryForm__clear' onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default BtweetFactory;
