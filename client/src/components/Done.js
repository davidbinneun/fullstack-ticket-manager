import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Done(props) {
  const [done, setState] = useState(props.done);

  let buttonText;
  done ? buttonText = 'Undo': buttonText = 'Mark as Done';

  function handleClick() {
    axios.patch(`/api/tickets/${props.ticketId}/${done ? 'undone': 'done'}`)
    .then(res => setState(!done))
  }

  return (
      <button onClick={() => handleClick()}>
        {buttonText}
      </button>
  );
}