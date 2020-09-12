import 'date-fns';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import StarRating from '../StarRating/StarRating.jsx';
import ModalTitle from './common/ModalTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import '../CheckOut/checkOut.css';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
	SvgIcon: {
		width: 24,
		height: 24,
		marginRight: 5,
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg'
	}
};

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

export default function EditReservation({ office, book, onClose, openReservation }) {
	const [ selectedDate, setSelectedDate ] = useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const handleCheck = (book) => {
		if (book) {
			return true;
		}
		return '';
	};
	return (
		handleCheck(book) && (
			<Dialog aria-labelledby="customized-dialog-title " class="wrapper" open={openReservation}>
				<ModalTitle title="Edit reservation" onClose={onClose} />

				<DialogContent id="modal-dialog-content" dividers>
					<Grid container spacing={0}>
						{/* ************************Book cover************************ */}
						<Grid item xs={5} sm={4}>
							<img id="modal-checkOut-book-cover" src={book.BookCover} alt="Book Cover" />
						</Grid>
						{/* ************************Book details************************ */}
						<Grid item xs={7} sm={8}>
							<div className="modal-checkOut-right-side">
								<h4 id="modal-checkOut-book-title">{book.title}</h4>
								{book.author &&
									book.author.map((a) => (
										<p key={a} className="modal-checkOut-book-author">
											{a}
										</p>
									))}
							</div>
							<div id="modal-checkOut-rating-wrapper">
								{<StarRating rating={book.rating} class="svg" />}
							</div>
						</Grid>
						{/* ************************RESERVE AT************************ */}
						<Grid item sm={4} />
						<Grid item xs={12} sm={8} className="modal-checkOut-right-side">
							<span class="paddinger1">
								<div className="modal-checkOut-seperator" />
							</span>
							<p className="modal-checkOut-secondary-text">RESERVE AT</p>
							<Grid container spacing={4}>
								<Grid item xs={3} sm={1}>
									<svg style={styles.SvgIcon}>
										<path
											d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
											fill="black"
										/>
									</svg>
								</Grid>
								<Grid item xs={9} sm={9}>
									<div>
										<span class="officeName">{office.officeName}, </span>
										<span class="availableBooks"> {office.bookQuantity} available </span>
									</div>
									<div>
										<span class="officeAddress"> {office.address} </span>
									</div>
								</Grid>
							</Grid>
							<span class="paddinger">
								<div className="modal-checkOut-seperator" />
							</span>
							<p className="modal-checkOut-secondary-text">PLANNED RETURN DATE </p>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container justify="space-around">
									<KeyboardDatePicker
										inputVariant="outlined"
										disablePast={true}
										format="MMM dd, yyyy"
										minDate={new Date()}
										value={selectedDate}
										onChange={handleDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
							<br />
							<div className="modal-checkOut-seperator" />
							<p className="modal-checkOut-secondary-text">GOODREADS</p>
							<FormControlLabel
								id="modal-checkOut-switch-label"
								control={<GreenSwitch id="modal-checkOut-switch" />}
								label="Add to my reading list on Goodreads"
							/>
						</Grid>
					</Grid>
				</DialogContent>

				<DialogActions id="modal-checkOut-btn-wrapper">
					<Button
						id="modal-checkOut-secondary-btn"
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
						}}
						variant="contained"
						id="modal-checkOut-primary-btn"
					>
						Edit reservation
					</Button>
				</DialogActions>
			</Dialog>
		)
	);
}
