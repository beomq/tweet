import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Btweet = ({ btweetObj, isOwner }) => {
  const { text, id } = btweetObj;
  const [editing, setEditing] = useState(false);
  const [newBtweet, setNewBtweet] = useState(text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this btweet?');
    if (ok) {
      await deleteDoc(doc(dbService, 'btweets', `${btweetObj.id}`));
      if (btweetObj.attachmentUrl !== '') {
        await deleteObject(ref(storageService, btweetObj.attachmentUrl));
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, 'btweets', `${id}`), {
      text: newBtweet,
    });
    setEditing(false);
  };
  const onChange = (e) => setNewBtweet(e.target.value);

  return (
    <div className='nweet'>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className='container nweetEdit'>
                <input
                  type='text'
                  placeholder='Edit your Btweet'
                  value={newBtweet}
                  onChange={onChange}
                  required
                  autoFocus
                  className='formInput'
                />
                <input
                  type='submit'
                  value='Update Btweet'
                  className='formBtn'
                />
              </form>
              <button onClick={toggleEditing} className='formBtn cancleBtn'>
                Cancle
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{text}</h4>
          {btweetObj.attachmentUrl && (
            <img src={btweetObj.attachmentUrl} alt='tweet img' />
          )}
          {isOwner && (
            <div className='nweet__actions'>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Btweet;
