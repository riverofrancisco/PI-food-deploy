import React from "react";
import './AuthorLink.css';

export default function Author(){
    
    return (
        <div >
            <a href="https://www.linkedin.com/in/rivero-francisco/">
                <img className="logoAuthor" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt='in' /> 
            </a>
            <a href="https://franciscorivero-portfolio.vercel.app/">
                <img className="logoAuthor" src="https://franciscorivero-portfolio.vercel.app/static/media/LOGO.9ac52e9611515aaa605f.png" alt='in' /> 
            </a>
        </div>
    );
}