/**
 * Represents the Header component for the Argent Bank website.
 * @function
 * @returns {JSX.Element} - Rendered Header component.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function Header() {
  const isLogined = useSelector((state) => state.auth.isLogined);
  const dispatch = useDispatch();

  /**
   * Calls the logout action creator from authSlice and dispatches it to the Redux store.
   * @function
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  /**
   * Returns a Sign In or Sign Out button depending on whether the user is logged in.
   * @function
   * @returns {JSX.Element} - Rendered Sign In or Sign Out button.
   */
  const SignButton = () => {
    return !isLogined ? (
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
