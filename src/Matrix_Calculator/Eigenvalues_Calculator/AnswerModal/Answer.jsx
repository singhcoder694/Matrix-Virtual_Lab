import React, { useEffect, useState } from 'react'
function perSquare(num) {
    // Check if the square root is an integer
    const squareRoot = Math.sqrt(num);
    return squareRoot === Math.floor(squareRoot);
}
function Answer_Matrix(array,size){
    var boxes = [];
    // console.log(array,size);
    if (size==1){
        boxes.push(<input className="box answer_box" key={1} value={array}></input>);
        return boxes;
    }
    else if (perSquare(array.length)){
        for (let i = 0; i < size*size; i++) {
            boxes.push(<input className="box answer_box" key={i} value={array[i]}></input>);
        }
    }
    else{
        for (let i = 0; i < size; i++) {
            boxes.push(<input className="box answer_box" key={i} value={array[i]}></input>);
        }
    }
    return boxes;
}
function valid_array(array){
   for (let i=0;i<(array.length);i++){
        if (array[i].length===0){
            return false;
        }
   }
    return true;
}
function Answer(props) {
    const {closeModal, input, answer}= props;
    const [array,setArray]=useState([]);
    console.log(input);
    useEffect(()=>{
        const resultArray = input.trim().split(/\s+/).map(Number);
        setArray([...resultArray])
    },[])
    const size=Math.sqrt(array.length);
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return ()=>{
            document.body.style.overflowY="scroll";
        }
    })
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, fit-content(1000px))`, // Adjust the box width as needed
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
    <>
        
        {
            valid_array(array) && <div className='modal_background' onClick={closeModal}>
                <div className="modal">
                    <p className='head'>{props.operation}</p>
                    <div className='answer'>
                        <div className='ques_matrix' style={gridStyle}>
                            {Answer_Matrix(array,size)}
                        </div>
                        <div className='equal_sign'>=</div>
                        <div className='ques_matrix' style={gridStyle}>
                            {Answer_Matrix(answer[0]?answer[0]:answer,answer[0]?size:1)}
                        </div>
                    </div>
                    <button onClick={closeModal}>OK</button>
                </div>
            </div>
        }
        {
            !valid_array(array) && <div className='modal_background' onClick={closeModal}>
                <div className="modal">
                    <p className='head' style={{color:"red"}}>ERROR</p>
                    <div className='error'>
                        <strong>Invalid Input!</strong><br></br> Please enter a matrix of size <strong>n x n</strong> containing only <strong>rational numbers</strong>.
                    </div>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        }

    </>
  )
}

export default Answer
