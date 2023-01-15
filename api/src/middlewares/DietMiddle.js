const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Recipe, Diet } = require('../db');
const {
    MY_APIKEY, MY_APIKEY_2, MY_APIKEY_3, MY_APIKEY_4, MY_APIKEY_5, MY_APIKEY_6, API_PATH
  } = process.env;

 let diets = [];

 async function APIdiets(){

        const response = await fetch(`${API_PATH}/complexSearch?apiKey=${MY_APIKEY}&number=100&addRecipeInformation=true`);
        const data = await response.json();
        const apidiets = data.results.map(r => r.diets);
        apidiets.forEach(element => {
          element.forEach(e => diets.push(e))
        });
        
        const ExistingDiets = diets.filter((diet, index) => {
          return diets.indexOf(diet) === index;
        }
      );  
  
      console.log('EXdiets ↓')
      console.log(ExistingDiets)
      
      const AZdiets = ExistingDiets.sort()
      
      for(let i = 0; i < AZdiets.length; i++){
        const dieta = await Diet.findOrCreate({
          where: {
            name: AZdiets[i]
          }
        })
      };
  
      const DBdietsOBJ = await Diet.findAll({
        attributes: ['name']
      });
      
/*       console.log('Chequeando DB ↓')
      console.log(DBdietsOBJ) */
      const DBdietsARRAY = DBdietsOBJ.map((obj) => obj.name);
      return DBdietsARRAY

}

module.exports = {
  APIdiets
}