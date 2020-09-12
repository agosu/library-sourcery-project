import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import StarRating from '../StarRating/StarRating.jsx';
import '../../containers/Dashboard/Dashboard.css';
import EditReservation from '../modals/EditReservation';
import CheckinModal from '../modals/checkInModal';

export default function DashboardBookDetails({
	book,
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
	const shortTitle = (title) => {
		let shortened = title.slice(0, 30) + '...';
		return shortened;
	};

	const authors = (book) => {
		let full = '';
		let i = 0;
		book.author.map((a) => {
			i++;
			full += a;
			if (book.author.length > i) {
				full += ', ';
			}
			return full;
		});
		return full;
	};

	return (
		<React.Fragment>
			<CheckinModal
				book={book}
				open={open}
				onClose={onClose}
				onConfirm={onConfirm}
				onReview={onReview}
				onRead={onRead}
			/>
			<EditReservation office={office} openReservation={openReservation} book={book} onClose={onClose} />
			<div className="dashboard-table-formatter-wrapper">
				<div className="dashboard-book-details-table-format">
					<Link to={`/library/all/${book.id}`}>
						<img
							className="dashboard-user-reservation-book-cover"
							src={book.bookCover}
							alt={`book cover of ${book.title}`}
						/>
					</Link>
				</div>
				<div className="dashboard-book-details-table-right-side">
					<Link className="book-title-author-reservations" to={`/library/all/${book.id}`}>
						<p className="dashboard-user-reservations-book-title">{shortTitle(book.title)}</p>
					</Link>
					<p className="dashboard-currently-reading-author">{shortTitle(authors(book))}</p>
					<div id="dashboard-rating-wrapper">{<StarRating rating={book.rating} />}</div>
					<p className="dashboard-return-date"> Return date {book.returnDate} </p>
				</div>
			</div>
			<div id="dashboard-btn-wrapper">
				<Button
					id="dashboard-call-to-action-btn-secondary"
					onClick={onReservation} //attention
				>
					Edit
				</Button>
				<Button id="dashboard-call-to-action-btn-primary" onClick={onModal}>
					Check in
				</Button>
			</div>
		</React.Fragment>
	);
}
