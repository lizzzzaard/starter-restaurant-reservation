import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
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

    // const [reservation, setReservation] = useState({ ...initialReservationState })
    const [reservation, setReservation] = useState(initialReservationState)
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setError(null);
        readReservation(reservation_id, abortController.signal)
            .then(setReservation)
            .catch(setError);

        return () => abortController.abort();
    }, [reservation_id]);

    function changeHandler({ target }) {
        if([target.name] === "people") {
            setReservation({
                ...reservation,
                [target.name]: Number(target.value)
            });
        }
        setReservation({
            ...reservation,
            [target.name]: target.value,
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        // const errors = validDateAndTime(reservation);
        // if (errors.length) {
        //     return setError(errors);
        // }
        //  function updateExistingReservation() {
        //     try {
        //        updateReservation({ reservation_id, ...reservation }, abortController.signal).then((upRes) => {
        //         const res_date = updateReservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
        //         console.log('line 58: ', res_date);
        //         history.push(`/dashboard?date=`+res_date);
        //        })
                
                
        //     } catch (err) {
        //         setError([err]);
        //     }

        //     return () => abortController.abort();
        // }
        // updateExistingReservation();

        async function updateExistingReservation() {
            try {
                await updateReservation(reservation, abortController.signal);
                history.push(`/dashboard?date=${reservation.reservation_date}`);
            } catch (err) {
                setError([err]);
            }

            return () => abortController.abort();
        }
        updateExistingReservation();
    }


    return (
        <div>
            <ReservationForm reservation={reservation} changeHandler={changeHandler} />
            <button type="button" onClick={() => history.goBack()}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ReservationEdit;