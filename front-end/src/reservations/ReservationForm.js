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
                    />
                <label>Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        onChange={changeHandler}
                        value={reservation.last_name}
                    />
                <label>Mobile Phone Number</label>
                    <input
                        id="mobile_number"
                        name="mobile_number"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="XXX-XXX-XXXX"
                        onChange={changeHandler}
                        value={reservation.mobile_number}
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
                    />
                <label>Number of People</label>
                    <input
                        id="people"
                        name="people"
                        type="number"
                        placeholder="Number of People"
                        onChange={changeHandler}
                        value={reservation.people}
                    />
                </form>
        </div>
    )
}

export default ReservationForm;