import React from 'react';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';

const styles = {
	Main: {
		minWidth: 150
	},
	Header: {
		color: '#050237',
		marginTop: '0.5rem',
		marginBottom: '0.5rem',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '1rem'
	},
	Box: {
		marginTop: '0.5rem',
		marginBottom: '0.5rem',
		borderRadius: '0.375rem',
		border: '1px solid #F4F5F7',
		boxSizing: 'border-box',
		maxWidth: '14.0625rem'
	},
	Button: {
		marginTop: '0.25rem',
		marginBottom: '0.25rem',
		maxWidth: '14.0625rem',
		minWidth: '10rem',
		maxHeight: '2.5rem',
		width: '100%',
		minHeight: '2rem',
		borderRradius: 3,
		textTransform: 'none',
		fontWeight: 600
	},
	Text: {
		color: '#050237',
		fontSize: '0.875rem',
		fontWeight: 600,
		marginLeft: '1rem',
		marginRight: '1rem',
		marginBottom: '1rem'
	},
	ReturnDate: {
		color: '#3BA77A',
		fontSize: '0.75rem',
		fontWeight: 600,
		marginLeft: '1rem',
		marginRight: '1rem',
		marginBottom: '1rem'
	},
	SvgIcon: {
		width: '1.5rem',
		height: '1.5rem',
		viewBox: '0 0 1.5rem 1.5rem',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
		marginTop: '1.125rem',
		marginLeft: '1.1875rem'
	}
};

export default function ShowReservationDetailsWhileBeingRead(props) {
	//if true

	return (
		<div style={styles.Main}>
			<span style={styles.Header}>Reservation details</span>
			<Box style={styles.Box}>
				<svg style={styles.SvgIcon}>
					<path
						d="M12 11.55C9.64 9.35 6.48 8 3 8V19C6.48 19 9.64 20.35 12 22.55C14.36 20.36 17.52 19 21 19V8C17.52 8 14.36 9.35 12 11.55ZM12 8C13.66 8 15 6.66 15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5C9 6.66 10.34 8 12 8Z"
						fill="black"
					/>
				</svg>
				<div style={styles.Text}>You're currently reading this book</div>
				<div style={styles.ReturnDate}>
					Return date: {props.returnDateDay} {props.returnDateMonth}
				</div>
			</Box>
			<div>
				<Button style={styles.Button} onClick={props.onModal} variant="contained" color="primary">
					Check in
				</Button>
			</div>
			<div>
				<Button style={styles.Button} variant="contained" color="inherit" onClick={props.onReservation}>
					Edit reservation
				</Button>
			</div>
		</div>
	);
}
