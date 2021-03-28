import axios from 'axios';
import React from "react";
import Ticket from "./components/Ticket.js";
import "./App.css";

function App() {
  let cancelToken;
  const [tickets, setTickets] = React.useState([]);
  const [spinner, showSpinner] = React.useState(true);
  const [hiddenTickets, setHiddenTickets] = React.useState(0);

  React.useEffect( () => {
    axios.get(`/api/tickets`).then(res => {setTickets(res.data); showSpinner(false);})
  }, []);

  function addHidden(){
    setHiddenTickets(hiddenTickets + 1);
  }

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;

    if (typeof cancelToken != typeof undefined) 
      cancelToken.cancel("Operation canceled due to new request.");

    cancelToken = axios.CancelToken.source();

    try {
      let res = await axios.get(`/api/tickets?searchText=${searchTerm}`,{ cancelToken: cancelToken.token });
      setTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="main">
      <h1>// Ticket Manager</h1>
      <div className="search">
        <input autoComplete="off" id="searchInput" type="text" placeholder="Search" onChange={handleSearchChange} />
      </div>

      <div id="overview">
        <div>Showing {tickets.length - hiddenTickets} results </div>
        {hiddenTickets !== 0 && 
        <div><span id="hideTicketsCounter">{hiddenTickets}</span> <span>hidden ticket{hiddenTickets > 1 ? 's': ''} </span>  
        <button id="restoreHideTickets" onClick={() => setHiddenTickets(0)}>/Restore</button></div> }
      </div>

      <div className="tickets">
        { tickets.map(ticket => <Ticket key={ticket._id} ticket={ticket} addHidden={addHidden} hiddenTickets={hiddenTickets} />)}
      </div>
      {spinner && <div id="spinner"></div>}
    </div>
  );
}

export default App;
