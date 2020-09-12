import React from 'react';
import DevbridgeLogoSvg from './utils/DevbridgeLogoSvg';
import './LoginPage.css';

export default function SettingUpLoginPage() {
	return (
		<div id="login-wrapper">
			<div id="login-logo">
				<DevbridgeLogoSvg />
			</div>
			<div id="login-content">
				<p className="setting-up-paragraph">Setting up your account...</p>
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
