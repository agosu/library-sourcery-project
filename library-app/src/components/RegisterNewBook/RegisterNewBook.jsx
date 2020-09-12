/** @format */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import './RegisterNewBook.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import { getToken } from './../../adalConfig';

export default class RegisterNewBook extends React.Component {
	constructor(props) {
		super(props);
		//Once we have working reservation and copies available db -> remove isAvailable from state?
		this.state = {
			data: {
				book: {
					image: null,
					format: 'paperback',
					categoryId: 2,
					isAvailable: true,
					numOfRatings: 999,
					numOfReviews: 999
				},
				libraries: []
			},
			offices: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);
		this.handleOfficeChange = this.handleOfficeChange.bind(this);
	}

	handleChange(event) {
		const state = { ...this.state };
		if (event.target.name === 'pubDate') {
			state.data.book[event.target.name] = parseInt(event.target.value);
		} else if (event.target.name === 'categoryId') {
			state.data.book[event.target.name] = parseInt(event.target.value);
		} else {
			state.data.book[event.target.name] = event.target.value;
		}
		this.setState({ ...state });
	}
	handleOfficeChange(event) {
		let targetOfficeId = Number(event.currentTarget.getAttribute('id'));
		const state = { ...this.state };
		const filtered = state.data.libraries.filter((lib) => lib.officeId !== targetOfficeId);
		const updatedLibrary = {
			bookId: -1,
			officeId: targetOfficeId,
			bookCount: Number(event.target.value),
			createdById: this.props.user.id
		};
		filtered.push(updatedLibrary);
		state.data.libraries = filtered;
		this.setState({ ...state });
	}

	async handleImageUpload(event) {
		if (event.target.files[0]) {
			const state = { ...this.state };
			state.data.book.imageUpload = new FormData();
			const input = event.target;
			const file = input.files[0];
			state.data.book.imageUpload.append('file', file);
			state.data.book.image = URL.createObjectURL(event.target.files[0]);
			this.setState({ ...state });
		}
	}
	async handlePostImage(image) {
		try {
			const { data } = await axios.post(process.env.REACT_APP_API_URL + '/images', image, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			const state = { ...this.state };
			state.data.book.bookCover = data;
			this.setState({ ...state });
		} catch (error) {
			console.log(error);
		}
	}
	async handlePostBook(book) {
		try {
			await axios.post(process.env.REACT_APP_API_URL + '/library/info', book, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
		} catch (error) {
			console.log(error);
		}
	}
	async handleSubmit(event) {
		event.preventDefault();
		await this.handlePostImage(this.state.data.book.imageUpload);
		const newBook = { ...this.state.data };
		newBook.book.rating = 5;
		await this.handlePostBook(newBook);
		this.props.fetchBooks();
		window.history.back();
	}
	async componentDidMount() {
		const state = await this.fetchOffices();
		this.setState({ ...state });
	}
	async fetchOffices() {
		const state = { ...this.state };
		const { data } = await axios.get(process.env.REACT_APP_API_URL + `/library/info/${-1}`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		});
		state.offices = [ ...data ];
		for (let office of data) {
			state.data.libraries.push({
				bookId: -1,
				officeId: office.id,
				bookCount: 0,
				createdById: this.props.user.id
			});
		}
		return state;
	}
	handleOfficeRender() {
		return this.state.offices.length > 0 ? (
			this.state.offices.map((office) => (
				<Grid key={office.id} container spacing={3}>
					<Grid xs={9} item>
						<select className={'select-field'} name={'copies'}>
							<option value={office.id}>{office.name}</option>
						</select>
					</Grid>
					<Grid xs={3} item>
						<input
							id={`${office.id}`}
							className={'text-field'}
							name={`bookCount`}
							type={'number'}
							onChange={this.handleOfficeChange}
						/>
					</Grid>
				</Grid>
			))
		) : (
			<div />
		);
	}
	render() {
		return (
			<div id={'register-new-book-container'}>
				<form onSubmit={this.handleSubmit} encType="multipart/form-data">
					<div id={'register-new-book-title'}>Register new book</div>
					<div className={'info-item-image-upload'}>
						<label htmlFor={'image-input'} id={'register-new-book-label'}>
							Cover
						</label>
						<input
							id={'image-input'}
							accept={'image/*'}
							type={'file'}
							name="file"
							onChange={this.handleImageUpload}
							required
						/>
						<label htmlFor={'image-input'}>
							{this.state.data.book.image ? (
								<img id={'cover-image'} src={this.state.data.book.image} alt={'Book cover'} />
							) : (
								<div className={'upload-image-div'}>
									<CloudUploadIcon id={'cloud-upload-icon'} />
									<p className={'upload-image-text'}>Upload image</p>
								</div>
							)}
						</label>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'title'} id={'register-new-book-label'}>
							Title
						</label>
						<input
							className={'text-field'}
							name={'title'}
							type={'text'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'author'} id={'register-new-book-label'}>
							Author(s)
						</label>
						<input
							className={'text-field'}
							name={'author'}
							type={'text'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'description'} id={'register-new-book-label'}>
							Description
						</label>
						<input
							className={'text-field description-field'}
							name={'description'}
							type={'text'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'isbn'} id={'register-new-book-label'}>
							Isbn
						</label>
						<input
							className={'text-field'}
							name={'isbn'}
							type={'text'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'format'} id={'register-new-book-label'}>
							Format
						</label>
						<select className={'select-field'} name={'format'} onChange={this.handleChange}>
							<option value={'paperback'}>Paperback</option>
							<option value={'hardcover'}>Hardcover</option>
						</select>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'number-of-pages'} id={'register-new-book-label'}>
							Number of pages
						</label>
						<input
							className={'text-field'}
							name={'number-of-pages'}
							type={'number'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'pubDate'} id={'register-new-book-label'}>
							Publication year
						</label>
						<input
							className={'text-field'}
							name={'pubDate'}
							type={'number'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'publisher'} id={'register-new-book-label'}>
							Publisher
						</label>
						<input
							className={'text-field'}
							name={'publisher'}
							type={'text'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'language'} id={'register-new-book-label'}>
							Edition language
						</label>
						<select className={'select-field'} name={'language'} onChange={this.handleChange}>
							<option value={'English'}>English</option>
							<option value={'Lithuanian'}>Lithuanian</option>
						</select>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'series'} id={'register-new-book-label'}>
							Series
						</label>
						<input
							className={'text-field'}
							name={'series'}
							type={'text'}
							onChange={this.handleChange}
							required
						/>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'category'} id={'register-new-book-label'}>
							Category
						</label>
						<select className={'select-field'} name={'categoryId'} onChange={this.handleChange}>
							<option value={2}>Business</option>
							<option value={3}>Computer science</option>
							<option value={4}>Data science</option>
							<option value={5}>Design</option>
							<option value={6}>Development</option>
							<option value={7}>Productivity</option>
						</select>
					</div>
					<div className={'info-item'}>
						<label htmlFor={'copies'} id={'register-new-book-label'}>
							Copies available at offices
						</label>
						{this.handleOfficeRender()}
						{/* <Grid container spacing={3}>
							<Grid xs={9} item>
								<select className={'select-field'} name={'copies'}>
									<option value={'Kaunas'}>Kaunas</option>
								</select>
							</Grid>
							<Grid xs={3} item>
								<input
									className={'text-field'}
									name={'copies-kaunas'}
									type={'number'}
									onChange={this.handleChange}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid xs={9} item>
								<select className={'select-field'} name={'copies-vilnius'}>
									<option value={'Vilnius'}>Vilnius</option>
								</select>
							</Grid>
							<Grid xs={3} item>
								<input
									className={'text-field'}
									name={'copies'}
									type={'number'}
									onChange={this.handleChange}
								/>
							</Grid>
						</Grid> */}
					</div>
					<input type={'submit'} value={'Register'} id={'modal-checkin-primary-btn'} />
				</form>
			</div>
		);
	}
}
