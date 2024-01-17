import React from "react"
import { useState } from "react";
// import {FaDonate} from "react-icons/fa";
// import {BiSolidRightArrow,BiLogoFacebookCircle,BiSolidDownArrow,BiLogoDiscordAlt,BiShareAlt,BiLogoTwitter} from "react-icons/bi";
// import {MdOutlineAddToQueue} from "react-icons/md"
import "./style.css"
function Footer(){
    const [isArrowDown, setIsArrowDown] = useState(false);
    const [isActive, setActive]=useState(false);
    const toggle = (e) => {
        e.stopPropagation();
        setIsArrowDown((prevState) => !prevState);
        setActive(!isActive);
    };
    const [isArrowDown2, setIsArrowDown2] = useState(false);
    const [isActive2, setActive2]=useState(false);
    const toggle2 = (e) => {
        e.stopPropagation();
        setIsArrowDown2(!isArrowDown2);
        setActive2(!isActive2);
    };
    // const toggleClass=()=>{
    // }
    return (
        <div className="footer">
            {/* <ul>
                <li>Leave extra cells empty to enter non-square matrices.</li>
                <li className="mathematical_expr" onClick={toggle}>{isArrowDown ? (<BiSolidDownArrow className="arrow" />) : (<BiSolidRightArrow className="arrow" />)} You can use decimal fractions or mathematical expressions:
                </li>
                <ul className={isActive? 'show' : 'notshow show'}>
                        <li>decimal (finite and periodic) fractions:<br/>
                        <strong style={{color:"black"}}>1/3</strong>, 3.14, -1.3(56), or 1.2e-4</li>
                        <li>mathematical expressions:
                        2/3+3*(10-4), (1+x)/y^2, 2^0.5 (=sqrt(2)), 2^(1/3), 2^n, sin(phi), cos(3.142rad), a_1, or (root of x^5-x-1 near 1.2)</li>
                        <li>matrix literals:
                        &#123;&#123;1,3&#125;,&#123;4,5&#125;&#125;</li>
                        <li>functions:<br/>
                        sqrt, cbrt, exp, log, abs, conjugate, arg, min, max, gcd, rank, adjugate, inverse, determinant, transpose, pseudoinverse, cos, sin, tan, cot, cosh, sinh, tanh, coth, arccos, arcsin, arctan, arccot, arcosh, arsinh, artanh, arcoth, derivative, factor, and resultant</li>
                        <li>units:
                        rad, deg</li>
                        <li>operators:
                        +, -, *, /, \, !, ^, ^&#123;*&#125;, ,, ;, ≠, =, ⩾, ⩽, &#62;, and &#60;</li>
                        <li>Special Symbols:
                            <ul>
                                <li>pi, e, i — mathematical constants</li>
                                <li>k, n — integers</li>
                                <li>I or E — identity matrix</li>
                                <li>X, Y — matrix symbols</li>
                            </ul>
                            </li>
                    </ul>
                <li>Use Enter, Space, ←, 
 ↑, 
 ↓, →, Backspace and Delete to navigate between cells, Ctrl+C / Ctrl+V to copy / paste matrices respectively.</li>
                <li><a href="https://en.wikipedia.org/wiki/Drag_and_drop" className="wiki_link" target="_blank">Drag-and-drop</a> matrices from the results, or even from / to a text editor.</li>
                <li>To learn more about matrices use <a href="https://en.wikipedia.org/wiki/Matrix_(mathematics)" className="wiki_link" target="_blank">Wikipedia.</a></li>
            </ul> */}
            {/* <hr></hr> */}
            {/* <div className="mail">
                <a href="mailto:matri-tri-ca@yandex.ru" className="mail_id">matri-tri-ca@yandex.ru</a>
                <button><a href="https://www.paypal.com/donate/?hosted_button_id=AX5FEG5UK5WEG" target="_blank"><FaDonate/> Support</a></button>
            </div> */}
            {/* <div className="contacts">
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmatrixcalc.org%2F" target="_blank" className="contact_link fb"><BiLogoFacebookCircle/></a>
                <a href="https://twitter.com/" target="_blank" className="contact_link twi"><BiLogoTwitter/></a>
                <a href="https://discord.com/" target="_blank" className="contact_link dis" ><BiLogoDiscordAlt/></a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmatrixcalc.org%2F" target="_blank" className="contact_link share"><BiShareAlt/></a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmatrixcalc.org%2F" target="_blank" className="contact_link home_screen"><MdOutlineAddToQueue/></a>
            </div> */}
            {/* <hr></hr> */}
            {/* <p onClick={toggle2} className="mathematical_expr" style={{marginTop:"0px"}}>{isArrowDown2 ? (<BiSolidDownArrow className="arrow" />) : (<BiSolidRightArrow className="arrow" />)}Thanks to:</p>
            <ul className={isActive2? 'show' : 'notshow show'}>
                <li>Philip Petrov <a href="https://www.cphpvb.net/" className="wiki_link" target="_blank">(https://cphpvb.net)</a> for Bulgarian translation.</li>
                <li>Manuel Rial Costa for Galego translation.</li>
                <li>Shio Kun for Chinese translation.</li>
                <li><a href="https://im-pmf-en.weebly.com/petar-sokoloski.html" className="wiki_link" target="_blank">Petar Sokoloski</a> for Macedonian translation.</li>
                <li>Duy Thúc Trần for Vietnamese translation.</li>
                <li><a href="https://twitter.com/RKursatV" className="wiki_link" target="_blank">Rıfkı Kürşat Vuruşan</a> for Turkish translation.</li>
                <li>Ousama Malouf and Yaseen Ibrahim for Arabic translation.</li>
                <li><a href="https://marcel-artz.de/" className="wiki_link" target="_blank">Marcel Artz</a> - improving of the German translation.</li>
                <li><a href="https://www.matricesydeterminantes.com/" className="wiki_link" target="_blank">Marc Gisbert Juàrez</a> - fixing the translation into Catalan.</li>
            </ul> */}
        </div>
    )
}
export default Footer;