import React from "react";

function ListReservations({ reservations }) {

    return (
        <div>
            {reservations.map((reservation) => {
                return (
                    <div>
                        <div>{`${reservation.first_name}`}</div>
                        <div>{`${reservation.last_name}`}</div>
                        <div>{`${reservation.mobile_number}`}</div>
                        <div>{`${reservation.reservation_date}`}</div>
                        <div>{`${reservation.reservation_time}`}</div>
                        <div>{`${reservation.people}`}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListReservations;