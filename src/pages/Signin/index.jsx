import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchLoginMutation } from '../../features/api/apiSlice';
import { remenberMe, setToken } from '../../features/auth/authSlice';

export default function Signin() {
  const [fetchLogin, { data, status, isLoading, isError }] =
    useFetchLoginMutation();

  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remenberMe: ''
  });

  const isLogined = useSelector((state) => state.auth.isLogined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogined) {
      navigate('/profile');
    }
  }, []);

  const loginSubmitted = async () => {
    try {
      if (canSave) {
        const response = await fetchLogin(loginData).unwrap();
        if (response.status === 200) {
          const token = response.body.token;
          dispatch(setToken(token));
          navigate('/profile');
        }

        if (loginData.remenberMe) {
          dispatch(remenberMe(true));
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
    setLoginData({ ...loginData, email: e.target.value });
  };

  const passwordOnChange = (e) => {
    setLoginData({ ...loginData, password: e.target.value });
  };

  const remenberMeOnChange = (e) => {
    setLoginData({ ...loginData, remenberMe: e.target.checked });
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
            <input
              type="checkbox"
              id="remember-me"
              onChange={remenberMeOnChange}
            />
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
