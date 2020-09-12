import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

export default function ModalTitle({ title, onClose }) {
  return (
    <div id="modal-checkin-title-wrapper">
      <h6 id="modal-checking-title">{title}</h6>
      <Button onClick={onClose} id="modal-checkin-close-icon">
        <CloseIcon id="modal-checkin-close-icon-svg" />
      </Button>
    </div>
  );
}
