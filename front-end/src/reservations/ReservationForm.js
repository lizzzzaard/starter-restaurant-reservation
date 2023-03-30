import React from "react";

function ReservationForm({ changeHandler, reservation }) {

    return (
        <div>
            <form>
                <label>First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        onChange={changeHandler}
                        value={reservation.first_name}
                        required
                    />
                <label>Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        onChange={changeHandler}
                        value={reservation.last_name}
                        required
                    />
                <label>Mobile Phone Number</label>
                    <input
                        id="mobile_number"
                        name="mobile_number"
                        type="tel"
                        maxLength="10"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="XXX-XXX-XXXX"
                        onChange={changeHandler}
                        value={reservation.mobile_number}
                        required
                    />
                <label>Reservation Date</label>
                    <input
                        id="reservation_date"
                        name="reservation_date"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={changeHandler}
                        value={reservation.reservation_date}
                        required
                    />
                <label>Reservation Time</label>
                    <input
                        id="reservation_time"
                        name="reservation_time"
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        onChange={changeHandler}
                        value={reservation.reservation_time}
                        required
                    />
                <label>Number of People</label>
                    <input
                        id="people"
                        name="people"
                        type="number"
                        placeholder="Number of People"
                        min="1"
                        onChange={changeHandler}
                        value={reservation.people}
                        required
                    />
                </form>
        </div>
    )
}

export default ReservationForm;