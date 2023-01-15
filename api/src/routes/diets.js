require('dotenv').config();
const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { AllDBdiets, APIdiets, DBdiets } = require('../middlewares/DietMiddle')
const router = Router();
const {
    MY_APIKEY, MY_SECOND_APIKEY
  } = process.env;


  
router.get('/', async (req, res) => {
try{
 const diets = await APIdiets();
 console.log(diets)
 res.status(200).json(diets);
} catch (e){
 res.status(400).json({Error: e});
}
});

router.get('/oldway', async (req, res) => {
    let diets = await Diet.findAll();
    if(diets.length === 0) {
      let apidiets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];
       await apidiets.forEach(async (e) => await Diet.create({name: e}));
       let diets2 = await Diet.findAll();
       res.status(200).json({dietas: diets2});
    } else {
      res.status(200).json({dietas: diets});
    }
});

module.exports = router;