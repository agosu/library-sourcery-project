import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ModalTitle from './common/ModalTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions/DialogActions';

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

export default function CantFindCopyModal({ book, open, onClose, onNotify }) {
	return (
		<Dialog open={open} onClose={onClose} style={{ height: '315px' }}>
			<ModalTitle title={"Can't find a copy"} onClose={onClose} />
			<div id={'grey-text'}>
				<p style={{ marginBottom: '15px' }}>
					This will notify admin that you cannot find a physical copy of a book, even though it is marked as
					available in the system.
				</p>
				<p>Your library admin will get in touch with you once the problem is solved.</p>
			</div>
			<DialogActions id="modal-checkin-btn-wrapper">
				<Button id={'modal-checkin-secondary-btn'} variant={'contained'} onClick={() => onClose()}>
					Cancel
				</Button>
				<Button
					style={{ width: '130px' }}
					id={'modal-checkin-primary-btn'}
					variant={'contained'}
					onClick={() => {
						onClose();
						onNotify();
					}}
				>
					Notify admin
				</Button>
			</DialogActions>
		</Dialog>
	);
}
