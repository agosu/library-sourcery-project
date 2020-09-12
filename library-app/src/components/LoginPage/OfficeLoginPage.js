import React from 'react';
import DevbridgeLogoSvg from './utils/DevbridgeLogoSvg';
import './LoginPage.css';

export default function OfficeLoginPage({ office, handleStateChange, onClickFinal }) {
	return (
		<div id="login-wrapper">
			<div id="login-logo">
				<DevbridgeLogoSvg />
			</div>
			<div id="login-content">
				<h1 className="login-header">Where are you located?</h1>
				<p className="login-paragraph">Select your primary work location</p>
				<select className="login-input" defaultValue={office} onChange={(e) => handleStateChange(e)}>
					<option value="1">Vilnius Office</option>
					<option value="2">Kaunas Office</option>
				</select>
				<button className="login-btn" onClick={onClickFinal}>
					Save selection
				</button>
			</div>
		</div>
	);
}
