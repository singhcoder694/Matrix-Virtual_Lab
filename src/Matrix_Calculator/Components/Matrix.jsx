import React, { useState } from "react"
import "./style.css"
import TextArea from "./InputFormat/TextArea";
import InputBox from "./InputFormat/inputBoxes";

function Matrix(props){
    const {onInputChange}=props;
    const [modal,setModal]=useState(false);
    const [clr,setClr]=useState(false);
    const [count,setCount]=useState(3);
    const [input,setInput]=useState(true);
    const [inputValue, setInputValue] = useState('');
    const [operation, setOperation]=useState('');
    const [answer, setAnswer]=useState([]);
    // Callback function to update the input value
    const handleInputChange = (value) => {
        setInputValue(value);
        onInputChange(value);
    };
    // Function to do something with the input value (e.g., log it)
    const handleButtonClick = async (e) => {
        setOperation(e.target.value.slice(0,-3));
        const newJoke = {
            text:inputValue,
        };
        const response= await fetch(`http://localhost:8000/${e.target.value.slice(-3)}`, {
            method:"POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify(newJoke)
        })
        if (response.status === 200) {
            const ans = await response.json();
            setAnswer(ans);
            setModal(true);
        } else {
            console.error("Failed to add joke");
        }
    };
    function Opt(){
        setInput(!input);
    }
    function inc(){
        setCount(count+1);
    }
    function dec(){
        if (count==1){
            alert("Matrix of 0x0 is not valid.");
            return;
        }
        setCount(count-1);
    }
    function clear(){
        setClr(!clr);
    }
    const closeModal= ()=>{
        setModal(false);
    } 
    return (
        <div className="matrix">
            {input?<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix {props.name}</p>:<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix {props.name}:{count}x{count}</p>}
            {input?<TextArea cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange} className="input_area"/>:<InputBox cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange}/>}
            <div className="Buttons">
                <button onClick={Opt}>{input?"Cell":"Box"}</button>
                <button onClick={clear}>Clear</button>
                {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none" }} onClick={inc} disabled>+</button>:<button style={{fontSize:"20px"}} onClick={inc}>+</button>}
                {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none"}} onClick={dec} disabled>-</button>:<button style={{fontSize:"20px"}} onClick={dec}>-</button>}
            </div>
            <div className="operations">
                <div className="part1">
                    <button onClick={handleButtonClick} value="Determinant det">Determinant</button>
                    <button onClick={handleButtonClick} value="Transpose tsp">Transpose</button>
                    <button onClick={handleButtonClick} value="Adjoint adj">Adjoint</button>
                    <button onClick={handleButtonClick}  value="Cofactor cft">Cofactor</button>
                    <button onClick={handleButtonClick}  value="Minor mnr">Minor</button>
                </div>
                <div className="part2">
                    <button onClick={handleButtonClick} value="Inverse inv">Inverse</button>
                    <button onClick={handleButtonClick}  value="Diagonalise dig">Diagonalise</button>
                    <button onClick={handleButtonClick} value="Trace trc">Trace</button>
                    <button onClick={handleButtonClick} value="Row Echelon Form ref">Row Echelon Form</button>
                    <button onClick={handleButtonClick} value="Row Reduced Echelon Form rre">Row Reduced Echelon Form</button>
                    {/* <button onClick={handleButtonClick}  value="Cholesky Decomposition svd">Cholesky Decomposition</button>
                    <button onClick={handleButtonClick}  value="LU Decomposition lud">LU decomposition</button> */}
                </div>
            </div>
        </div>
    )
}
export default Matrix;