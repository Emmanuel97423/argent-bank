import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useFetchUserMutation,
  useUpdateUserNamesMutation
} from '../../features/api/apiSlice';
import { setUser, updateUser } from '../../features/auth/authSlice';

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [editProfileNames, setEditProfileNames] = useState({
    firstName: '',
    lastName: ''
  });
  const [activeForm, setActiveForm] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const [updateUserNames] = useUpdateUserNamesMutation();

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

  const firstNameOnChange = (e) => {
    setEditProfileNames({ ...editProfileNames, firstName: e.target.value });
  };
  const lastNameOnChange = (e) => {
    setEditProfileNames({ ...editProfileNames, lastName: e.target.value });
  };

  const clearEditForm = () => {
    setEditProfileNames({ firstName: '', lastName: '' });
    setActiveForm(false);
  };
  const canSave = [editProfileNames.firstName, editProfileNames.lastName].every(
    Boolean
  );
  const handleEdit = () => {
    setActiveForm(true);
  };

  const handleSubmit = async () => {
    try {
      const userNames = async (userParam) => {
        const response = await updateUserNames(userParam).unwrap();
        if (response.status === 200) {
          const user = response.body;
          dispatch(updateUser(user));
          setFirstName(user.firstName);
          setLastName(user.lastName);
          clearEditForm();
        }
      };
      userNames(editProfileNames);
    } catch (error) {
      console.log('error:', error);
    }
  };
  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName} !
          </h1>
          {activeForm ? (
            <form>
              <div className="edit-wrapper">
                <div className="input-edit-wrapper">
                  <div>
                    <label htmlFor="firstName"></label>

                    <input
                      type="text"
                      id="firstName"
                      placeholder={firstName}
                      onChange={firstNameOnChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName"></label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder={lastName}
                      onChange={lastNameOnChange}
                    />
                  </div>
                </div>
                <div className="button-wrapper">
                  <button
                    type="button"
                    className="edit-button"
                    disabled={!canSave}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={clearEditForm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          {!activeForm ? (
            <button className="edit-button" onClick={handleEdit}>
              Edit Name
            </button>
          ) : null}
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
