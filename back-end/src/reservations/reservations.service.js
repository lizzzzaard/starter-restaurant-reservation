const knex = require("../db/connection");

function listReservationsByDate(date) {
    //show all reservation on the specific date
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .orderBy("reservation_time")
}

function listAllReservations() {
    return knex("reservations")
        .select("*")
}

module.exports = {
    listReservationsByDate,
    listAllReservations,
}