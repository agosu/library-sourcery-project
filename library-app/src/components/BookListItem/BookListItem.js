import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../StarRating/StarRating';
import { Link } from 'react-router-dom';
import './BookListItem.css';

function BookListItem(props) {
	const { book } = props;

	return (
		<React.Fragment>
			<div className="book">
				<Link to={`/library/all/${book.id}`}>
					<img className="book-img" src={book.bookCover} />
				</Link>
				<div className="book-title_author">
					<div className="book-title">
						<Link className="book-title-anthor" to={`/library/all/${book.id}`}>
							{book.title}
						</Link>
					</div>
					<div className="book-author">{book.author.join(',')}</div>
				</div>
				<div className="book-rating_availability">
					<div className="book-rating">
						<StarRating rating={book.rating} />
					</div>
					<div className="book-availability">
						{book.isAvailable ? (
							<div className="text-available">Available</div>
						) : (
							<div className="text-unavailable">Currently unavailable</div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

BookListItem.propTypes = {
	book: PropTypes.object.isRequired
};

export default BookListItem;
