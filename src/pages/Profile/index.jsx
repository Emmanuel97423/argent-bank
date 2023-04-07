import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchUserMutation } from '../../features/api/apiSlice';
import { setUser } from '../../features/auth/authSlice';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchUser, { data, status, isLoading, isError }] =
    useFetchUserMutation();
  useEffect(() => {
    try {
      if (token) {
        const user = async (tokenParam) => {
          const response = await fetchUser(tokenParam).unwrap();
          if (response.status === 200) {
            const user = response.body;
            dispatch(setUser(user));
            setFirstName(user.firstName);
            setLastName(user.lastName);
          }
          return fetchUser;
        };
        user(token);
      } else {
        navigate('/sign-in');
      }
    } catch (error) {
      console.log('error:', error);
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
          <div className="edit-wrapper">
            <div className="input-edit-wrapper">
              <input type="text" id="firstName" placeholder={firstName} />
              <input type="text" id="lastname" placeholder={lastName} />
            </div>
            <div className="button-wrapper">
              <button className="edit-button">Save</button>
              <button className="edit-button">Cancel</button>
            </div>
          </div>
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
