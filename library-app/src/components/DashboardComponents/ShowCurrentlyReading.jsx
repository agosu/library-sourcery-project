import React from 'react';
import '../../containers/Dashboard/Dashboard.css';
import CurrentlyReadingItem from './CurrentlyReadingItem';
import { Grid } from '@material-ui/core';

export default function ShowCurrentlyReading({ readingBooks }) {
	return (
		<React.Fragment>
			<div className="dashboard-currently-reading">Currently Reading</div>
			<Grid container className="dashboard-currently-reading-item-wrapper">
				{readingBooks.map((book) => {
					return (
						<Grid item xs={8} sm={8} md={8} lg={8} xl={8} key={`${book.title} ${book.isbn}`}>
							{/* Here we need to pass prop with return date when doing reservation db table integration */}
							<CurrentlyReadingItem book={book} />
						</Grid>
					);
				})}
			</Grid>
		</React.Fragment>
	);
}
