import React from 'react'
import BeingRead from '../../components/Reservation/UserIsReading/BeingRead.js'
import Details from '../../components/Reservation/UserIsNotReading/Details.js'

export default function showReservation(props) {

    if (props.isUserReading === true) {               //meaning the book is not being read by user
        return (
            <BeingRead
                returnDateDay={12}
                returnDateMonth='april'
                book={props.book}
            />
        );
    } else {
        return (
            <Details
                kaunasBookQuantity={3}
                vilniusBookQuantity={0}
                book={props.book}
            />
        );
    }
}