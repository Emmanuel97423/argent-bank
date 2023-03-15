import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFetchAuthMutation } from '../../features/auth/auth-api-slice';

export default function Signin() {
  const dispatch = useAppDispatch();
  const { data = [], isFetching } = useFetchAuthMutation('hello');
  console.log('isFetching:', isFetching);
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* PLACEHOLDER DUE TO STATIC SITE  */}
          {/* <a href="./user.html" className="sign-in-button">
            Sign In
          </a> */}
          {/* SHOULD BE THE BUTTON BELOW */}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}