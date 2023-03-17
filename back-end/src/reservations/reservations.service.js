const knex = require("../db/connection");

function listReservationsByDate(date) {
    console.log(date)
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .orderBy("reservation_time")
}

function listAllReservations() {
    return knex("reservations")
        .select("*")
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecods) => createdRecods[0])
}

module.exports = {
    create,
    listReservationsByDate,
    listAllReservations,
}