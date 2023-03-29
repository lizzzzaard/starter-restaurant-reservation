const knex = require("../db/connection");

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id })
        .first();
}

function listAllTablesByName() {
    return knex("tables")
        .select("*")
        .orderBy("table_name")
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdTables) => createdTables[0])
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id})
        .update(updatedTable, "*")
        .then((updatedTable) => updatedTable[0])
}

function finish(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id})
        .update(updatedTable, "*")
        .then((updatedTable) => updatedTable[0])
}

module.exports = {
    create,
    listAllTablesByName,
    read,
    update,
    finish,
}