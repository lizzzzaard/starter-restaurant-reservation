import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTables, updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../reservations/ListReservations";
import DashboardButtons from "./DashboardButtons";
import ListTables from "../tables/ListTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
  
    return () => abortController.abort();
  }
  
  async function handleFinish(table_id){
    const abortController = new AbortController();
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      await finishTables(table_id, abortController.signal)
      loadDashboard();
    }
    return () => abortController.abort();
  }

  async function cancelHandler(reservation_id) {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
      await updateReservationStatus(reservation_id, "cancelled")
      loadDashboard();
      }
  }

  return (
    <main className="container text-center">
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <DashboardButtons date={date} />
      <ErrorAlert error={reservationsError}/>
      <div>
        <ListReservations reservations={reservations} cancelHandler={cancelHandler}/>
      </div>
      <ListTables handleFinish={handleFinish} tables={tables}/>
    </main>
  );
}

export default Dashboard;
