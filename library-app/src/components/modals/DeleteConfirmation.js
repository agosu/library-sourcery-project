import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ModalTitle from './common/ModalTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions/DialogActions';
import './modals.css';
import { Link } from 'react-router-dom';

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

export default function DeleteConfirmation({ book, openDelete, onClose, onConfirm }) {
	return (
		<Dialog open={openDelete} onClose={onClose} style={{ height: '315px' }}>
			<ModalTitle title={'Delete book'} onClose={onClose} />
			<div id={'grey-text'} className="delete-modal-paragraph">
				<p style={{ marginBottom: '15px' }}>
					Are you sure you want to delete "<strong id="delete-book-title">{book.title}</strong>" permanently?
				</p>
			</div>
			<DialogActions id="modal-checkin-btn-wrapper">
				<Button id={'modal-checkin-secondary-btn'} variant={'contained'} onClick={() => onClose()}>
					Cancel
				</Button>
				<Link id="delete-link" to="/library/all">
					<Button
						style={{ width: '130px' }}
						variant={'contained'}
						onClick={() => {
							onClose();
							onConfirm();
						}}
						id="delete-modal-confirm-btn"
					>
						Delete
					</Button>
				</Link>
			</DialogActions>
		</Dialog>
	);
}
