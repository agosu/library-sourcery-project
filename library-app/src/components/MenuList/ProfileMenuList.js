import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProfileMenuList.css';

export default function ProfileMenuList() {
  return (
    <React.Fragment>
      <h1 id="user-profile-title">My account</h1>
      <ul id="profile-menu-list">
        <NavLink className="profile-menu-item" to="/profile" exact>
          <li>Profile</li>
        </NavLink>
        <NavLink className="profile-menu-item" to="/profile/security">
          <li>Security</li>
        </NavLink>
        <NavLink className="profile-menu-item" to="/profile/notifications">
          <li>Notification settings</li>
        </NavLink>
      </ul>
    </React.Fragment>
  );
}
