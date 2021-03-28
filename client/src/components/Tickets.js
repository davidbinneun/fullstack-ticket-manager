import React from 'react';
import axios from 'axios';
import Ticket from "./Ticket.js";

export default class PersonList extends React.Component {
  state = {
    tickets: []
  }

  componentDidMount() {
    axios.get(`/api/tickets`)
      .then(res => {
        const tickets = res.data;
        this.setState({ tickets });
      })
  }

  render() {
    return (
      <div className="tickets">
        { this.state.tickets.map(ticket => <Ticket key={ticket._id} ticket={ticket} />)}
        <div id="spinner" className="show"></div> 
      </div>
    )
  }
}
