import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Done(props) {
  const [done, setState] = useState(props.done);

  let buttonText;
  let className;
  done ? buttonText = '// UNDO': buttonText = '// DONE';
  done ? className = 'doneButton red' : className = 'doneButton';

  function handleClick() {
    axios.patch(`/api/tickets/${props.ticketId}/${done ? 'undone': 'done'}`)
    .then(res => setState(!done))
  }

  return (
      <button className={className} onClick={() => handleClick()}>
        {buttonText}
      </button>
  );
}