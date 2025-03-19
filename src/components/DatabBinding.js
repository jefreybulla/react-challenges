/** 
  Challenge: User should be able to type in any characters on input and those character should show in the browser.
  
**/

import { useState } from "react"
export default function DataBinding() {
    const [text, setText] = useState("")
    const handleChange = (event) => {
        const userText = event.target.value
        setText(userText)
    }
    return (
      <div>
        <input type="text" placeholder="Enter Text" onChange={(event) => handleChange(event)} />
        <p>{text}</p>
      </div>
    )
}