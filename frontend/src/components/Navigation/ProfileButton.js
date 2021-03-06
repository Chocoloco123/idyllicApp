
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <div className='userButton-Icon-Div'>
      <div className='userIconDiv'>
        <button className="profileUserBtn" onClick={openMenu}>
          {/* <i className="fas fa-user"></i> */}
          {/* <i className="fas fa-user-circle" /> */}
          <i class="fas fa-camera-retro userCamera"></i>
        </button>
      </div>
      {showMenu && (
        <div className='profileDropdownBox'>
          <ul className="profile-dropdown">
            <li className="logout-Li">Hello, {user.username}!</li>
            {/* <li>{user.email}</li> */}
            <li className='logout-Btn-Li'>
              {/* <button onClick={logout} className='image-btn logoutBtn'>Log Out</button> */}
              <button onClick={logout} className='logout-Button'>Log out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;