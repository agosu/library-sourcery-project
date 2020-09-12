import React from 'react';
import ModalTitle from './common/ModalTitle';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, Switch, FormControlLabel, Grid } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import StarRating from '../StarRating/StarRating';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: '#050237'
		}
	}
});

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

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

const styles = {
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
	}
};

function ActualDialog(props) {
	const { onClose, open, onSwitch, onConfirm } = props;

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="who reads this is the best"
			open={open}
			style={{
				height: '527px'
			}}
		>
			<ModalTitle title="Enter waitlist" onClose={onClose} />
			<DialogContent id="modal-dialog-content" dividers>
				<Grid container spacing={0}>
					{/* ************************Book cover************************ */}
					<Grid item xs={5} sm={4}>
						<img id="modal-checkin-book-cover" src={props.book.bookCover} alt="Book Cover" />
					</Grid>
					{/* ************************Book details************************ */}
					<Grid item xs={7} sm={8}>
						<div className="modal-checkin-right-side">
							<h4 id="modal-checkin-book-title">{props.book.title}</h4>
							{props.book.author.map((a) => (
								<p key={a} className="modal-checkin-book-author">
									{a}
								</p>
							))}
						</div>
						<div id="modal-checkin-rating-wrapper">{<StarRating rating={props.book.rating} />}</div>
					</Grid>
					<Grid item sm={4} />
					<Grid item xs={12} sm={8} className="modal-checkin-right-side">
						<div className="modal-checkin-seperator" />
						<p className="modal-enterwaitlist-text">
							There are no available copies at your office. Join a waiting list and get notifed once book
							becomes available.
						</p>
						<div className="modal-checkin-seperator" />
						<br />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions id="modal-checkin-btn-wrapper">
				<Button
					id="modal-checkin-secondary-btn"
					onClick={() => {
						onClose();
					}}
					variant="contained"
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						onClose();
						onConfirm();
					}}
					variant="contained"
					id="modal-enterwaitlist-btn"
				>
					Join waitlist
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default function EnterWaitlist(props) {
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSwitch = () => {
		//addToUsersWantToReadListOnGoodReads = (!addToUsersWantToReadListOnGoodReads); or something like that
	};

	const handleConfirm = () => {
		// if(addToUsersWantToReadListOnGoodReads === true) {
		//     //method to add this book to want to read list on good reads
		// }
		console.log('You have joined the waitlist!');
	};

	return (
		<div>
			<ThemeProvider theme={theme}>
				<Button style={styles.Button} variant="contained" color="secondary" onClick={handleClickOpen}>
					Enter waitlist
				</Button>
				<ActualDialog
					open={open}
					onClose={handleClose}
					book={props.book}
					onSwitch={onSwitch}
					onConfirm={handleConfirm}
				/>
			</ThemeProvider>
		</div>
	);
}
