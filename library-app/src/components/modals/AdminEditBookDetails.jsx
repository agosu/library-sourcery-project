import React from 'react';
import ModalTitle from './common/ModalTitle';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './modals.css';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Dialog = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  paper: {
    width: '800px',
    height: '750px',
  },
}))(MuiDialog);

function EditBookDetails({
  title,
  author,
  format,
  publisher,
  ISBN,
  publicationDate,
  open,
  onClose,
  onSubmit,
  onTitle,
  onAuthor,
  onFormat,
  onPublisher,
  onISBN,
  onPubDate,
  modalPubDate,
  description,
  onDescription,
}) {
  return (
    <div>
      <Dialog
        disableBackdropClick={true}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="wrapperWishList"
      >
        <ModalTitle title="Edit book details" onClose={onClose} />
        <DialogContent id="modal-dialog-content" dividers>
          <Grid container>
            <Grid item xs className="modal-checkin-right-side">
            
              <p className="modal-Wishlist-secondary-text">TITLE</p>
              {/*TITLE TEXT FIELD*/}
              <TextField
                
                onChange={(e) => onTitle(e.target.value)}
                defaultValue={title}
                id="TitleField"
                variant="outlined"
                fullWidth
              />
              <p className="modal-Wishlist-secondary-text">AUTHOR (S)</p>
              {/*AUTHOR (S) TEXT FIELD */}
              <TextField
                
                onChange={(e) => onAuthor(e.target.value)}
                defaultValue={author}
                id="AuthorField"
                variant="outlined"
                fullWidth
              />
              <p className="modal-Wishlist-secondary-text">FORMAT</p>
              {/*AUTHOR (S) TEXT FIELD */}
              <TextField
                
                onChange={(e) => onFormat(e.target.value)}
                defaultValue={format}
                id="FormatField"
                variant="outlined"
                fullWidth
              />
              <p className="modal-Wishlist-secondary-text">PUBLISHER</p>
              {/*AUTHOR (S) TEXT FIELD */}
              <TextField
                
                defaultValue={publisher}
                onChange={(e) => onPublisher(e.target.value)}
                id="PublisherField"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <p className="modal-Wishlist-secondary-text">ISBN</p>
              {/*ISBN TEXT FIELD*/}
              <TextField
                
                onChange={(e) => onISBN(e.target.value)}
                defaultValue={ISBN}
                id="ISBNField"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={5} sm={6}>
              <p className="modal-Wishlist-secondary-text">PUBLICATION DATE</p>
              {/*DATE PICKER*/}
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                className="Calendar"
              >
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd MMM, yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  inputVariant="outlined"
                  autoOk={true}
                  value={modalPubDate}
                  onChange={date => onPubDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <p className="modal-Wishlist-secondary-text">DESCRIPTION</p>
              <textarea
                value={description}
                onChange={(e) => onDescription(e.target.value)}
                id="modal-Wishlist-review-textarea2"
              />
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
              onSubmit(title, author, format, publisher, ISBN, publicationDate, description);
              onClose();
            }}
            variant="contained"
            id="modal-checkin-primary-btn"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function AdminEditBookDetails({
  onBtnClick,
  title,
  author,
  format,
  publisher,
  ISBN,
  publicationDate,
  open,
  onClose,
  onSubmit,
  onTitle,
  onAuthor,
  onFormat,
  onPublisher,
  onISBN,
  onPubDate,
  modalPubDate,
  description,
  onDescription,
}) {

	return (
		<div>
        <Button  
          id='admin-edit-details-btn'
          variant="contained"
          color="secondary" 
          onClick={onBtnClick}
        >
          <span id='admin-edit-details-btn-svg'>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white"/>
            </svg>
          </span>
				  Edit details
        </Button>
        <EditBookDetails
          title={title}
          author={author}
          format={format}
          publisher={publisher}
          ISBN={ISBN}
          publicationDate={publicationDate}
          modalPubDate={modalPubDate}
          description={description}

          open={open}
          onClose={onClose}
          onSubmit={onSubmit}
          onTitle={onTitle}
          onAuthor={onAuthor}
          onFormat={onFormat}
          onPublisher={onPublisher}
          onISBN={onISBN}
          onPubDate={onPubDate}  
          onDescription={onDescription}
		  	/>
		</div>
	);
}

