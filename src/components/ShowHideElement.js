/**
  Challenge: Make the button functional
  A click on button should toggle (show/hide) the string `Toggle Challenge` each time it is pressed

**/

import { useState } from "react";
export default function ShowHideElement() {
  const [ visibility, setVisibility ] = useState('true')

  const handleClick = () =>{
    console.log('you clicked')
    setVisibility(!visibility)
  }

  return (
    <>
      <button onClick={ handleClick }>Hide Element Below</button>
      { visibility && <div>Toggle Challenge</div>}
    </>
  );
}