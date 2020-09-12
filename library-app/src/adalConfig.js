/** @format */

import { AuthenticationContext, AdalConfig } from 'react-adal';

const adalConfig = {
	tenant: 'imunitas.onmicrosoft.com',
	clientId: '2a0d6960-879b-4697-89ba-4ddfba5631ef',
	redirectUri: 'http://localhost:3000',
	postLogoutRedirectUri: 'http://localhost:3000',
	endpoints: {
		api: 'https://imunitas.onmicrosoft.com/2a0d6960-879b-4697-89ba-4ddfba5631ef'
	},
	cacheLocation: 'sessionStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const getToken = () => authContext.getCachedToken(adalConfig.clientId);
