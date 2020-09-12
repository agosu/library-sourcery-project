/** @format */

import React, { useState, useEffect } from 'react';
import { Link, Divider, Grid, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import StarRating from '../StarRating/StarRating.jsx';
import './bookDetails.css';
import MakeTable from '../../containers/Active_reservation/Active_reservation_table';
import Comments from '../../containers/Comments/comments';
import AdminEditBookDetails from '../modals/AdminEditBookDetails.jsx';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import DeleteConfirmation from '../modals/DeleteConfirmation';
import WaitlistTable from '../Waitlist/WaitlistTable.js';
import { getToken } from './../../adalConfig';

export default function BookDetails({
	book,
	user,
	fetchBooks,
	openDelete,
	onDeleteModal,
	onClose,
	data,
	children,
	commentsPerPage,
	reading
}) {
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleModalClose = () => {
		setOpen(false);
	};

	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ format, setFormat ] = useState('');
	const [ publisher, setPublisher ] = useState('');
	const [ ISBN, setISBN ] = useState('');
	const [ publicationDate, setPublicationDate ] = useState(2020);
	const [ modalPubDate, setModalPubDate ] = useState(2019);
	const [ description, setDescription ] = useState('');
	const [ bookId, setBookId ] = useState(0);
	const [ pages, setPages ] = useState(0);

	useEffect(
		() => {
			if (book !== undefined) {
				setTitle(book.title);
				setAuthor(book.author.join(', '));
				setFormat(book.format);
				setPublisher(book.publisher);
				setISBN(book.isbn);
				setPublicationDate(book.pubDate);
				setModalPubDate(book.pubDate);
				setDescription(book.description);
				setBookId(book.id);
				setPages(book.numOfPages);
			}
		},
		[ book ]
	);
	const handleTitle = (title) => {
		setTitle(title);
	};

	const handleAuthor = (author) => {
		setAuthor(author);
	};

	const handleFormat = (format) => {
		setFormat(format);
	};

	const handlePublisher = (publisher) => {
		setPublisher(publisher);
	};

	const handleISBN = (ISBN) => {
		setISBN(ISBN);
	};

	const handleDescription = (description) => {
		setDescription(description);
	};

	const handlePublicationDate = (pubDate) => {
		setModalPubDate(pubDate);
		setPublicationDate(pubDate);
	};

	const handleSubmit = async (title, author, format, publisher, isbn, pubDate, description) => {
		console.log(typeof author);

		const updatedBook = { ...book };
		updatedBook.title = title;
		updatedBook.author = author;
		updatedBook.format = format;
		updatedBook.publisher = publisher;
		updatedBook.isbn = isbn;
		updatedBook.pubDate = pubDate;
		updatedBook.description = description;
		await handleBookUpdate(updatedBook);
	};

	const handleBookUpdate = async (updatedBook) => {
		try {
			await axios.put(process.env.REACT_APP_API_URL + `/books/${book.id}`, updatedBook, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
		} catch (error) {
			console.log(error);
		}
	};
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleDeleteClick = (e) => {
		return e.target.parentElement.id === 'admin-menu-icons' ||
		e.target.parentElement.className === 'MuiList-root MuiMenu-list MuiList-padding'
			? onDeleteModal()
			: null;
	};
	const handleConfirm = async () => {
		try {
			window.history.back();
			await axios.delete(process.env.REACT_APP_API_URL + `/books/${book.id}`, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			fetchBooks();
		} catch (error) {
			console.log(error);
		}
	};
	// When we call this function we pass prop of user which states if user is reading (true/false). If he is reading we won't render waitlist table, otherwise we render it. When we are switching mock data with api we have to change this part aswell, to check if user is reading by fetching data from reservation table. Data that is being passed in are users who are in the waitlist, so respectively we will have to change it aswell. format of data being passed for table can be found in active reservations component.
	const checkIsUserReading = (reading) => {
		return reading ? (
			<Grid container />
		) : (
			<Grid container>
				<WaitlistTable data={data} />
			</Grid>
		);
	};
	const handleCheck = (book) => {
		return book === undefined ? (
			<div />
		) : (
			<div id={'book-details-root'}>
				<DeleteConfirmation book={book} openDelete={openDelete} onClose={onClose} onConfirm={handleConfirm} />
				<Grid container>
					<Grid item sm={4} id={'book-details-flex-grid'}>
						<img className={'book-details-cover'} src={book.bookCover} alt={'Book cover'} />
					</Grid>
					<Grid item sm={8} id={'book-details-flex-grid'}>
						<div id={'book-details-title'}>{title}</div>
						<div id={'book-details-author'}>
							<Link color={'inherit'} underline={'always'} to="" key={author}>
								{author}
							</Link>
						</div>
						<div id={'book-details-rating-block'}>
							{<StarRating rating={book.rating} />}
							<div>
								<div id={'book-details-bullet'}>{'\u2B24'}</div>
								{book.numOfRatings} ratings
								<div id={'book-details-bullet'}>{'\u2B24'}</div>
								{book.numOfReviews} reviews
							</div>
						</div>
						<div>
							{book.isAvailable ? (
								<div id={'book-details-available'}>
									<CheckCircleIcon style={{ color: '#3BA77A', paddingRight: '10px' }} />
									Available
								</div>
							) : (
								<div id={'book-details-unavailable'}>
									<HighlightOffIcon style={{ color: '#EE3D57', paddingRight: '10px' }} />
									Currently unavailable
								</div>
							)}
						</div>
						<div>
							{user.roleId === 2 && (
								<span>
									<Button
										variant={'contained'}
										aria-controls="simple-menu"
										aria-haspopup="true"
										onClick={handleClick}
										id={'menu-button'}
										disableElevation
										startIcon={<SettingsIcon id={'admin-menu-icons'} />}
									>
										More
									</Button>
									<Menu
										onClick={(e) => handleDeleteClick(e)}
										id="simple-menu"
										getContentAnchorEl={null}
										anchorEl={anchorEl}
										open={Boolean(anchorEl)}
										onClose={handleClose}
										keepMounted
										elevation={0}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center'
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center'
										}}
									>
										<MenuItem id={'menu-item'} onClick={handleClose}>
											<DeleteIcon id={'admin-menu-icons'} />Delete book
										</MenuItem>
									</Menu>
								</span>
							)}
							{children}
						</div>
						<div id={'book-details-grey-text'} style={{ lineHeight: '20px' }}>
							{description}
						</div>
						<Divider id={'book-details-divider'} />
						<div id={'book-details-details'}>Details</div>
						<Grid container id={'book-details-grey-text'}>
							<Grid item xs={6}>
								<div>Original Title</div>
							</Grid>
							<Grid item xs={6}>
								<div id={'book-details-bold-grey-text'}>{title}</div>
							</Grid>
							<Grid item xs={6}>
								<div>Format</div>
							</Grid>
							<Grid item xs={6}>
								<div id={'book-details-bold-grey-text'}>
									{format} | {pages} pages
								</div>
							</Grid>
							<Grid item xs={6}>
								<div>Publication date</div>
							</Grid>
							<Grid item xs={6}>
								<div id={'book-details-bold-grey-text'}>{publicationDate}</div>
							</Grid>
							<Grid item xs={6}>
								<div>Publisher</div>
							</Grid>
							<Grid item xs={6}>
								<div id={'book-details-bold-grey-text'}>{publisher}</div>
							</Grid>
							<Grid item xs={6}>
								<div>ISBN</div>
							</Grid>
							<Grid item xs={6}>
								<div id={'book-details-bold-grey-text'}>{ISBN}</div>
							</Grid>
						</Grid>
						{user.roleId === 2 && (
							<AdminEditBookDetails
								onBtnClick={handleClickOpen}
								title={title}
								author={author}
								format={format}
								publisher={publisher}
								ISBN={ISBN}
								publicationDate={publicationDate}
								modalPubDate={modalPubDate}
								description={description}
								open={open}
								onClose={handleModalClose}
								onSubmit={handleSubmit}
								onTitle={handleTitle}
								onAuthor={handleAuthor}
								onFormat={handleFormat}
								onPublisher={handlePublisher}
								onISBN={handleISBN}
								onPubDate={handlePublicationDate}
								onDescription={handleDescription}
							/>
						)}
						<Divider id={'book-details-divider'} />
						<Grid container>
							<MakeTable data={data} />
						</Grid>
						{checkIsUserReading(reading)}
						<Grid container>
							<Comments commentsPerPage={commentsPerPage} bookId={book.id} user={user} />
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	};
	return handleCheck(book);
}
