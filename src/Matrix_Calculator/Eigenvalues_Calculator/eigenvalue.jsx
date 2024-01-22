import {React,useState} from "react"
import Navbar1 from "../Components/Final_Note/navbar1";
import Navbar from "../Components/Final_Note/navbar";
import Footer from "../Components/Final_Note/Footer";
import "../Components/style.css"
import "./eigenvalue.css"
import TextArea from "../Components/InputFormat/TextArea";
import InputBox from "../Components/InputFormat/inputBoxes";
function Eigenvalues(props){
    const [modal,setModal]=useState(false);
    const [clr,setClr]=useState(false);
    const [count,setCount]=useState(3);
    const [isTick,setTick]=useState(true);
    const [input,setInput]=useState(true);
    const [inputValue, setInputValue] = useState('');
    const [operation, setOperation]=useState('');
    const [answer, setAnswer]=useState([]);
    const handleInputChange = (value) => {
        setInputValue(value);
    };
    const handleButtonClick = async (e) => {
        const newJoke = {
            text:inputValue,
        };
        const response= await fetch("http://localhost:8000/evl", {
            method:"POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify(newJoke)
        })
        if (response.status === 200) {
            const ans = await response.json();
            console.log(ans);
            setAnswer(ans);
            setModal(true);
            setOperation(e.target.value);
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
    function tick(){
        setTick(!isTick);
    }
    const closeModal= ()=>{
        setModal(false);
    } 
    return (
        <div>
            <Navbar1 />
            <div class="eigenvalue_calculator">
                <Navbar />
                <div className="eigen_calc">
                    <p className="eigen_heading">Finding of eigenvalues and eigenvectors</p>
                    <p className="eigen_details">This calculator allows to find <a href="https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors" target="_blank">eigenvalues and eigenvectors</a> using the <a href="https://en.wikipedia.org/wiki/Characteristic_polynomial" target="_blank">Characteristic polynomial</a>.</p>
                    <div className="matrix">
                        {input?<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A:</p>:<p style={{textAlign:"center", fontSize:"20px", fontWeight:"bold", color:"white"}}>Matrix A:{count}x{count}</p>}
                        {input?<TextArea cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange} className="input_area"/>:<InputBox cnt={count} reset={clr} modal={modal} closeModal={closeModal} operation={operation} answer={answer} onInputChange={handleInputChange}/>}
                        <div className="Buttons" style={{justifyContent:"center", marginTop:"10px"}}>
                            <button onClick={Opt}>{input?"Cell":"Box"}</button>
                            <button onClick={clear}>Clear</button>
                            {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none" }} onClick={inc} disabled>+</button>:<button style={{fontSize:"20px"}} onClick={inc}>+</button>}
                            {input?<button style={{fontSize:"20px", color:"black", background:"grey", cursor:"none"}} onClick={dec} disabled>-</button>:<button style={{fontSize:"20px"}} onClick={dec}>-</button>}
                            <button className="find_eigen" onClick={handleButtonClick}>FIND</button>
                        </div>
                    </div>
                    <fieldset>
                        <legend>More:</legend>
                        <div className="more_options_eigen">
                            <button>Diagonal Matrix</button>
                            <button>Jordan Decomposition</button>
                            <button>Matrix Exponential</button>
                            <button>Singular Value Decomposition</button>
                        </div>
                    </fieldset>
                    {/* <div className="display_decimals">
                    <div>
                        <input onClick={tick} type="checkbox" id="display_decimal" value="Display Decimal" />
                        <label for="display_decimal">Display Decimal</label>
                        <div className={isTick?"digit_unshow":"digit_show"}>
                            <select name="digits" id="digits">
                                <option>Number of Significant digits:</option>
                                <option>Number of Fraction digits:</option>
                            </select>
                            <input type="number" min="1" step="1" placeholder="3" id="value_digits"></input>
                        </div>
                    </div>
                    <div>
                        <button>Clean</button>
                        <button>+</button>
                    </div>
                    </div> */}
                    <hr></hr>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default Eigenvalues;