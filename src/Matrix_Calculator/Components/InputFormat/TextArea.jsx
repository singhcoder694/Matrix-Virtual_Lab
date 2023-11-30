import React from "react"
import "./textArea.css"
function TextArea(){
    return (
        <div className="input">
            <textarea wrap="off" spellCheck="false" autoCapitalize="off" autoComplete="off" className="input_area" placeholder="1  2 3&#10;4 -5 6&#10;7 -1 2/3" required></textarea>
        </div>
    )
}
export default TextArea;