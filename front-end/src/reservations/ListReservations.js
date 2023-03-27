import React from "react";

function ListReservations({ reservations }) {

    return (
        <div>
            {reservations.map((reservation) => {
                return (
                    <div key={reservation.reservation_id}>
                        <div>First Name: {`${reservation.first_name}`}</div>
                        <div>Last Name: {`${reservation.last_name}`}</div>
                        <div>Phone Number: {`${reservation.mobile_number}`}</div>
                        <div>Reservation Date: {`${reservation.reservation_date}`}</div>
                        <div>Reservation Time: {`${reservation.reservation_time}`}</div>
                        <div>Party Size: {`${reservation.people}`}</div>
                        <div data-reservation-id-status={reservation.reservation_id}>Status: {`${reservation.status}`}</div>
                    {reservation.status === "booked" &&
                    <a href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
                    }
                    </div>
                )
            })}
        </div>
    )
}

export default ListReservations;