import React, { useEffect } from 'react';
import DevbridgeLogoSvg from './utils/DevbridgeLogoSvg';
import './LoginPage.css';
import axios from 'axios';
import { getToken } from '../../adalConfig';

export default function CheckingAccountLoginPage({ onUserCheck }) {
	useEffect(() => {
		handleUserCheck();
	}, []);
	async function handleUserCheck() {
		try {
			const response = await axios.get(process.env.REACT_APP_API_URL + '/users/token', {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			onUserCheck(response);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div id="login-wrapper">
			<div id="login-logo">
				<DevbridgeLogoSvg />
			</div>
			<div id="login-content">
				<p className="setting-up-paragraph">Checking your account...</p>
				<div className="ispinner ispinner-large">
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
					<div className="ispinner-blade" />
				</div>
			</div>
		</div>
	);
}
