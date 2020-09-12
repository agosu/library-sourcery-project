/** @format */

import React, { useState, useEffect } from 'react';
import aReservationList from './Mock_data/MockList';
import BookList from './containers/BookList/BookList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookDetailsContainer from './containers/BookDetails/BookDetailsContainer';
import MenuList from './components/MenuList/MenuList';
import ReservationListContainer from './containers/ReservationList/ReservationListContainer';
import userMock from './mock-data/user';
import LoginPageContainer from './containers/LoginPage/LoginPageContainer';
import './App.css';
import './components/modals/modals.css';
import '../node_modules/ispinner.css/ispinner.prefixed.css';
import UserProfileContainer from './containers/UserProfile/UserProfileContainer';
import WishList from './containers/WishList/WishList';
import Dashboard from './containers/Dashboard/Dashboard';
import axios from 'axios';
import RegisterNewBook from './components/RegisterNewBook/RegisterNewBook';
import { getToken } from './adalConfig';

const randomBook = {
	title:
		"The Annotated Turing: A Guided Tour Through Alan Turing's Historic Paper on Computability and the Turing Machine",
	author: [ 'Charles Petzold' ],
	format: 'Paperback',
	pubDate: 'October 30th 1999',
	publisher: 'Addison-Wesley Professional',
	isbn: '020161622X',
	bookCover: 'https://upload.wikimedia.org/wikipedia/en/b/ba/The_Annotated_Turing_cover.jpg',
	rating: 4.31,
	numOfRatings: 14469,
	numOfReviews: 796,
	isAvailable: true,
	review: '',
	readOnGoodreads: false
};

const office = {
	id: 2,
	officeName: 'Kaunas office',
	bookQuantity: 3,
	address: 'A. Juozapavičiaus pr. 11D, LT-45252 Kaunas, Lithuania'
};

export default function App() {
	const [ commentsPerPage ] = useState(5);
	const [ open, setOpen ] = useState(false);
	const [ openReserve, setOpenReserve ] = useState(false);
	const [ openDelete, setOpenDelete ] = useState(false);
	const [ review, setReview ] = useState('');
	// Books
	const [ books, setBooks ] = useState([]);
	const [ filteredBooks, setFilteredBooks ] = useState([]);

	// WishList
	const [ wishList, setWishList ] = useState([]);

	// used for adding wish to the wishlist
	const [ auth, setAuth ] = useState({ isAuthenticated: false });
	const [ user, setUser ] = useState({});
	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ ISBN, setISBN ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ publicationDate, setPublicationDate ] = useState(2020);

	useEffect(() => {
		//fetchUser();
		fetchBooks();
		fetchWishList();
	}, []);

	window.onpopstate = () => handleClose();

	const handleConfirm = () => {
		//Store state in Db
		randomBook.review = review;
		//Reset state after store
		setReview('');
	};

	const handleWishSubmit = async function() {
		const addedWish = {};
		addedWish.title = title;
		addedWish.author = author;
		addedWish.ISBN = ISBN;
		addedWish.description = description;
		addedWish.publicationDate = publicationDate;
		addedWish.createdOn = new Date(); // Greenwich time zone!!!!!!!!!!???
		try {
			await axios.post(process.env.REACT_APP_API_URL + '/wishlist', addedWish, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			await fetchWishList();
			setTitle('');
			setAuthor('');
			setISBN('');
			setDescription('');
			setPublicationDate(2020);
		} catch (error) {
			console.log(error);
		}
	};

	const handleWishTitle = (title) => {
		setTitle(title);
	};

	const handleWishAuthor = (author) => {
		setAuthor(author);
	};

	const handleWishISBN = (ISBN) => {
		setISBN(ISBN);
	};

	const handleWishDescription = (description) => {
		setDescription(description);
	};

	const handleWishPublicationDate = (publicationDate) => {
		setPublicationDate(publicationDate);
	};

	const handleReview = (review) => {
		setReview(review);
	};

	const handleFilter = async (categoryId = 1) => {
		const { data: filteredBooks } = await axios.get(
			process.env.REACT_APP_API_URL + `/books?category=${categoryId}`,
			{
				headers: { Authorization: `Bearer ${getToken()}` }
			}			
		);
		setFilteredBooks(filteredBooks);
	};

	const handleClose = () => {
		setOpen(false);
		setOpenReserve(false);
		setOpenDelete(false);
	};

	async function fetchUser() {
		try {
			// const { data: user } = await axios.get(process.env.REACT_APP_API_URL + '/users/1', {
			// 	headers: { Authorization: `Bearer ${getToken()}` }
			// });
			const { data: user } = await axios.get(process.env.REACT_APP_API_URL + '/users/token', {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			setUser(user);
		} catch (error) {
			console.log(error);
		}
	}

	const handleUserProfileUpdate = async (updatedUser) => {
		try {
			await axios.put(process.env.REACT_APP_API_URL + `/users/${user.id}`, updatedUser, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			await fetchUser();
		} catch (error) {
			console.log(error);
		}
	};

	async function fetchBooks() {
		try {
			const { data: books } = await axios.get(process.env.REACT_APP_API_URL + '/books', {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			setBooks(books);
			setFilteredBooks(books);
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchWishList() {
		try {
			const { data: wishList } = await axios.get(process.env.REACT_APP_API_URL + '/wishlist', {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			setWishList(wishList);
		} catch (error) {
			console.log(error);
		}
	}

	function handleAuth() {
		setAuth({ ...auth, isAuthenticated: true });
	}
	function handleUserSet(user) {
		setUser({ ...user });
	}

	function isAuthenticated() {
		return auth.isAuthenticated ? (
			<Router>
				<div id="main-display-wrapper">
					<MenuList user={user} onFilter={handleFilter} />
					<div id="main-content-display-wrapper">
						<Switch>
							<Route path="/library/all/:id">
								<BookDetailsContainer
									fetchBooks={fetchBooks}
									openDelete={openDelete}
									onDeleteModal={() => setOpenDelete(true)}
									books={books}
									userMock={userMock}
									user={user}
									open={open}
									openReservation={openReserve}
									onModal={() => setOpen(true)} //******************* */
									onReservation={() => setOpenReserve(true)}
									office={office}
									onClose={handleClose} //******************* */
									onConfirm={handleConfirm}
									onReview={handleReview}
									data={aReservationList}
									commentsPerPage={commentsPerPage}
								/>
							</Route>
							<Route path="/library/addnewbook" exact>
								<RegisterNewBook user={user} fetchBooks={fetchBooks} />
							</Route>
							<Route path="/library/:all">
								<BookList books={filteredBooks} booksPerPage={18} />
							</Route>
							<Route path="/dashboard">
								<Dashboard books={books} user={user} />
							</Route>
							<Route path="/wishlist">
								<h1>WISHLIST</h1>
								<WishList
									books={wishList}
									booksPerPage={18}
									open={open}
									onUpdate={fetchWishList}
									onModal={() => setOpen(true)}
									onClose={() => setOpen(false)}
									onSubmit={handleWishSubmit}
									onTitle={handleWishTitle}
									onAuthor={handleWishAuthor}
									onISBN={handleWishISBN}
									onPublicationDate={handleWishPublicationDate}
									onDescription={handleWishDescription}
									publicationDate={publicationDate}
									ISBN={ISBN}
									author={author}
									title={title}
									description={description}
								/>
							</Route>
							<Route path="/reservations">
								<ReservationListContainer
									onModal={() => setOpen(true)}
									onClose={handleClose}
									onConfirm={handleConfirm}
									onReview={handleReview}
									open={open}
									office={office}
									onReservation={() => setOpenReserve(true)}
									openReservation={openReserve}
								/>
							</Route>
							<Route path="/profile">
								<UserProfileContainer user={user} onUserProfileUpdate={handleUserProfileUpdate} />
							</Route>
							<Route path="/" exact>
								<Dashboard books={books} user={user} />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		) : (
			<LoginPageContainer setAuth={handleAuth} setUser={handleUserSet} />
		);
	}
	return isAuthenticated();
}
