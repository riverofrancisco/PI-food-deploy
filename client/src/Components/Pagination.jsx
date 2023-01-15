import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import './Pagination.css'


export default function Pagination({recipesPerPage, totalRecipes, paginate}) {
    
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++){
        pageNumbers.push(i)
    }

    const currentNumber = useSelector((state) => state.currentPage);
    console.log('Page: ' + currentNumber);

    const previousPage = () => {
        if(currentNumber > 1) {
            paginate(currentNumber-1)
        }
    }

    const nextPage = () => {
        if(currentNumber < pageNumbers.length){
            paginate(currentNumber+1)
        }
    }

 
    return (
        <nav className="paginationBar">
            <ul className="listofpages">
                <li>
                    <a className="pageNumber" onClick={()=> previousPage()}>{'<<'}</a>
                </li>
                {pageNumbers.map((number, i) => {return(
                    <li key={number}>
                        <a id={i+1} className={number === currentNumber ? 'pageNumber-active' : 'pageNumber'} onClick={() => paginate(number)}>{number}</a>
                    </li>
                )})}
                <li>
                    <a className="pageNumber" onClick={()=> nextPage()} >{'>>'}</a>
                </li>
            </ul>
        </nav>
    )
}