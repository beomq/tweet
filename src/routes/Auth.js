import React from 'react';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { authService } from 'fbase';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div className='authContainer'>
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size='3x'
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className='authBtns'>
        <button name='google' onClick={onSocialClick} className='authBtn'>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name='github' onClick={onSocialClick} className='authBtn'>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
