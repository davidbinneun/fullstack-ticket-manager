import Done from "./Done.js";
import React, { useState } from 'react';

export default function Ticket(props) {
  const [show, setShow] = useState(true);
  if (!show && props.hiddenTickets !== 0) return null;

  function handleClick() {
    setShow(false);
    props.addHidden();
  }

  return (
    <div className="ticket">
      <div className="header">
      <h2>{props.ticket.title}</h2>
      <button className="hideTicketButton" onClick={() => {handleClick()}}>/Hide</button>
      </div>

      { props.ticket.labels && props.ticket.labels.map(label => <span key={label} className="label">{label}</span>)}
      <p className="content">{props.ticket.content}</p>

      <div className="interact">
      <span className="footer">Created by {props.ticket.userEmail} at {new Date(props.ticket.creationTime).toLocaleString('en-GB')} </span>
        <Done done={props.ticket.done} ticketId={props.ticket._id} />
      </div>
    </div>
  )
}