import * as model from './model.js';
import recipeView from './views/recipeView.js'
import serchView from './views/searchView.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipes
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    
  } catch(err) {
    recipeView.renderError();
  } 
};

const controlSearchResults = async function() {
  try {
    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch(err) {
    console.log(err);
  }
};


const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();