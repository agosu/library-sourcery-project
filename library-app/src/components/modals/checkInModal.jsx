import React from 'react';
import ModalTitle from './common/ModalTitle';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import StarRating from '../StarRating/StarRating';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Good',
	3: 'Good+',
	3.5: 'Great',
	4: 'Great+',
	4.5: 'Amazing',
	5: 'Amazing+',
};

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

export default function CheckinModal({ book, onClose, onConfirm, open, onRead, onReview }) {
	const [value, setValue] = React.useState(2);
	const [hover, setHover] = React.useState(-1);
	const handleCheck = (book) => {
		return book === undefined ? (
			<div />
		) : (
			<div>
				<Dialog
					className="wrapper1"
					disableBackdropClick={true}
					onClose={onClose}
					aria-labelledby="customized-dialog-title"
					open={open}
				>
					<ModalTitle title="Check in" onClose={onClose} />
					<DialogContent id="modal-dialog-content" dividers>
						<Grid container spacing={0}>
							{/* ************************Book cover************************ */}
							<Grid item xs={5} sm={4}>
								<img id="modal-checkin-book-cover" src={book.bookCover} alt="Book Cover" />
							</Grid>
							{/* ************************Book details************************ */}
							<Grid item xs={7} sm={8}>
								<div className="modal-checkin-right-side">
									<h4 id="modal-checkin-book-title">{book.title}</h4>
									{book.author.map((a) => (
										<p key={a} className="modal-checkin-book-author">
											{a}
										</p>
									))}
								</div>
								<div id="modal-checkin-rating-wrapper">{<StarRating rating={book.rating} />}</div>
							</Grid>
							{/* ************************User input************************ */}
							<Grid item sm={4} />
							<Grid item xs={12} sm={8} className="modal-checkin-right-side">
								<div className="modal-checkin-seperator" />
								<p className="modal-checkin-secondary-text">REVIEW</p>
								<textarea
									onChange={(e) => onReview(e.target.value)}
									placeholder="Leave a comment..."
									id="modal-checkin-review-textarea"
								/>	
								<div>
									<div className="modal-checkin-seperator" />
								</div>
								<p className="modal-checkin-secondary-text">LEAVE A RATING</p>																		
								<Rating
									name="half-rating"
									defaultValue={2.5}
									precision={0.5}
									onChange={(event, newValue) => {
										setValue(newValue);
									}}
									onChangeActive={(event, newHover) => {
										setHover(newHover);
									}}									
								/>	
								{value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions id="modal-checkin-btn-wrapper">
						<Button
							id="modal-checkin-secondary-btn"
							onClick={() => {
								onClose();
							}}
							variant="contained"
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								onConfirm();
								onClose();
							}}
							variant="contained"
							id="modal-checkin-primary-btn"
						>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	};
	return handleCheck(book);
}
