import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { findRecipeByTitle } from "../actions/actions";

import './SearchBar.css'

export default function SearchBar () {

  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes)

 return (
    <form className="searchBar"  onSubmit={(e) => {
        e.preventDefault();
        dispatch(findRecipeByTitle(title));
        console.log(recipes)        
      }}>
        <input className="inputSearch"
          type="text"
          placeholder="Recipe..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input className='buttonSearch' type="submit" value="Search" />
      </form>
 )
}