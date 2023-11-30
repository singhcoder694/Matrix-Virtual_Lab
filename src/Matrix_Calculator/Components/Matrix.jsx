import React, { useState } from "react"
import "./style.css"
import TextArea from "./InputFormat/TextArea";
import InputBox from "./InputFormat/inputBoxes";
function Matrix(props){
    const [clr,setClr]=useState(false);
    const [count,setCount]=useState(3);
    const [input,setInput]=useState(true);
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
        setCount(3);
        setClr(!clr);
    }
    return (
        <div className="matrix">
            {input?<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix {props.name}</p>:<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix {props.name}:{count}x{count}</p>}
            {input?<TextArea className="input_area"/>:<InputBox cnt={count} reset={clr}/>}
            <div className="Buttons">
                <button onClick={Opt}>{input?"Cell":"Box"}</button>
                <button onClick={clear}>Clear</button>
                {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none" }} onClick={inc} disabled>+</button>:<button style={{fontSize:"20px"}} onClick={inc}>+</button>}
                {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none"}} onClick={dec} disabled>-</button>:<button style={{fontSize:"20px"}} onClick={dec}>-</button>}
            </div>
            <div className="operations">
                <div className="part1">
                    <button>Determinant</button>
                    <button>Transpose</button>
                    <button>Multiply by</button>
                    <button>Diagonal Matrix</button>
                    <button>LU decomposition</button>
                </div>
                <div className="part2">
                    <button>Inverse</button>
                    <button>Rank</button>
                    <button>Row Echelon Form</button>
                    <button>Raise to the power of</button>
                    <button>Cholesky Decomposition</button>
                </div>
            </div>
        </div>
    )
}
export default Matrix;