import React from 'react';
import './UserProfile.css';

export default function UserProfile({ user }) {
	return (
		<div id="user-profile">
			<img id="user-profile-picture" src={user.photoUrl} alt="User profile" />
			<h3 id="user-profile-greeting">Hello, {user.firstName}!</h3>
			<p id="user-profile-email">{user.email}</p>
			<p id="user-profile-office">{user.office}</p>
		</div>
	);
}
