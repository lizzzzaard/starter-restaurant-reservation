import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ReservationErrors from "./ReservationErrors";
import validDateAndTime from "./ReservationsValidation";

function ReservationEdit() {
    const history = useHistory();
    const { reservation_id } = useParams();

    const initialReservationState ={
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }

    const [reservation, setReservation] = useState({ ...initialReservationState })
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setError(null);
        readReservation(reservation_id, abortController.signal)
            .then(setReservation)
            .catch(setError);

        return () => abortController.abort();
    }, [reservation_id]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        const errors = validDateAndTime(reservation);
        if (errors.length) {
             return setError(errors);
        }

        async function updateExistingReservation() {
            try {
                await updateReservation({...reservation, people: Number(reservation.people)}, abortController.signal);
                history.push(`/dashboard?date=${reservation.reservation_date}`);
            } catch (err) {
                setError([err]);
            }

            return () => abortController.abort();
        }
        updateExistingReservation();
    }

    function changeHandler({ target }) {
            setReservation({
                ...reservation,
                [target.name]: target.value,
            })
    };


    return (
        <div>
            <h2>Edit Reservation:</h2>
            <ReservationErrors errors={error}/>
            <ReservationForm reservation={reservation} changeHandler={changeHandler} />
            <button type="button" onClick={() => history.goBack(-1)}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ReservationEdit;