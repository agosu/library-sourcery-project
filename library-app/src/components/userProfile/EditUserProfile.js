import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { getToken } from './../../adalConfig';
import './EditUserProfile.css';

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

export default function EditUserProfile({ user, onUserProfileUpdate }) {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ role, setRole ] = useState('');
	const [ defaultOffice, setDefaultOffice ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ photoUrl, setPhotoUrl ] = useState('');
	const [ image, setImage ] = useState(new FormData());
	
	useEffect(
		() => {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setRole(user.role);
			setDefaultOffice(user.defaultOffice);
			setEmail(user.email);
			setPhone(user.phoneNumber);
			setPhotoUrl(user.photoUrl);
		},
		[ user ]
	);
	const handleNameChange = (e) => {
		const input = e.target.value;
		const [ firstName, lastName ] = input.split(' ');
		setFirstName(firstName);
		setLastName(lastName);
	};
	const handleOffice = (e) => {
		return defaultOffice === 'Vilnius office' ? 1 : 2;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const updatedUser = { ...user };
		updatedUser.fullName = `${firstName} ${lastName}`;
		updatedUser.role = role;
		if (defaultOffice === undefined) {
			updatedUser.officeId = handleOffice();
		} else if (defaultOffice !== undefined) {
			updatedUser.officeId = handleOffice();
		}
		updatedUser.email = email;
		updatedUser.phoneNumber = phone;
		updatedUser.photoUrl = user.photoUrl;
		updatedUser.roleId = user.roleId;
		// updatedUser.goodreadsLink = goodreadsLink;
		// Add once we have goodreads compatability
		if (uploadBtn.files.length !== 0) {
			let response = await handlePostImage(image);
			updatedUser.photoUrl = response;
		}
		await onUserProfileUpdate(updatedUser);
	};
	const uploadBtn = document.getElementById('user-profile-image-uploader');
	const handlePostImage = async (image) => {
		try {
			const { data } = await axios.post(process.env.REACT_APP_API_URL + '/images', image, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	//user.photoUrl
	const handleImageUpload = async (event) => {
		if (event.target.files[0]) {
			let image = new FormData();
			const input = event.target;
			const file = input.files[0];
			image.append('file', file);
			setPhotoUrl(URL.createObjectURL(event.target.files[0]));
			setImage(image);
		}
	};

	return (
		<div id="edit-user-profile-container">
			<div id="edit-user-profile-left">
				<p id="edit-user-profile-picture-title">YOUR PHOTO</p>
				<img src={photoUrl} alt="profile photo" id="edit-profile-picture" />
				<form id="user-profile-form" encType="multipart/form-data">
					<input
						id="user-profile-image-uploader"
						name="file"
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
					/>
					<span id="user-profile-image-uploader-span">Edit</span>
				</form>
			</div>
			<div id="edit-user-profile-right">
				<form id="edit-user-profile-form" onSubmit={handleSubmit}>
					<div id="full-name-wrapper">
						<label htmlFor="full-name">FULL NAME</label>
						<input id="full-name" type="text" defaultValue={user.fullName} onChange={handleNameChange} />
					</div>
					<div id="role-wrapper">
						<label htmlFor="role">ROLE</label>
						<input
							id="role"
							type="text"
							defaultValue={user.role}
							onChange={(e) => setRole(e.target.value)}
						/>
					</div>
					<div id="default-office-wrapper">
						<label htmlFor="default-office">DEFAULT OFFICE</label>
						<select
							id="default-office"
							defaultValue={user.defaultOffice}
							onChange={(e) => setDefaultOffice(e.target.value)}
						>
							<option value="Vilnius Office">Vilnius</option>
							<option value="Kaunas Office">Kaunas</option>
						</select>
					</div>
					<div id="email-address-wrapper">
						<label htmlFor="email-address">EMAIL ADDRESS</label>
						<input
							id="email-address"
							type="email"
							defaultValue={user.email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div id="user-phone-number-wrapper">
						<label htmlFor="user-phone-number">PHONE</label>
						<input
							id="user-phone-number"
							type="tel"
							pattern="^\+[0-9]{11}"
							placeholder=" +370 XXX XXXXX"
							defaultValue={user.phoneNumber}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div id="edit-user-submit-wrapper">
						<input id="edit-user-submit" type="submit" defaultValue="Save changes" />
					</div>
				</form>
			</div>
		</div>
	);
}
