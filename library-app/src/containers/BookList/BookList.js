import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import BookListComponent from '../../components/BookList/BookList';
import { withStyles } from '@material-ui/core';
import BookListFilters from '../../components/BookListFilters/BookListFilters';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase/InputBase';
import './BookList.css';

const styles = (theme) => ({
	book: {
		marginBottom: theme.spacing(6)
	},
	pagination: {
		position: 'absolute',
		right: 0
	}
});

const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3)
		}
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		width: 100,
		height: 8,
		transition: theme.transitions.create([ 'border-color', 'box-shadow' ]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [ 'Inter' ].join(','),
		'&:focus': {
			backgroundColor: '#ffffff'
		}
	}
}))(InputBase);

const getBooksAtPage = (books, page, booksPerPage) => {
	return books.slice((page - 1) * booksPerPage, (page - 1) * booksPerPage + booksPerPage);
};

class BookList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPage: 1,
			sortType: 'Votes Highest'
		};

		this.toggleSort = this.toggleSort.bind(this);
	}

	toggleSort(event) {
		this.setState({ sortType: event.target.value });
	}
	render() {
		const { classes, books, booksPerPage } = this.props;
		const sortedBooks = books.sort((a, b) => {
			switch (this.state.sortType) {
				case 'Title A-Z':
					return a.title.localeCompare(b.title);
					break;
				case 'Title Z-A':
					return b.title.localeCompare(a.title);
					break;
				case 'Author A-Z':
					return a.author[0].localeCompare(b.author[0]);
					break;
				case 'Author Z-A':
					return b.author[0].localeCompare(a.author[0]);
					break;
				case 'Votes Highest':
					return b.rating - a.rating;
					break;
				case 'Votes Lowest':
					return a.rating - b.rating;
					break;
				case 'Available':
					if (b.isAvailable && !a.isAvailable) return 1;
					else if (b.isAvailable == a.isAvailable) return 0;
					else return -1;
					break;
				case 'Unavailable':
					if (!b.isAvailable && a.isAvailable) return 1;
					else if (b.isAvailable == a.isAvailable) return 0;
					else return -1;
					break;
				default:
					break;
			}
		});

		return (
			<React.Fragment>
				<div className="book_list">
					<Grid container spacing={3} justify="flex-start">
						<Grid item xs={10}>
							<Grid container justify="flex-start" justify="space-between" className="book_list-padding">
								<div className="book_list-filters">
									<BookListFilters />
								</div>
							</Grid>
						</Grid>
						<Grid item xs={2}>
							<div className="book_list-sort-wrapper">
								<label className="book_list-sort-text">Sort by:</label>
								<FormControl className="book_list-sort">
									<Select
										className="book_list-sort"
										id="demo-simple-select-outlined"
										value={this.state.sortType}
										onChange={this.toggleSort}
										input={<BootstrapInput />}
									>
										<MenuItem value={'Title A-Z'}>
											<em>Title A-Z</em>
										</MenuItem>
										<MenuItem value={'Title Z-A'}>
											<em>Title Z-A</em>
										</MenuItem>
										<MenuItem value={'Author A-Z'}>
											<em>Author A-Z</em>
										</MenuItem>
										<MenuItem value={'Author Z-A'}>
											<em>Author Z-A</em>
										</MenuItem>
										<MenuItem value={'Votes Highest'}>
											<em>Votes Highest</em>
										</MenuItem>
										<MenuItem value={'Votes Lowest'}>
											<em>Votes Lowest</em>
										</MenuItem>
										<MenuItem value={'Available'}>
											<em>Available</em>
										</MenuItem>
										<MenuItem value={'Unavailable'}>
											<em>Unavailable</em>
										</MenuItem>
									</Select>
								</FormControl>
							</div>
						</Grid>
					</Grid>
					<Grid container spacing={3} justify="flex-start">
						<BookListComponent
							booksPerPage={booksPerPage}
							books={getBooksAtPage(sortedBooks, this.state.currentPage, booksPerPage)}
						/>
					</Grid>

					<Pagination
						count={Math.ceil(books.length / booksPerPage)}
						variant="outlined"
						shape="rounded"
						classes={{
							root: classes.pagination
						}}
						onChange={(event, page) => {
							this.setState({ currentPage: page });
						}}
					/>
				</div>
			</React.Fragment>
		);
	}
}

BookList.propTypes = {
	books: PropTypes.array.isRequired,
	booksPerPage: PropTypes.number.isRequired
};

export default withStyles(styles)(BookList);
