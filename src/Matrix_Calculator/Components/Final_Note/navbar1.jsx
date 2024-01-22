import React from "react"
import { useState } from "react";
import {HiLanguage} from "react-icons/hi2"
import "./navbar1.css"
function Navbar1(){
    const [lang, setLang]=useState(false);
    function language(){
        setLang(!lang);
    }
    return (
        <div>
            <div className="NavBar">
                <h1 className="heading">Matrix Calculator</h1>
                <p onClick={language}><HiLanguage /></p>
            </div>
            <ul className={lang?"show_lang language_list":"language_list hide_lang"} onClick={language}>
                <li>English(UK)</li>
                <li>French</li>
                <li>Chinese</li>
                <li>Hindi</li>
                <li>Malyalam</li>
                <li>Kannad</li>
                <li>English(US)</li>
                <li>Japanese</li>
                <li>Urdu</li>
                <li>Spanish</li>
                <li>Italy</li>
                <li>Arab</li>
            </ul>
            <hr style={{marginBottom:0}}/>
        </div>
    )
}
export default Navbar1;