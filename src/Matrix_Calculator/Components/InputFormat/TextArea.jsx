import React, { useEffect } from "react"
import { useState } from "react";
import Answer from "../Modals/Answer/Answer";
import "./textArea.css"
function TextArea(props){
    const {closeModal, onInputChange}= props;
    const [inputValue, setInputValue] = useState('');

  // Event handler to update the state when the textbox value changes
    const values = (event) => {
        setInputValue(event.target.value);
        onInputChange(event.target.value);
    };
    useEffect(()=>{
        setInputValue("")
    },[props.reset])
    return (
        <div className="input">
            <textarea onChange={values} value={inputValue} wrap="off" spellCheck="false" autoCapitalize="off" autoComplete="off" className="input_area" placeholder="1  2 3&#10;4 -5 6&#10;7 -1 2/3" required></textarea>
            {props.modal?<Answer error={props.error} evl={props.evl} lu={props.lu} chp={props.chp} svd={props.svd} evt={props.evt}  operation={props.operation} closeModal={closeModal} answer={props.answer} input={inputValue}/>:null}
        </div>
    )
}
export default TextArea;