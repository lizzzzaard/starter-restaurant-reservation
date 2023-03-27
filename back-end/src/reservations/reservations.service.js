const knex = require("../db/connection");

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

function listReservationsByDate(date) {
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .whereNot({"status": "finished"})
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
        .then((createdReservations) => createdReservations[0])
}

function updateReservationStatus(reservation_id, status) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status: status }, "*")
        .then((updatedReservation) => updatedReservation[0]);
}

module.exports = {
    create,
    listReservationsByDate,
    listAllReservations,
    read,
    updateReservationStatus,
}