import React, { useState, useEffect } from "react"; 
import { useHistory, useParams } from "react-router";
import { readReservation, listTables, updateTables } from "../utils/api";
import SeatForm from "./SeatForm";

function ReservationSeat() {

    const [table, setTable] = useState([]);
    const [reservation, setReservation] = useState({});
    const [tableId, setTableId] = useState("");
    const [error, setError] = useState(null);

    const history = useHistory();
    const { reservation_id } = useParams();

    function loadTableAndReservation() {
    const abortController = new AbortController();

        async function loadTableAndReservation() {
            try {
                const reservationResponse = await readReservation(reservation_id, abortController.signal);
                const tablesResponse = await listTables(abortController.signal);
                setReservation(reservationResponse);
                setTable(tablesResponse);
            } catch (error) {
                setError([error]);
            }
        }
        loadTableAndReservation();
        return () => abortController.abort();
    }
    
    useEffect(loadTableAndReservation, [reservation_id])

    const changeHandler = (event) => {
        setTableId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        async function seatNewReservation() {
            try {
                await updateTables(reservation_id, Number(tableId));
                history.push("/dashboard")
            } catch (error) {
                setError([error.message])
            }
        }
        seatNewReservation();
        loadTableAndReservation();
    }
    
    return (
        <div>
            <h2>Seat Reservation</h2>
            <SeatForm changeHandler={changeHandler} tables={table} tableId={tableId}/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="cancel" onClick={() => history.goBack()}>Cancel</button>
        </div>
    )
}

export default ReservationSeat;