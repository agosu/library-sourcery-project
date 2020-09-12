/** @format */

import "date-fns";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import StarRating from "../StarRating/StarRating.jsx";
import ModalTitle from "./ModalTitleCheckOut";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import "./checkOut.css";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import {getToken} from "./../../adalConfig";

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

const styles = {
  SvgIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
};

export default function CheckOut({
  office,
  bookCheckOut,
  onClose,
  openCheckOut,
  id,
}) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const onConfirm = async () => {
    const authHeader = `Bearer ${getToken()}`;

    let fetchedLibraryId = null;
    const getLibraryParams = {
        bookId: id,
        officeId: office.id,
    };
    await axios
        .get(
            process.env.REACT_APP_API_URL + "/library",
            {
              params: getLibraryParams,
              headers: { Authorization: authHeader }
            }
        )
        .then((response) => {
            fetchedLibraryId = response.data.id;
        })
        .catch((error) => {
          console.log(error);
        });


    const postReservationBody = {
      libraryId: fetchedLibraryId,
      plannedReturnDate: selectedDate,
    };
    await axios
        .post(
            process.env.REACT_APP_API_URL + "/reservations/checkout",
            postReservationBody,
            { headers: { Authorization: authHeader } },
        )
        .catch((error) => {
            console.log(error);
        });
  };
  const handleCheck = (book) => {
    return book === undefined ? (
      <div />
    ) : (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title "
          class="wrapper"
          open={openCheckOut}
        >
          <ModalTitle title="Check out" onClose={onClose} />

          <DialogContent id="modal-dialog-content" dividers>
            <Grid container spacing={0}>
              {/* ************************Book cover************************ */}
              <Grid item xs={5} sm={4}>
                <img
                  id="modal-checkOut-book-cover"
                  src={bookCheckOut.bookCover}
                  alt="Book Cover"
                />
              </Grid>
              {/* ************************Book details************************ */}
              <Grid item xs={7} sm={8}>
                <div className="modal-checkOut-right-side">
                  <h4 id="modal-checkOut-book-title">{bookCheckOut.title}</h4>
                  {bookCheckOut.author.map((a) => (
                    <p key={a} className="modal-checkOut-book-author">
                      {a}
                    </p>
                  ))}
                </div>
                <div id="modal-checkOut-rating-wrapper">
                  {<StarRating rating={bookCheckOut.rating} class="svg" />}
                </div>
              </Grid>
              {/* ************************RESERVE AT************************ */}
              <Grid item sm={4} />
              <Grid item xs={12} sm={8} className="modal-checkOut-right-side">
                <p class="paddinger1">
                  <div className="modal-checkOut-seperator" />
                </p>
                <p className="modal-checkOut-secondary-text">RESERVE AT</p>
                <Grid container spacing={4}>
                  <Grid item xs={3} sm={1}>
                    <svg style={styles.SvgIcon}>
                      <path
                        d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
                        fill="black"
                      />
                    </svg>
                  </Grid>
                  <Grid item xs={9} sm={9}>
                    <div>
                      <span class="officeName">{office.officeName}, </span>
                      <span class="availableBooks">
                        {" "}
                        {office.bookQuantity} available{" "}
                      </span>
                    </div>
                    <div>
                      <span class="officeAddress"> {office.address} </span>
                    </div>
                  </Grid>
                </Grid>
                <p class="paddinger">
                  <div className="modal-checkOut-seperator" />
                </p>
                <p className="modal-checkOut-secondary-text">
                  PLANNED RETURN DATE{" "}
                </p>
                <div id="DateTime">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        inputVariant="outlined"
                        disablePast={true}
                        format="MMM dd, yyyy"
                        minDate={new Date()}
                        value={selectedDate}
                        onChange={onDateChange}
                        onConfirm
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
                <br />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions id="modal-checkOut-btn-wrapper">
            <Button
              id="modal-checkOut-secondary-btn"
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
              id="modal-checkOut-primary-btn"
            >
              Confirm reservation
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  return handleCheck(bookCheckOut);
}
