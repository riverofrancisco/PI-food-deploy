import React from "react";
import logo from "../data/Logo_Cuadrado.png";
import './AuthorLink.css';

export default function Author(){
    
    return (
        <div >
            <a href="https://www.linkedin.com/in/rivero-francisco/">
                <img className="logoAuthor" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt='in' /> 
            </a>
            <a href="https://frivero.com.ar/">
                <img className="logoAuthor" src={`${logo}`} alt='in' /> 
            </a>
        </div>
    );
}