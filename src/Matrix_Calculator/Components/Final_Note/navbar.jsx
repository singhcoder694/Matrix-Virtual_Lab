import React from "react"
import "./navbar.css"
import { Link,useLocation } from "react-router-dom";
import {FaExternalLinkAlt} from "react-icons/fa"
function Navbar(){
    return (
        <div>
                <div className="sideBar">
                    <ul className="list">
                        <Link to="/" style={{textDecoration: 'none'}}><li id="first" className={useLocation().pathname=="/"?"page_link_css":null}>Matrix Calculator</li></Link>
                        <Link to="/system-of-equations"  style={{textDecoration: 'none'}}><li id="second" className={useLocation().pathname=="/system-of-equations"?"page_link_css":null}>System of Equations Calculator</li></Link>
                        {/* <Link to="/determinant_calculator" style={{textDecoration: 'none'}}><li id="third" className={useLocation().pathname=="/determinant_calculator"?"page_link_css":null}>Determinant Calculator</li></Link> */}
                        <Link to="/eigenvalue_calculator" style={{textDecoration: 'none'}} ><li id="fourth" className={useLocation().pathname=="/eigenvalue_calculator"?"page_link_css":null}>Eigenvalues Calculator</li></Link>
                        <a href="https://en.wikipedia.org/wiki/Matrix_(mathematics)" target="_blank" style={{textDecoration:"none"}}><li id="fifth">Wikipedia:Matrices <FaExternalLinkAlt/></li></a>
                    </ul>
                </div>
        </div>
    )
}
export default Navbar;