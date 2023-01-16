import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';

import Cards from './Components/Cards.jsx';
import Welcomepage from './Components/Welcome';
import Navbar from './Components/NavBar';
import Diets from './Components/Diets';
import RecipeDetail from './Components/RecipeDetail'
import Form from './Components/Form';
import Reparation from './Components/Inreparation';
import { useDispatch, useSelector } from "react-redux";


function App() {



  return (
        <div className="App">
        <Route 
          exact path = '/' 
          component={Welcomepage} 
          />

          <Route 
          exact path = '/home' 
          component={Cards}
          />
          
          <Route 
          path = '/home/recipedetail/:id'
          component={RecipeDetail}
          />

          <Route 
          path = '/home/creationform'
          component={Form}
          />
    </div>
  );
}

export default App;
