import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckinModal from '../../components/modals/checkInModal';
import EditReservation from '../../components/modals/EditReservation';
import BookDetails from '../../components/BookDetails/BookDetails';
import ShowReservationDetailsWhileBeingRead from '../../components/Reservation/UserIsReading/BeingRead';
import Details from '../../components/Reservation/UserIsNotReading/Details';
import Button from '@material-ui/core/Button';
import CantFindCopyModal from '../../components/modals/CantFindCopyModal.jsx';
import '../../components/modals/modals.css';
import './BookDetailsContainer.css';

export default function BookDetailsContainer({
	fetchBooks,
	books,
	user,
	open,
	openDelete,
	onDeleteModal,
	onModal,
	onClose,
	onConfirm,
	onReservation,
	onReview,
	onRead,
	data,
	commentsPerPage,
	paginate,
	office,
	openReservation,
	onSubmit,
	onTitle
}) {
	const { id } = useParams();
	const book = books.filter((book) => book.id === Number(id))[0];
	const [ openCantFind, setOpenCantFind ] = useState(false);
	const [ notifyAdminCantFind, setNotifyAdminCantFind ] = useState(false);
	const [ officeId, setOfficeId ] = useState();
	const [ plannedReturnDate, setPlannedReturnDate ] = useState();
	const handleNotifyAdmin = (book) => {
		//also get book info to admin
		setNotifyAdminCantFind(true);
	};

	return (
		<div id="book-details-content-wrapper">
			<EditReservation office={office} openReservation={openReservation} onClose={onClose} book={book} />
			<CheckinModal
				book={book}
				open={open}
				onClose={onClose}
				onConfirm={onConfirm}
				onReview={onReview}
				onRead={onRead}
			/>
			<CantFindCopyModal
				book={book}
				open={openCantFind}
				onClose={() => setOpenCantFind(false)}
				onNotify={() => handleNotifyAdmin(book)}
			/>
			<BookDetails
				fetchBooks={fetchBooks}
				id="book-details-container"
				reading={user.reading}
				book={book}
				user={user}
				data={data}
				onDeleteModal={onDeleteModal}
				commentsPerPage={commentsPerPage}
				id={id}
				isAdmin={user.isAdmin}
				openDelete={openDelete}
				onClose={onClose}
				onModal={onModal}
			>
				<Button id="modal-call-to-action-btn-primary-children" onClick={onModal}>
					Check in
				</Button>
				<Button id="modal-call-to-action-btn-secondary-children" onClick={onReservation}>
					Edit Reservation
				</Button>
			</BookDetails>
			<div id="reserve-at-placeholder">
				<div className="placeholder-container" />
				{user.reading && (
					<ShowReservationDetailsWhileBeingRead
						returnDateDay={`19th`}
						returnDateMonth={`April`}
						onModal={onModal}
						onReservation={onReservation}
					/>
				)}
				{!user.reading && (
					<Details
						book={book}
						kaunasBookQuantity={3}
						vilniusBookQuantity={0}
						onCantFindModal={() => setOpenCantFind(true)}
						office={office}
						id={id}
					/>
				)}
			</div>
		</div>
	);
}
