import React, {useState} from 'react'
import '../../containers/Dashboard/Dashboard.css';
import DashboardBookDetails from './DashboardBookDetails'
import {
    Box,
} from '@material-ui/core'

export default function CurrentlyReadingItem(props) {

    const [ open, setOpen ] = useState(false);
	const [ review, setReview ] = useState('');
	const [ openReserve, setOpenReserve ] = useState(false);

	const randomBook = {
		title:
			"The Annotated Turing: A Guided Tour Through Alan Turing's Historic Paper on Computability and the Turing Machine",
		author: ['Charles Petzold'],
		format: 'Paperback',
		pubDate: 'October 30th 1999',
		publisher: 'Addison-Wesley Professional',
		isbn: '020161622X',
		bookCover: 'https://upload.wikimedia.org/wikipedia/en/b/ba/The_Annotated_Turing_cover.jpg',
		rating: 4.31,
		numOfRatings: 14469,
		numOfReviews: 796,
		isAvailable: true,
		review: ''
	};

	const office = {
		officeName: 'Kaunas office',
		bookQuantity: 3,
		address: 'A. Juozapavičiaus pr. 11D, LT-45252 Kaunas, Lithuania'
	};

    const handleConfirm = () => {
		//Store state in Db
		randomBook.review = review;
		//Reset state after store
		setReview('');
	};
    
	const handleReview = (review) => {
		setReview(review);
	};
	
	const handleClose = () => {
		setOpen(false);
		setOpenReserve(false);
	};

    return(
        <Box className='dashboard-box'>
            <DashboardBookDetails 
                book={props.book}
                onModal={() => setOpen(true)}
				onClose={handleClose}
				onConfirm={handleConfirm}
				onReview={handleReview}
				open={open}
				office={office}
				onReservation={() => setOpenReserve(true)}
				openReservation={openReserve}
            />
        </Box>
    );
}
