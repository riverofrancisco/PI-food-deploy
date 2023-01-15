import {React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets, setCurrentPage } from "../actions/actions";
import Card from "./Card";
import './Cards.css';
import Navbar from "./NavBar";
import Pagination from "./Pagination";
import Loading from "./LoadingPage";


export default function Cards(){

  //// STATES ///////////    
  
  
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  const dispatch = useDispatch(); 
  const [, setOrder] = useState(''); 
  
  useEffect(() => {
      console.log('Renderizando Recipes')
      if(allRecipes.length === 0){
            dispatch(getRecipes());
            dispatch(getDiets());
      }
  }, []);
  
  useEffect(()=> {
      dispatch(setCurrentPage(1))
      console.log(allRecipes)
  }, [allRecipes])

  ///// PAGINATION /////////
  /* const [currentPage, setcurrentPage] = useState(1); */ // reemplazar esto por estado global.
  const [recipesPerPage] = useState(9);
  const currentPage = useSelector((state)=> state.currentPage)


  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));//con estado global debería reemplazarse por dispatch.

  //// LOADING ///////////
  if(allDiets.length === 0){
    return(
      <Loading />
  )
  }
  
  //// ERROR WITH SEARCH ///////////
  if(typeof allRecipes[0] === 'string'){
      return(
            <div>

                  <div className="navBar">
                        <Navbar 
                        setOrder={setOrder} />
                  </div>  
            
            <div className="contentError">
                  <div>
                        <h3>
                        {allRecipes}
                        </h3>
                        
                  </div>

                  <button className="buttonReset" onClick={() => dispatch(getRecipes())}>Reset Search</button>
            </div>    
            </div>
      )
  }

  //// RENDER OF RECIPE CARDS ///////////
  return (    
        <div>
          
        <div className="navBar">
        <Navbar 
              setOrder={setOrder} />
        </div>  
        

        <div className = "cards">
        {currentRecipes.map((r) => {return (<Card
              key={r.id}
              id={r.id}
              title={r.title}
              healthScore={r.healthScore}
              summary={r.summary}
              image={r.image}
              diets={r.diets.join(', ')}
          />) })} 
        </div>
        
        <div>
        <Pagination 
              recipesPerPage={recipesPerPage} 
              totalRecipes={allRecipes.length}
              paginate={paginate} />
        </div>

        </div>
      );

}