
export const getRecipes = () => { 
    return (dispatch) => {
        fetch('http://localhost:3001/recipes').then(response => response.json())
        .then(data => {return dispatch({type: 'GET_RECIPES', payload: data})})
        .catch((e) => console.log('Error:', e));
    }
   } 

export const getRecipeDetail = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/recipes/${id}`).then(response => response.json())
    .then(data => {return dispatch({type: 'GET_RECIPE_DETAIL', payload: data})})
    .catch((e) => console.log('Error:', e));
  }
}

export const getDiets = () => { 
  return (dispatch) => {
    fetch('http://localhost:3001/diets').then(response => response.json())
    .then(data => {return dispatch({type: 'GET_DIETS', payload: data})})
    .catch((e) => console.log('Error:', e));
  }
}  

export const findRecipeByTitle = (title) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/recipes?name=${title}`).then(response => response.json())
    .then(data => {return dispatch({type: 'FIND_RECIPE_TITLE', payload: data})})
    .catch((e) => console.log('Error:', e));
  }
}

export const alphabeticOrder = (data) => {
  return {type: 'ORDER_RECIPES_AZ', payload: data}
}

export const healthScoreOrder = (data) => {
  return {type: 'ORDER_RECIPES_HS', payload: data}
}

export const filterByDiet = (data) => {
  return {type: 'FILTER_BY_DIET', payload: data}
}

export const setCurrentPage = (data) => {
  return {type: 'PAGINATE', payload: data}
}

export const resetRecipeId = () => {
  return {type: 'RESET_ID', payload: {}}
}