import {React, useState} from "react"
import "./determinant.css"
import Navbar1 from "../Components/Final_Note/navbar1";
import Navbar from "../Components/Final_Note/navbar";
import Footer from "../Components/Final_Note/Footer";
import TextArea from "../Components/InputFormat/TextArea";
import InputBox from "../Components/InputFormat/inputBoxes";
function Determinant(){
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
        <div>
            <Navbar1 />
            <div class="determinant_calculator">
                <Navbar />
                <div className="deter_calc">
                    <p className="deter_heading">Determinant calculation by expanding it on a line or a column, using Laplace's formula</p>
                    <p className="deter_details">This page allows to find the determinant of a matrix using <a href="https://web.archive.org/web/20200715112438/http://mathforum.org/library/drmath/view/51968.html" target="_blank" >row reduction</a>, <a href="https://en.wikipedia.org/wiki/Laplace_expansion" target="_blank">expansion by minors</a>, or <a href="https://en.wikipedia.org/wiki/Leibniz_formula_for_determinants" target="_blank">Leibniz formula</a>.</p>
                    <div className="matrix">
                        {input?<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A:</p>:<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A:{count}x{count}</p>}
                        {input?<TextArea className="input_area"/>:<InputBox cnt={count} reset={clr}/>}
                        <div className="Buttons" style={{justifyContent:"center", marginTop:"10px"}}>
                            <button onClick={Opt}>{input?"Cell":"Box"}</button>
                            <button onClick={clear}>Clear</button>
                            {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none" }} onClick={inc} disabled>+</button>:<button style={{fontSize:"20px"}} onClick={inc}>+</button>}
                            {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none"}} onClick={dec} disabled>-</button>:<button style={{fontSize:"20px"}} onClick={dec}>-</button>}
                        </div>
                        <div className="find_determinant">
                            <div className="method">
                                <label>Method:</label>
                                <select>
                                    <option>Expand along the column</option>
                                    <option>Expand along the row</option>
                                    <option>Get Zeros in column</option>
                                    <option>Get Zeros in row</option>
                                    <option>Use Gaussian Elimination</option>
                                    <option>Use Triangle's Law</option>
                                    <option>Use Rule of Sarrus</option>
                                    <option>Use Leibiniz Rule</option>
                                    <option>Use Montante's Methos(Bareiss Algorithm)</option>
                                </select>
                            </div>
                            <div className="column_no">
                                <label>Column Number:</label>
                                <input type="number"></input>
                            </div>
                            <button className="find_btn">Find</button>
                        </div>
                    </div>
                    <hr></hr>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default Determinant;