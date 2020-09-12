import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../../../StarRating/StarRating.jsx';

export default function BookDetailsTableContainer({ data }) {
	const shortTitle = (title) => {
		let shortened = title.slice(0, 30) + '...';
		return shortened;
	};
	return (
		<div className="table-formatter-wrapper">
			<div className="book-details-table-format">
				<Link to={`/library/all/${data.isbn}`}>
					<img
						className="user-reservation-book-cover"
						src={data.bookCover}
						alt={`book cover of ${data.title}`}
					/>
				</Link>
			</div>
			<div className="book-details-table-right-side">
				<Link className="book-title-author-reservations" to={`/library/all/${data.isbn}`}>
					<p className="user-reservations-book-title">{shortTitle(data.title)}</p>
				</Link>
				{data.author.map((a) => (
					<p key={a} className="modal-checkin-book-author">
						{a}
					</p>
				))}
				<div id="modal-checkin-rating-wrapper">{<StarRating rating={data.rating} />}</div>
			</div>
		</div>
	);
}
