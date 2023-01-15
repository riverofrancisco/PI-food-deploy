import {React, useEffect} from 'react';
import './Card.css';

import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../actions/actions";

//// NOT IN USE //////////
export default function Diets(){


    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);

    useEffect(() => {
        dispatch(getDiets());
      }, [dispatch]);


    return (
        <div className='card'>
            <div className='card-body'>
                <ol>{allDiets?.map((diet) => {return (<li key={diet}>{diet}</li>)})}</ol>
            </div>       
       </div>
    );
};