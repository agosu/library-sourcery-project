import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfileMenuList from '../../components/MenuList/ProfileMenuList';
import './UserProfileContainer.css';
import EditUserProfile from '../../components/userProfile/EditUserProfile';
import EditUserNotifications from '../../components/userProfile/EditUserNotifications';

export default function UserProfileContainer({ user, onUserProfileUpdate }) {
	let match = useRouteMatch();
	return (
		<div id="user-profile-container">
			<ProfileMenuList />
			<Switch>
				<Route path={match.path} exact>
					<EditUserProfile user={user} onUserProfileUpdate={onUserProfileUpdate} />
				</Route>
				<Route path={`${match.path}/security`}>
					<h1>security</h1>
				</Route>
				<Route path={`${match.path}/notifications`}>
					<EditUserNotifications user={user} onUserProfileUpdate={onUserProfileUpdate} />
				</Route>
			</Switch>
		</div>
	);
}
