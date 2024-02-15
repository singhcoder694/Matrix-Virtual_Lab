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
    const [error, setError]=useState(false);
    const [dim1, setDim1]= useState(0);
    const [dim2, setDim2]= useState(0);
    const [tsp, setTsp]=useState(false);
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
        let rows = inputValue.split('\n'); // Split the string into rows
        let numberArray = rows.map(row => row.split(/\s+/).filter(Boolean).map(Number));
        console.log(numberArray);
        let r=0;
        let c=0;
        r=numberArray.length;
        c=numberArray[0].length;
        // https://matrix-calculator-backend.onrender.com
        const response= await fetch(`https://matrix-calculator-backend.onrender.com/${e.target.value.slice(-3)}`, {
            method:"POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify(newJoke)
        })
        if (response.status === 200) {
            const ans = await response.json();
            // console.log(r,c);
            if (ans[0]==="M"){
                setError(true);
            }
            else{
                setError(false);
            }
            if (e.target.value.slice(-3)==="tsp"){
                setTsp(true);
                setDim1(r);
                setDim2(c);
                setAnswer(ans);
            }
            else{
                setDim1(r);
                setDim2(c);
                setAnswer(ans);
                setTsp(false);
            }
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
        if (count===1){
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
            {input?<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix {props.name}</p>:<div className="input_box_heading"><p style={{textAlign:"center", fontSize:"clamp(1vw,20px,8vw)", fontWeight:"bold", color:"white", padding:"0px", margin:"0px"}}>Matrix {props.name}:{count}x{count}</p><p style={{textAlign:"center", fontSize:"clamp(1vw,15px,8vw)", fontWeight:"bold", color:"white", padding:"0px", margin:"5px", marginBottom:"20px"}}>(only for Square Matrices)</p></div>}
            {input?<TextArea transpose={tsp} row={dim1} col={dim2} error={error} cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange} className="input_area"/>:<InputBox error={error} row={dim1} col={dim2} cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange}/>}
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
