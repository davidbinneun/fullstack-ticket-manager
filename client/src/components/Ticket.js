import Done from "./Done.js";
import Hide from "./Hide.js";
import React, { useState, useEffect } from 'react';

export default function Ticket(props) {
  const [show, setShow] = useState(true);
  if (!show && props.hiddenTickets !== 0) return null;

  function handleClick() {
    setShow(false);
    props.addHidden();
  }

  return (
    <div className="ticket">
      <h2>{props.ticket.title}</h2>
      { props.ticket.labels && props.ticket.labels.map(label => <span key={label} className="label">{label}</span>)}
      <p className="content">{props.ticket.content}</p>
      <div className="footer">Created by {props.ticket.userEmail} at {new Date(props.ticket.creationTime).toISOString()} </div>
      <div>{props.ticket._id}</div>
      <Done done={props.ticket.done} ticketId={props.ticket._id} />
      <button className="hideTicketButton" onClick={() => {handleClick()}}>Hide</button>
    </div>
  )
}