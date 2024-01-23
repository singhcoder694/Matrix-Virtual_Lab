import React, {useState, useEffect} from 'react'

function Answer_Matrix(array,row,col){
    var boxes = [];
    let j=0;
    let temp=0;
    for (let i = 0; i < row; i++) {
        boxes.push(<input className="box answer_box" key={i} value={array[i+temp]}></input>);
        if (i===(row-1)){
            i=-1;
            j+=1;
            temp+=col
        }
        if (j===col){
            break;
        }
    }
    return boxes;
}
function Answer(props) {
    const {closeModal, inputValue, inputValue2, answer}= props;
    const {error}= props;
    const [array,setArray]=useState([]);
    const [array2,setArray2]=useState([]);
    const [sign,setSign]=useState("");
    useEffect(()=>{
        const resultArray = inputValue.trim().split(/\s+/).map(Number);
        const resultArray2 = inputValue2.trim().split(/\s+/).map(Number);
        if (props.operation==="Multiplication "){
            setSign("x");
        }
        if (props.operation==="Addition "){
            setSign("+");
        }
        if (props.operation==="Subtraction "){
            setSign("-");
        }
        if (props.operation==="Division "){
            setSign("÷");
        }
        setArray([...resultArray])
        setArray2([...resultArray2])
    },[])
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return ()=>{
            document.body.style.overflowY="scroll";
        }
    })
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${props.col}, fit-content(1000px))`, // Adjust the box width as needed
        gridGap: '2px', // Adjust the gap between boxes as needed
        placeItems: 'center center',
        margin: 'auto auto',
        padding:"5px 5px",
        border:"1px solid white",
        borderRadius:"0px",
        borderTop:"none",
        borderBottom:"none",
    };
  return (
    <div>
        <>
        {
            !error && <div className='modal_background' onClick={closeModal}>
                <div className="modal">
                    <p className='head'>{props.operation}</p>
                    <div className='answer'>
                        <div className='ques_matrix' style={gridStyle}>
                            {Answer_Matrix(array,props.row,props.col)}
                        </div>
                        <div className='equal_sign'>{sign}</div>
                        <div className='ques_matrix' style={gridStyle}>
                            {Answer_Matrix(array2,props.row,props.col)}
                        </div>
                        <div className='equal_sign'>=</div>
                        <div className='ques_matrix' style={gridStyle}>
                            {Answer_Matrix(answer[0],props.row,props.col)}
                        </div>
                    </div>
                    <button onClick={closeModal}>OK</button>
                </div>
            </div>
        }
        {
            error && <div className='modal_background' onClick={closeModal}>
                <div className="modal">
                    <p className='head' style={{color:"red"}}>ERROR</p>
                    <div className='error'>
                        <strong>{answer}</strong>
                    </div>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        }

    </>
    </div>
  )
}

export default Answer
