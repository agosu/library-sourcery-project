import React from 'react';
import ModalTitle from './common/ModalTitle';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import allBooks from '../../mock-data/bookList';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

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

export default function WishListAdd({
  onClose,
  onSubmit,
  open,
  onTitle,
  onAuthor,
  onISBN,
  onPublicationDate,
  onDescription,
  publicationDate,
  title,
  ISBN,
  author,
  description,
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
        <ModalTitle title="Add a new book request" onClose={onClose} />
        <DialogContent id="modal-dialog-content" dividers>
          <Grid container>
            <Grid item xs className="modal-checkin-right-side">
              <p className="modal-Wishlist-secondary-text">TITLE</p>
              {/*TITLE TEXT FIELD*/}
              <TextField
                value={title}
                onChange={(e) => onTitle(e.target.value)}
                id="TitleField"
                variant="outlined"
                fullWidth
              />
              <p className="modal-Wishlist-secondary-text">AUTHOR (S)</p>
              {/*AUTHOR (S) TEXT FIELD */}
              <TextField
                value={author}
                onChange={(e) => onAuthor(e.target.value)}
                id="AuthorField"
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
                value={ISBN}
                onChange={(e) => onISBN(e.target.value)}
                id="ISBNField"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={5} sm={6}>
              <p className="modal-Wishlist-secondary-text">PUBLICATION YEAR</p>
              {/*YEAR FIELD*/}
              <TextField
                  value={publicationDate}
                  onChange={(e) => onPublicationDate(parseInt(e.target.value))}
                  id="DateField"
                  variant="outlined"
                  fullWidth
              />
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
              onSubmit();
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
