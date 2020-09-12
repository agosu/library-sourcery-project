import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import './EditUserNotifications.css';

const GreenSwitch = withStyles(() => ({
	root: {
		width: 28,
		height: 13,
		padding: 0,
		display: 'flex',
		overflow: 'visible'
	},
	switchBase: {
		padding: 2,
		color: '#d3d3d3',
		'&$checked': {
			transform: 'translateX(12px)',
			color: '#ffffff',
			'& + $track': {
				opacity: 1,
				backgroundColor: '#3BA77A',
				borderColor: '#3BA77A'
			}
		}
	},
	thumb: {
		width: 10,
		height: 10,
		boxShadow: 'none',
		paddingTop: '1px'
	},
	track: {
		border: `1px solid #d3d3d3`,
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: '#ffffff'
	},
	checked: {}
}))(Switch);

export default function EditUserNotifications({ user, onUserProfileUpdate }) {
	const [ newBookNotification, setNewBookNotification ] = useState(user.appNotiOnNewBook);
	const [ returnDateNotification, setReturnDateNotification ] = useState(user.appNotiOnReturnDate);
	const [ waitlistNotification, setWaitlistNotification ] = useState(user.appNotiOnBookAvailable);
	const [ returnDateNotificationEmail, setReturnDateNotificationEmail ] = useState(user.emailNotiOnReturnDate);
	const [ waitlistNotificationEmail, setWaitlistNotificationEmail ] = useState(user.emailNotiOnBookAvailable);
	useEffect(
		() => {
			handleNotificationUpdate();
		},
		[
			newBookNotification,
			returnDateNotification,
			waitlistNotification,
			returnDateNotificationEmail,
			waitlistNotificationEmail
		]
	);
	const handleSwitch = () => {
		setNewBookNotification(!newBookNotification);
	};
	const handleNotificationUpdate = async () => {
		let updatedUser = { ...user };
		updatedUser.appNotiOnNewBook = newBookNotification;
		updatedUser.appNotiOnReturnDate = returnDateNotification;
		updatedUser.appNotiOnBookAvailable = waitlistNotification;
		updatedUser.emailNotiOnReturnDate = returnDateNotificationEmail;
		updatedUser.emailNotiOnBookAvailable = waitlistNotificationEmail;
		await onUserProfileUpdate(updatedUser);
	};
	return (
		<div id="edit-notifications-wrapper">
			<div id="app-notifications-wrapper">
				<h5 className="notification-section-title">APP NOTIFICATIONS</h5>
				<div className="notification-section-wrapper">
					<p className="notification-setting-definition">Notify when a new book is purchased</p>
					<GreenSwitch
						checked={newBookNotification}
						onClick={() => {
							setNewBookNotification(!newBookNotification);
						}}
					/>
				</div>
				<div className="notification-section-wrapper">
					<p className="notification-setting-definition">Notify about return date</p>
					<GreenSwitch
						checked={returnDateNotification}
						onClick={() => {
							setReturnDateNotification(!returnDateNotification);
						}}
					/>
				</div>
				<div className="notification-section-wrapper">
					<p className="notification-setting-definition">
						Notify when book from a waitlist becomes available
					</p>
					<GreenSwitch
						checked={waitlistNotification}
						onClick={() => {
							setWaitlistNotification(!waitlistNotification);
						}}
					/>
				</div>
			</div>
			<div id="email-notifications-wrapper">
				<h5 className="notification-section-title">EMAIL NOTIFICATIONS</h5>
				<div className="notification-section-wrapper">
					<p className="notification-setting-definition">Notify about return date</p>
					<GreenSwitch
						checked={returnDateNotificationEmail}
						onClick={() => {
							setReturnDateNotificationEmail(!returnDateNotificationEmail);
						}}
					/>
				</div>
				<div className="notification-section-wrapper">
					<p className="notification-setting-definition">
						Notify when book from a waitlist becomes available
					</p>
					<GreenSwitch
						checked={waitlistNotificationEmail}
						onClick={() => {
							setWaitlistNotificationEmail(!waitlistNotificationEmail);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
