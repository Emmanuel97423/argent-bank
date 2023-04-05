import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadState, deleteState } from '../../utils/localStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

export default function Header() {
  const profile = useSelector((state) => state.profile);
  // const isLoggedIn = profile.isLoggedIn;
  // const [isLogged, setIsLogged] = useState(isLoggedIn);
  useEffect(() => {
    // const isLoggedLocalStorage = loadState('isLogged');
    // if (isLoggedLocalStorage) {
    //   setIsLogged(loadState('isLogged'));
    // }
  }, []);

  const handleLogout = () => {
    deleteState('isLogged');
    deleteState('token');
    deleteState('user');
    setIsLogged(false);
  };

  const isLogged = true;
  const SignButton = () => {
    return !isLogged ? (
      <Link to="/sign-in" className="main-nav-item">
        <FontAwesomeIcon icon={['fa', 'coffee']} />
        <i className="fa fa-user-circle"></i>
        Sign In
      </Link>
    ) : (
      <Link to="/" className="main-nav-item" onClick={handleLogout}>
        <i className="fa fa-user-circle"></i>
        Sign out
      </Link>
    );
  };
  return (
    <>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>

        <div>
          <SignButton />
        </div>
      </nav>
    </>
  );
}
