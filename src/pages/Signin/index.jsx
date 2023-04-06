import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setCredentials, fetchLogin } from '../../features/auth/authSlice';
import { useFetchLoginMutation } from '../../features/api/apiSlice';
import { setToken } from '../../features/auth/authSlice';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { useFetchAuthMutation } from '../../features/auth/auth-api-slice';

export default function Signin() {
  const [fetchLogin, { data, status, isLoading, isError }] =
    useFetchLoginMutation();

  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [tokenComponentState, setTokenComponentState] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokenAuthState = useSelector((state) => state.auth.token);

  const loginSubmitted = async () => {
    try {
      if (canSave) {
        const response = await fetchLogin(loginData).unwrap();
        if (response.status === 200) {
          const token = response.body.token;
          console.log('token:', token);
          dispatch(setToken(token));
          setTokenComponentState(token);
          if (tokenAuthState) {
            console.log('tokenAuthState:', tokenAuthState);
            navigate('/profile');
          }
          // navigate('/profile');
        }
      }
    } catch (error) {
      console.log('error:', error);
      const errorMessage = error.data.message;
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const userNameOnChange = (e) => {
    // setUsername(e.target.value);
    setLoginData({ ...loginData, email: e.target.value });
  };

  const passwordOnChange = (e) => {
    // setPassword(e.target.value);
    setLoginData({ ...loginData, password: e.target.value });
  };

  const canSave = [loginData.email, loginData.password].every(Boolean);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="email" id="username" onChange={userNameOnChange} />
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
