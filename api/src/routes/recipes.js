const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { Allrecipes, OneRecipebyId } = require('../middlewares/RecipeMiddle')
const router = Router();
const {
    MY_APIKEY, MY_APIKEY_2, API_PATH
  } = process.env;

///POST ////
router.post('/', async (req, res) => {
    const {title, summary, healthScore, stepBYstep, image, diets} = req.body;

    try {
      if (!title || !summary) return res.status(404).send('Falta enviar datos obligatorios');
      const newRecipe = await Recipe.create({title, summary, healthScore, stepBYstep, image});
      
      if (diets) {
        for(let i = 0; i < diets.length; i++){
            const [newDiet, created] = await Diet.findOrCreate({
                where: {
                    name: diets[i]
                }});
            await newRecipe.addDiet(newDiet);
        }};

      const recipeCreated = await Recipe.findOne({
        where: { title: title },
        include: {
            model: Diet,
        }});
    
    console.log(recipeCreated.dataValues);
    console.log('La receta "' + recipeCreated.dataValues.title + '" se ha creado correctamente.');
    
    res.status(200).send('La receta "' + recipeCreated.dataValues.title + '" se ha creado correctamente.');
    } catch(e) {
      res.status(400).json({
        Tipo: 'Ha ocurrido un error',
        error: e
      });
    }
})

///CHEQUEO DB ////
router.get('/dbcontent', async (req, res) => {
    try{
        const DBdata = await Recipe.findAll()
        res.status(200).json(DBdata)
    } catch(e) {
        res.status(404).json({
            Error: e
        })
    }
})

///GET ////
router.get('/', async (req, res) => {
    const {name} = req.query;
    try {
        if( !name ) {
            const recipes = await Allrecipes();
            return res.status(200).json(recipes);
        } else {
            const recipes2 = await Allrecipes();
            let filteRecipes = recipes2.filter(r => r.title.toLowerCase().includes(name.toLowerCase()));
            if (filteRecipes.length > 0) {
                res.status(200).json(filteRecipes);
            } else {
                res.status(201).json([`No se encontraron recetas que contengan "${name}"`]);
            }}         
    } catch(e) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            Error: e  
        });
    };
}); 

router.get('/oldway', async (req, res) => {
    const {name} = req.query;
    let recipes = [];
    try {
        const response = await fetch(`${API_PATH}/complexSearch?apiKey=${MY_APIKEY}&number=100&addRecipeInformation=true`);
        const data = await response.json();
        let shortAPIRecipes = data.results.map(r => {return {
            id: r.id,
            title: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            image: r.image
        }});
        let shortDBRecipes = await Recipe.findAll({
            attributes: ['id', 'title', 'summary', 'healthScore', 'image']
        })

        if (!name) {
            recipes = await recipes.concat(shortDBRecipes);
            recipes = await recipes.concat(shortAPIRecipes);
            res.status(200).json(recipes.slice(0,100));
        } else {
            recipes = recipes.concat(shortDBRecipes).concat(shortAPIRecipes).filter(e => e.title.toLowerCase().includes(name.toLowerCase()))
            if(recipes.length === 0) {
                res.send(`No se encontraron recetas que contengan "${name}"`);
                } else {
                res.status(200).send(recipes)};
        }
        
    } catch (err) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            err: err});
    }
  })
  
router.get('/:idReceta', async (req, res) => {
    const {idReceta} = req.params;

    try {
        const foundRecipe = await OneRecipebyId(idReceta);
        console.log(foundRecipe.title);
        if(!foundRecipe) return res.status(404).send(`No existe la receta con ID: ${idReceta}`);
        res.status(200).json(foundRecipe);
    } catch (err) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            error: err});
    }
});

router.get('/oldway/:idReceta', async (req, res) => {
    const {idReceta} = req.params;

    try {
        if(typeof parseInt(idReceta) === 'number') {
            const response = await fetch(`${API_PATH}/${idReceta}/information?apiKey=${MY_APIKEY_2}`);
            const data = await response.json();
                res.status(200).json({
                    id: data.id,
                    title: data.title,
                    summary: data.summary,
                    healthScore: data.healthScore,
                    stepBYstep: data.analyzedInstructions[0].steps.map(e => e.number  + ': ' + e.step),
                    diets: data.diets,
                    image: data.image
                });
        } else {
            res.status(200).json({
                id: idReceta,
                title: 'Se encuentra en la base de datos'
                });
        }
    } catch (err) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            error: err});
    }
});


module.exports = router;