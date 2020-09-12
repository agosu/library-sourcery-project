import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import WishListItem from '../../components/WishListItem/WishListItem';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import WishListAdd from '../../components/modals/WishListAdd';
import '../../components/modals/modals.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './WishList.css';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';

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

class WishList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			sortType: 'Votes highest'
		};
	}

	render() {
		const { currentPage, sortType } = this.state;

		const toggleSort = (event) => {
			this.setState({ sortType: event.target.value });
		};

		const {
			classes,
			books,
			booksPerPage,
			open,
			onUpdate,
			onModal,
			onClose,
			onSubmit,
			onTitle,
			onAuthor,
			onISBN,
			onPublicationDate,
			onDescription,
			publicationDate,
			title,
			author,
			ISBN,
			description
		} = this.props;

		const sorted = books.sort((a, b) => {
			switch (sortType) {
				case 'Name A-Z':
					return a.title.localeCompare(b.title);
				case 'Name Z-A':
					return b.title.localeCompare(a.title);
				case 'Author A-Z':
					return a.author[0].localeCompare(b.author[0]);
				case 'Author Z-A':
					return b.author[0].localeCompare(a.author[0]);
				case 'Votes highest':
					return b.rating - a.rating;
				case 'Votes Lowest':
					return a.rating - b.rating;
				default:
					break;
			}
		});

		return (
			<React.Fragment>
				<div>
					<WishListAdd
						onClose={onClose}
						onSubmit={onSubmit}
						open={open}
						onTitle={onTitle}
						onAuthor={onAuthor}
						onISBN={onISBN}
						onPublicationDate={onPublicationDate}
						onDescription={onDescription}
						publicationDate={publicationDate}
						ISBN={ISBN}
						author={author}
						title={title}
						description={description}
					/>

					<Grid container spacing={3} justify={'flex-start'}>
						<Grid container className="padding-wishlist">
							<Grid item xs={10} />
							<Grid item xs={2}>
								<Box className="sortBox" borderRadius="borderRadius">
									<label className="sortText">Sort by:</label>
									<FormControl className={'${classes.formControl} sortWishList'}>
										<Select
											className="sortWishList"
											id="demo-simple-select-outlined"
											value={this.state.sortType}
											onChange={toggleSort}
											input={<BootstrapInput />}
										>
											<MenuItem value={'Name A-Z'}>
												<em>Name A-Z</em>
											</MenuItem>
											<MenuItem value={'Name Z-A'}>
												<em>Name Z-A</em>
											</MenuItem>
											<MenuItem value={'Author A-Z'}>
												<em>Author A-Z</em>
											</MenuItem>
											<MenuItem value={'Author Z-A'}>
												<em>Author Z-A</em>
											</MenuItem>
											<MenuItem value={'Votes highest'}>
												<em>Votes highest</em>
											</MenuItem>
											<MenuItem value={'Votes Lowest'}>
												<em>Votes Lowest</em>
											</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Grid>
						</Grid>

						<Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
							<div className={'add-book-container'}>
								<IconButton onClick={onModal}>
									<div className={'add-book'}>
										<AddIcon style={{ color: '#fff', height: '40px', width: '40px' }} />
										<p style={{ color: '#fff' }}>Add new book request</p>
									</div>
								</IconButton>
							</div>
						</Grid>
						{getBooksAtPage(sorted, currentPage, booksPerPage).map((book) => {
							{
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
										<WishListItem b={book} onUpdate={onUpdate}/>
									</Grid>
								);
							}
						})}
					</Grid>
				</div>
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
			</React.Fragment>
		);
	}
}

WishList.propTypes = {
	books: PropTypes.array.isRequired,
	booksPerPage: PropTypes.number.isRequired
};

export default withStyles(styles)(WishList);
