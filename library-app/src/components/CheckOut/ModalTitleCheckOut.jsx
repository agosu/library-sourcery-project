import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

export default function ModalTitle({ title, onClose }) {
	return (
		<div id="modal-checkOut-title-wrapper">
			<h6 id="modal-checkOut-title">{title}</h6>
			<Button onClick={onClose} id="modal-checkOut-close-icon">
				<CloseIcon />
			</Button>
		</div>
	);
}
