import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, getDiets, getRecipes, alphabeticOrder, healthScoreOrder } from '../actions/actions';


export default function Navbar({setOrder, paginate}){

    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);

    ///// ORDER BY TITLE OR HEALTHSCORE /////////

    const handleOrder = (e) => {
        if(e.target.value === 'az' || e.target.value === 'za'){
            dispatch(alphabeticOrder(e.target.value))
            setOrder(e.target.value);
        } else {
            dispatch(healthScoreOrder(e.target.value));
            setOrder(e.target.value)
        }
    }

    ///// FILTER BY DIET ////////
    const [filterDiets, setfilterDiets] = useState([]);
 
    const handleFilter = (e) => {
        if(e.target.value === 'ALL'){
            setfilterDiets([])
            dispatch(getRecipes())
        } else {
            setfilterDiets([...filterDiets, e.target.value])
            dispatch(filterByDiet(e.target.value))
        }
        
    }

    return (
       <div>
       <nav className='headerNavbar'>

            <Link style={{textDecoration: 'none'}} to ='/home'>
            <div className='buttonLink' onClick={() => window.location.reload()}>
                <label>Home Page</label>    
            </div>
            </Link>

            <div>
                
                <select  className='buttonLink' onChange={(e)=> handleOrder(e)}>
                    <option >Order By</option>
                    <option value='az'>Title A-Z</option>
                    <option value='za'>Title Z-A</option>
                    <option value='HSdes'>HealthScore ↓</option>
                    <option value='HSasc'>HealthScore ↑</option>
                </select>
            </div>
            
            <div >
                <select className='buttonLink' onChange={(e)=> handleFilter(e)}>
                    <option>Filter by Diet</option>
                    <option value='ALL'>Clear Filter</option>
                    {allDiets.map(d => {return (<option key={d} value={d} >{d}</option>)})}
                </select>
            </div>
            
            <Link style={{textDecoration: 'none'}} to ='/home/creationform'>
            <div className='buttonLink'>   
                Add your own recipe
            </div>
            </Link> 
            
            <div className='buttonLink'>
            <SearchBar
            />
            </div>  
        </nav>
        
        <div className='authorLink'>
             <Author/>
        </div>

        <div className='dietSelected'>
        {filterDiets.map(d => {return (<div className='diet' key={d}> {d}</div>)})}
        </div>
        
        </div>
    );
};