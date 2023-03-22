import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";

function TablesNew() {
    const history = useHistory();

    const initialTableState = {
        table_name: "",
        capacity: "",
    }

    const [table, setTable] = useState({...initialTableState});
    const [error, setError] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();

        async function createNewTable() {
            try {
                const newTable = await createTable({...table, capacity: Number(table.capacity)});
                setTable({...initialTableState});
                history.push(`/dashboard`)
            }
            catch (error) {
                setError([error])
            }
        }
        createNewTable();

    }

    function changeHandler({ target }){
        setTable({
            ...table,
            [target.name]: target.value,
        })
    }

    return (
        <div>
            <h1>Create a New Table</h1>
            <form>
                <label>Table Name</label>
                    <input 
                        id="table_name"
                        name="table_name"
                        type="text"
                        placeholder="Table Name"
                        onChange={changeHandler}
                        value={table.table_name}
                        required
                    />
                <label>Capacity</label>
                    <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        placeholder="Party Size"
                        onChange={changeHandler}
                        value={table.capacity}
                        required 
                    />
                <button type="submit" onClick={handleSubmit}>Submit</button>
                <button type="button" onClick={() => history.goBack()}>Cancel</button>
            </form>
        </div>
    )
}

export default TablesNew;