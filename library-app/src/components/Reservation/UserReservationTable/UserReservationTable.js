import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import user from '../../../mock-data/user';
import BookDetailsTableContainer from './common/BookDetailsTableContainer';
import Button from '@material-ui/core/Button';
import CheckinModal from '../../modals/checkInModal';
import './UserReservationTable.css';
import EditReservation from '../../modals/EditReservation';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

const rows = [ ...user.borrowedBooks, ...user.requestedBooks ];
export default function SimpleTable({
	onModal,
	onClose,
	onConfirm,
	onReview,
	onRead,
	open,
	office,
	onReservation,
	openReservation
}) {
	const classes = useStyles();
	const [ selectedBook, setSelectedBook ] = useState(rows[0]);
	const handleBookSelect = (e, book) => {
		if (e.target.parentElement.classList.contains('modal-call-to-action-btn-primary-children')) {
			onModal();
		} else if (e.target.parentElement.classList.contains('modal-call-to-action-btn-secondary-children')) {
			onReservation();
		}
		setSelectedBook(book);
	};
	const buttonChecker = (book) => {
		const filterBorrowed = user.borrowedBooks.filter((b) => b.title === book.title);
		if (filterBorrowed.length > 0) {
			return (
				<TableCell align="right">
					<Button
						className="modal-call-to-action-btn-secondary-children"
						onClick={(e) => {
							handleBookSelect(e, book);
						}}
					>
						Edit
					</Button>
					<Button
						className="modal-call-to-action-btn-primary-children"
						onClick={(e) => {
							handleBookSelect(e, book);
						}}
					>
						Check in
					</Button>
				</TableCell>
			);
		}
		return (
			<TableCell align="right">
				<Button className="modal-call-to-action-btn-secondary-children">Leave waitlist</Button>
			</TableCell>
		);
	};
	const statusChecker = (book) => {
		const filterBorrowed = user.borrowedBooks.filter((b) => b.title === book.title);
		if (filterBorrowed.length > 0) {
			return (
				<div className="user-reservation-status-wrapper">
					<p className="user-reservation-status-borrowed">Borrowed</p>
				</div>
			);
		}
		return (
			<div className="user-reservation-status-wrapper">
				<p className="user-reservation-status-requested">Requested</p>
			</div>
		);
	};
	const returnChecker = (book) => {
		if (!book.returnDate) {
			return null;
		}
		return book.returnDate;
	};
	return (
		<div id="user-reservation-table">
			<CheckinModal
				book={selectedBook}
				open={open}
				onClose={onClose}
				onConfirm={onConfirm}
				onReview={onReview}
				onRead={onRead}
			/>
			<EditReservation office={office} openReservation={openReservation} book={selectedBook} onClose={onClose} />
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>
								<span className="user-reservations-table-heading">BOOK</span>
							</TableCell>
							<TableCell align="right" size="small">
								<span className="user-reservations-table-heading">OFFICE</span>
							</TableCell>
							<TableCell align="right" size="small">
								<span id="user-reservation-status" className="user-reservations-table-heading">
									STATUS
								</span>
							</TableCell>
							<TableCell align="right" size="small">
								<span className="user-reservations-table-heading">BOOKED FROM</span>
							</TableCell>
							<TableCell align="right" size="small">
								<span className="user-reservations-table-heading">RETURN DATE</span>
							</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.title}>
								<TableCell component="th" scope="row">
									<BookDetailsTableContainer data={row} />
								</TableCell>
								<TableCell align="right" size="small">
									<span className="user-reservations-table-data-spans">{row.office}</span>
								</TableCell>
								<TableCell align="right" size="small">
									{statusChecker(row)}
								</TableCell>
								<TableCell align="right" size="small">
									<span className="user-reservations-table-data-spans">{row.bookedFrom}</span>
								</TableCell>
								<TableCell align="right" size="small">
									<span className="user-reservations-table-data-spans">{returnChecker(row)}</span>
								</TableCell>
								{buttonChecker(row)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
