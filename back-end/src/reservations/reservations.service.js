const knex = require("../db/connection");

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

function listReservationsByDate(date) {
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .whereNot({"status": "finished"})
        .orderBy("reservation_time")
}

//might not need this query
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

function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id})
        .update(updatedReservation, "*")
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
    search,
    read,
    update,
    updateReservationStatus,
}