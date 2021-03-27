import React from 'react';

export default class Ticket extends React.Component {
  render() {
    return (
      <div className="ticket">
        <h2>{this.props.ticket.title}</h2>
        { this.props.ticket.labels.map(label => <span key={label} className="label">{label}</span>)}
        <p className="content">{this.props.ticket.content}</p>
        <div className="footer">Created by {this.props.ticket.userEmail} at {new Date(this.props.ticket.creationTime).toISOString()} </div>
      </div>
    )
  }
}