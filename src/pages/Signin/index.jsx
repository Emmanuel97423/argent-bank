import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../features/auth/authSlice';

// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { useFetchAuthMutation } from '../../features/auth/auth-api-slice';

export default function Signin() {
  // const dispatch = useAppDispatch();
  // const { data = [], isFetching } = useFetchAuthMutation('hello');
  // console.log('isFetching:', isFetching);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const userNameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const canSave = [username, password].every(Boolean);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmitted = () => {
    if (canSave) {
      const loginData = {
        email: username,
        password: password
      };
      dispatch(fetchLogin(loginData)).then((response) => {
        const payload = response.payload;
        if (payload.status !== 200) {
          setErrorMessage(payload.message);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
          return;
        }
        navigate('/profile');
      });
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={userNameOnChange} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={passwordOnChange} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {errorMessage ? <p>{errorMessage}</p> : null}
          {/* PLACEHOLDER DUE TO STATIC SITE  */}
          {/* <a href="./user.html" className="sign-in-button">
            Sign In
          </a> */}
          {/* SHOULD BE THE BUTTON BELOW */}
          <button
            type="button"
            className="sign-in-button"
            onClick={loginSubmitted}
            disabled={!canSave}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
