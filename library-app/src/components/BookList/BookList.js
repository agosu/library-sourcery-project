import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import BookListItem from '../BookListItem/BookListItem';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme) => ({
	book: {
		marginBottom: theme.spacing(6)
	}
});

function BookList(props) {
	const { books, classes } = props;

	return (
		<React.Fragment>
			<Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
				<div>
					<Link to="/library/addnewbook">
						<IconButton>
							<div className={'add-book'}>
								<AddIcon style={{ color: '#fff', height: '40px', width: '40px' }} />
								<p style={{ color: '#fff' }}>Add new book</p>
							</div>
						</IconButton>
					</Link>
				</div>
			</Grid>
			{books.map((book) => {
				return (
					<Grid
						item
						xs={6}
						sm={4}
						md={3}
						lg={2}
						xl={1}
						className={classes.book}
						key={`${book.title} ${book.isbn}`}
					>
						<BookListItem book={book} />
					</Grid>
				);
			})}
		</React.Fragment>
	);
}

BookList.propTypes = {
	books: PropTypes.array.isRequired
};

export default withStyles(styles)(BookList);
