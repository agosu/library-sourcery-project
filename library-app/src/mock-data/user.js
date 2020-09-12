const fakeUser = {
	firstName: 'Nathan',
	lastName: 'Doe',
	fullName: '',
	email: 'nathan.roberts@example.com',
	office: 'Kaunas Office',
	phone: '',
	role: 'Front-end developer',
	goodreadsLink: 'https://goodreads.com/myuser/profile/324516162',
	goodreads: false,
	profilePicture: 'https://randomuser.me/api/portraits/men/62.jpg',
	reading: false,
	isAdmin: true,
	borrowedBooks: [
		{
			title: 'The Mythical Man-Month: Essays on Software Engineering',
			author: [ 'Frederick P. Brooks Jr.' ],
			format: 'Paperback',
			pubDate: 'August 12th 1995',
			publisher: 'Addison-Wesley Professional',
			isbn: '0201835959',
			bookCover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348430512l/13629.jpg',
			rating: 4.04,
			numOfRatings: 12349,
			numOfReviews: 561,
			isAvailable: true,
			category: 'computer science',
			office: 'Kaunas',
			bookedFrom: 'Feb 12, 2020',
			returnDate: 'Apr 12, 2020'
		},
		{
			title:
				'Structure and Interpretation of Computer Programs (MIT Electrical Engineering and Computer Science)',
			author: [ 'Harold Abelson', 'Gerald Jay Sussman', 'Julie Sussman' ],
			format: 'Paperback',
			pubDate: 'July 25th 1996',
			publisher: 'MIT Press',
			isbn: '020161622X',
			bookCover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391032527l/43713.jpg',
			rating: 4.11,
			numOfRatings: 9653,
			numOfReviews: 536,
			isAvailable: false,
			category: 'computer science',
			office: 'Kaunas',
			bookedFrom: 'Feb 12, 2020',
			returnDate: 'Apr 12, 2020'
		},
		{
			title: 'JavaScript: The Good Parts',
			author: [ 'Douglas Crockford' ],
			format: 'Paperback',
			pubDate: 'October 30th 1999',
			publisher: 'Addison-Wesley Professional',
			isbn: '020161622X',
			bookCover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328834793l/2998152.jpg',
			rating: 4.01,
			numOfRatings: 6043,
			numOfReviews: 531,
			isAvailable: true,
			category: 'computer science',
			office: 'Kaunas',
			bookedFrom: 'Feb 12, 2020',
			returnDate: 'Apr 12, 2020'
		}
	],
	requestedBooks: [
		{
			title: 'Patterns of Enterprise Application Architecture',
			author: [ 'Andy Hunt', 'Dave Thomas' ],
			format: 'Paperback',
			pubDate: 'October 30th 1999',
			publisher: 'Addison-Wesley Professional',
			isbn: '020161622X',
			bookCover:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1440294142l/70156._SX318_.jpg',
			rating: 4.31,
			numOfRatings: 14469,
			numOfReviews: 796,
			isAvailable: true,
			category: 'productivity',
			office: 'Kaunas',
			bookedFrom: 'Feb 12, 2020'
		}
	]
};

export default fakeUser;
