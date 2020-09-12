import React from 'react';
import PropTypes from 'prop-types';
import BookListItem from '../BookListItem/BookListItem';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
	book: {
        marginBottom: theme.spacing(6),
        marginRight: theme.spacing(8),
	},
});

const getBooks = (books, showNumber) => {
    if(showNumber > 0) {
        return books.slice(0, showNumber);
    } else {
        return books;
    }
};

class DashboardBooksList extends React.Component {
    

	render() {
		const { classes, books, showNumber} = this.props;

		return (
			<React.Fragment>
				<div>
					<Grid container spacing={6} justify={'flex-start'}>
						{getBooks(books, showNumber).map((book) => {
							return (
								<Grid
									item
                                    xs={6}
									sm={4}
									md={2}
									lg={2}
									xl={1}
									className={classes.book}
									key={`${book.title} ${book.isbn}`}
								>
                                    <div>
									    <BookListItem book={book} />
                                    </div>
								</Grid>
							);
						})}
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

DashboardBooksList.propTypes = {
	books: PropTypes.array.isRequired,
};

export default withStyles(styles)(DashboardBooksList);
