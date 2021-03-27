import axios from 'axios';
import React from "react";
import Ticket from "./components/Ticket.js";
import "./App.css";

function App() {
  let cancelToken;
  const [tickets, setTickets] = React.useState([]);

  React.useEffect( () => {
    axios.get(`/api/tickets`).then(res => {setTickets(res.data)})
  }, []);

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;

    if (typeof cancelToken != typeof undefined) 
      cancelToken.cancel("Operation canceled due to new request.");

    cancelToken = axios.CancelToken.source();

    try {
      const results = await axios.get(`/api/tickets?searchText=${searchTerm}`,{ cancelToken: cancelToken.token });
      setTickets(results.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input id="searchInput" type="text" placeholder="Search" onChange={handleSearchChange} />
      <div className="tickets">
        { tickets.map(ticket => <Ticket key={ticket._id} ticket={ticket} />)}
      </div>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <Search />
//       <Tickets />
//     </div>
//   );
// }

export default App;
