const initialState = {
    recipes: [],
    diets: [],
    recipe: {},
    currentPage: 1
};


const theReducer = (state = initialState, action) => {
    
    switch(action.type) {

        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload};
        case 'FIND_RECIPE_TITLE':
            return {
                ...state,
                recipes: action.payload};
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload};
        case 'ORDER_RECIPES_AZ':
            return {
                ...state,
                recipes: state.recipes.sort((x, y) => {
                    if(action.payload === 'az'){
                       return x.title.localeCompare(y.title)}
                    else {
                        return y.title.localeCompare(x.title)}})
                };
         case 'ORDER_RECIPES_HS':
            return {
                ...state,
                recipes: state.recipes.sort((a, b) => {
                    if(action.payload === 'HSasc'){
                       return a.healthScore - b.healthScore
                    } else {
                       return b.healthScore - a.healthScore}})                
                }; 
        case 'FILTER_BY_DIET':
            return {
                ...state,
                recipes: state.recipes.filter((recipe) => recipe.diets.join(' ').includes(action.payload))
                };
        case 'PAGINATE':
            return {
                ...state,
                currentPage: action.payload };
        case 'GET_RECIPE_DETAIL':
            return {
                ...state,
                recipe: action.payload };  
        case 'RESET_ID':
            return {
                ...state,
                recipe: action.payload };
        default:
            return {...state};
    }
    
};

export default theReducer;