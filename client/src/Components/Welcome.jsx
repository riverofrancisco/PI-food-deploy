import {React, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Welcome.css';

export default function Welcomepage(){
    
    return (
        <div className='container'>

            <div className="content">
            
            <h1 className='WelcomeTitle'>Food API</h1>

            <Link to='/home'>
            <button className="button">
             Home
            </button>
            </Link>
            
          </div>

        </div>
    );
}