import React, { useState } from 'react';
import CheckingAccountLoginPage from '../../components/LoginPage/CheckingAccountLoginPage';
import './LoginPageContainer.css';
import OfficeLoginPage from '../../components/LoginPage/OfficeLoginPage';
import SettingUpLoginPage from '../../components/LoginPage/SettingUpLoginPage';
import axios from 'axios';
import { getToken } from './../../adalConfig';

export default function LoginPageContainer({ setAuth, setUser }) {
	let [ step, setStep ] = useState(1);
	const [ office, setOffice ] = useState(1);

	function handleStateChange(e) {
		setOffice(parseInt(e.target.value));
	}

	function handleUserCheck(response) {
		if (response.status === 200) {
			setUser(response.data);
			setAuth();
		} else if (response.status === 404) {
			setStep(++step);
		}
	}
	function handleSteps(step) {
		switch (step) {
			case 1:
				return <CheckingAccountLoginPage onUserCheck={handleUserCheck} />;
			case 2:
				return (
					<OfficeLoginPage
						office={office}
						handleStateChange={handleStateChange}
						onClickFinal={handleClickFinal}
					/>
				);
			case 3:
				return <SettingUpLoginPage />;
		}
	}
	async function handleClickFinal() {
		setStep(++step);
		try {
			const { data } = await axios.post(process.env.REACT_APP_API_URL + '/users/token', office, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			setUser(data);
			setAuth();
		} catch (error) {
			console.log(error);
		}
	}
	return <div id="login-page-container">{handleSteps(step)}</div>;
}
