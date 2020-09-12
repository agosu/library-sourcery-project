import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './StarRating.css';

export default function StarRating({ rating }) {
	const stars = [];
	for (let i = rating; stars.length < 5; i--) {
		if (i < 1 && i >= 0.8) {
			stars.push(<StarIcon key={i} />);
			continue;
		} else if (i < 0.8 && i > 0.2) {
			stars.push(<StarHalfIcon key={i} />);
			continue;
		} else if (i <= 0.2) {
			stars.push(<StarBorderIcon key={i} />);
			continue;
		}
		stars.push(<StarIcon key={i} />);
	}
	stars.push(
		<p id="star-rating-total" key={'star-rating-total'}>
			{rating}
		</p>
	);
	return stars;
}

StarRating.propTypes = {
	rating: PropTypes.number.isRequired
};