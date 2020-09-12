import React from 'react';
import UserReservationTable from '../../components/Reservation/UserReservationTable/UserReservationTable';
import './ReservationListContainer.css';

export default function ReservationListContainer({
	open,
	onModal,
	onClose,
	onConfirm,
	onReview,
	onRead,
	office,
	openReservation,
	onReservation
}) {
	return (
		<div id="user-reservation-container">
			<h2 id="user-reservation-title">My reservations</h2>
			<div id="filters-sorters" />
			<UserReservationTable
				open={open}
				onModal={onModal}
				onClose={onClose}
				onConfirm={onConfirm}
				onReview={onReview}
				onRead={onRead}
				office={office}
				openReservation={openReservation}
				onReservation={onReservation}
			/>
		</div>
	);
}
