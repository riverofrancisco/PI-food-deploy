require('dotenv').config();
const { Router } = require('express');
/* const { Recipe, Diet } = require('../models'); */
const { default: axios } = require('axios');
const {
  MY_APIKEY, MY_SECOND_APIKEY
} = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./recipes')
const dietsRouter = require('./diets')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter)


module.exports = router;
