import React from "react";

function ListTables({ tables }) {

    return (
        <div>
            {tables.map((table)=> {
                if (table.reservation_id === null) {
                    return (
                        <div>
                            <div>Table Name: {`${table.table_name}`}</div>
                            <div>Capicity: {`${table.capacity}`}</div>
                            <div data-table-id-status={`${table.table_id}`} >Availability: Free</div>
                        </div>
                    )
                }
                return (
                    <div>
                        <div>Table Name: {`${table.table_name}`}</div>
                        <div>Capicity: {`${table.capacity}`}</div>
                        <div data-table-id-status={`${table.table_id}`}>Availability: Occupied</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListTables;