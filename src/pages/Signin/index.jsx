import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchLoginMutation } from '../../features/api/apiSlice';
import { remenberMe, setToken } from '../../features/auth/authSlice';

/**
 * A React component for handling user sign in.
 * @returns {JSX.Element} A JSX element that represents the sign-in form.
 */
export default function Signin() {
  const [fetchLogin] = useFetchLoginMutation();

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
  }, [isLogined, navigate]);

  /**
   * Handles the submission of the sign-in form.
   * If successful, sets the authentication token and navigates to the user's profile page.
   * If the "remember me" checkbox is checked, sets a flag in the Redux store to remember the user.
   * If unsuccessful, displays an error message for 3 seconds.
   */
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

  /**
   * Updates the email field in the sign-in form when the user types in it.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const userNameOnChange = (e) => {
    setLoginData({ ...loginData, email: e.target.value });
  };

  /**
   * Updates the password field in the sign-in form when the user types in it.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const passwordOnChange = (e) => {
    setLoginData({ ...loginData, password: e.target.value });
  };

  /**
   * Updates the "remember me" checkbox in the sign-in form when the user clicks on it.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
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
