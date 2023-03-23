import React from "react";

function SeatForm({ changeHandler, tables, tableId }) {
    return (
        <div>
            <form>
                <fieldset>
                    <select
                        id="table_id"
                        name="table_id"
                        onChange={changeHandler}
                        value={tableId}
                        required
                    >
                        <option value="">--Select a Table--</option>
                        {tables.map((table) => (
                            <option value={table.table_id} key={table.table_id}>{table.table_name} - {table.capacity}</option>
                        ))}
                    </select>
                </fieldset>
            </form>
        </div>
    )
}

export default SeatForm;