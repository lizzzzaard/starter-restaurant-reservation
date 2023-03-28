import React, { useState } from "react";
import ListReservations from "../reservations/ListReservations";
import { listReservations } from "../utils/api";

function Search() {
const [reservations, setReservations] = useState([]);
const [mobileNumber, setMobileNumber] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState(null)

const changeHandler = (event) => {
    setMobileNumber(event.target.value)
}

const handleSubmit = (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    listReservations({ mobile_number: mobileNumber }, abortController.signal)
        .then((reservations) => setReservations(reservations))
        .then(setMessage("No reservations found"))
        .catch((err) => setError(err));
        
   return () => abortController.abort();
}

    return (
        <div>
            <h2>Search</h2>
                <form>
                    <label>Mobile Number:</label>
                    <input
                        id="mobile_number"
                        name="mobile_number"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Enter a customer's phone number"
                        onChange={changeHandler}
                        value={mobileNumber}
                        required
                    />
                    <button type="submit" onClick={handleSubmit}>Find</button>
                </form>
                    <div>
                        {reservations.length ?
                        <ListReservations reservations={reservations}/> 
                        : <h3>{message}</h3>
                        }
                    </div>
        </div>
    )
}

export default Search;