import React, { useState } from "react";
import { useHistory } from  "react-router-dom";
import { createReservation } from "../utils/api";
import  validDateAndTime from "./ReservationsValidation";
import ReservationErrors from "./ReservationErrors";
import ReservationForm from "./ReservationForm";

function ReservationCreate() {
const history = useHistory();

const initialReservationState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
}

const [reservation, setReservation] = useState({...initialReservationState});
const [error, setError] = useState(null);


const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validDateAndTime(reservation);
    if (errors.length) {
        return setError(errors)
    }

        async function createNewReservation() {
            try {
                const newReservation = await createReservation({...reservation, people: Number(reservation.people)});
                setReservation({ ...initialReservationState });
                history.push(`/dashboard?date=${newReservation.reservation_date}`)
            } catch (error) {
                setError([error])
            }
        }
        createNewReservation();
}

function changeHandler({ target }) {
    setReservation({
        ...reservation,
        [target.name]: target.value,
    })
}

    return (
        <div>
            <h1>Make a New Reservation</h1>
            <ReservationErrors errors={error}/>
            <ReservationForm changeHandler={changeHandler} reservation={reservation}/>
                <button type="button" onClick={() => history.goBack()}>Cancel</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ReservationCreate;