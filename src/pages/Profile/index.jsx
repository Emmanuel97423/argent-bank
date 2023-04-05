import React, { useEffect, useState } from 'react';
import { saveUserState } from '../../utils/localStorage';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../../features/profile/profileSlice';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // const profile = useSelector(selectedProfile);
  // const token = useSelector((state) => state.auth.body.token);

  // const profileStatus = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.profile);

  // loadState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const authStatus = useSelector((state) => state.auth.status);
  // console.log('authStatus:', authStatus);

  // const profileState = useSelector((state) => state.profile.body);
  // const profileStatus = useSelector((state) => state.profile.status);
  // const profileMessage = useSelector((state) => state.profile.message);

  useEffect(() => {
    // const localStorageStateToken = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      navigate('/sign-in');
    } else if (token) {
      dispatch(fetchProfile(token))
        .then((response) => {
          console.log('response:', response);
        })
        .catch((error) => {
          console.log('error:', error);
        });
      const isLoggedIn = profile.isLoggedIn;
      if (isLoggedIn) {
        setFirstName(profile.profile.firstName);
        setLastName(profile.profile.lastName);
      }
      // const profile = useSelector((state) => state.profile);
      // console.log('profile:', profile);
      // .then((response) => {
      //   console.log('response:', response);
      //   const profileResponse = response.payload.body;
      //   // const user = JSON.parse(localStorage.getItem('user'));
      //   // saveUserState('isLogged', true);
      //   setFirstName(profileResponse.firstName);
      //   setLastName(profileResponse.lastName);
      // });
    }
  }, []);

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
