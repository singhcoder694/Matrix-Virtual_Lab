import React, { useEffect } from "react"
import { useState } from "react";
import {BiSolidRightArrow,BiSolidDownArrow} from "react-icons/bi";
import "./style.css"
function Footer(props){
    // const [isArrowDown, setIsArrowDown] = useState(false);
    // const [isActive, setActive]=useState(false);
    // const toggle = (e) => {
    //     e.stopPropagation();
    //     setIsArrowDown((prevState) => !prevState);
    //     setActive(!isActive);
    // };
    const [arr, setArr]=useState([]);
    useEffect(()=>{
        let arr2=[];
        props.reference.forEach(()=>{
            arr2.push(false);
        })
        setArr(arr2);
    },[])
    const [isArrowDown2, setIsArrowDown2] = useState(Array(props.reference.length).fill(false));
const [isActive2, setActive2] = useState(Array(props.reference.length).fill(false));
    const toggle2 = (index) => {
        setIsArrowDown2((prevIsArrowDown2) => {
            const updatedIsArrowDown2 = [...prevIsArrowDown2];
            updatedIsArrowDown2[index] = !prevIsArrowDown2[index];
            return updatedIsArrowDown2;
        });
        
        setActive2((prevIsActive2) => {
            const updatedIsActive2 = [...prevIsActive2];
            updatedIsActive2[index] = !prevIsActive2[index];
            return updatedIsActive2;
        });
    };
    // const toggleClass=()=>{
    // }
    return (
        <div className="footer">
            <h1 style={{textAlign:"center", textDecoration:"underline" , color:"white"}}>REFERENCES</h1>
            {props.reference.map((oper, index) =>(
                <div>
                    <p onClick={()=>toggle2(index)} key={index} className="mathematical_expr" style={{margin:"30px"}} value="hel">{isArrowDown2[index] ? (<BiSolidDownArrow className="arrow" />) : (<BiSolidRightArrow className="arrow" />)}{oper[0]}</p>
                    <img key={index+100} className={isActive2[index]? 'show' : 'notshow show'} src={process.env.PUBLIC_URL + oper[1]}></img>
                </div>
            ))}
            
        </div>
    )
}
export default Footer;