import React, { useEffect, useState } from 'react';
import { saveUserState } from '../../utils/localStorage';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../../features/profile/profileSlice';
import { useFetchUserMutation } from '../../features/api/apiSlice';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const token = useSelector((state) => state.auth.token);
  console.log('token:', token);
  const profile = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchUser, { data, status, isLoading, isError }] =
    useFetchUserMutation();
  useEffect(() => {
    try {
      if (token) {
        const user = async () => {
          const user = await fetchUser().unwrap();
          console.log('user:', user);
        };
        user();
      } else {
        navigate('/sign-in');
      }
    } catch (error) {
      console.log('error:', error);
    }
  }, []);
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/sign-in');
  //   } else if (token) {
  //     dispatch(fetchProfile(token))
  //       .then((response) => {
  //         console.log('response:', response);
  //       })
  //       .catch((error) => {
  //         console.log('error:', error);
  //       });
  //     const isLoggedIn = profile.isLoggedIn;
  //     if (isLoggedIn) {
  //       setFirstName(profile.profile.firstName);
  //       setLastName(profile.profile.lastName);
  //     }
  //   }
  // }, []);

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName} !
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
}
