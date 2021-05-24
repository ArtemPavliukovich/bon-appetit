import React, { useState } from 'react';
import Edamam from '../api/edamam';
import { Container, Grid } from '@material-ui/core';
import CardRecipe from './CardRecipe';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    padding: '24px'
  }
});

const getData = (cfgType, getRecipes) => {
  Edamam.getData(cfgType)
    .then(response => response.json())
    .then(data => getRecipes([data.hits][0]));
};

const Home = () => {
  const [ recipes, getRecipes ] = useState(null);
  const classes = useStyles();
  
  return (
    <Container component='main' className={ classes.main }>
      <Grid container spacing={ 3 }>
        {!recipes ? getData('recipeSearch', getRecipes) : recipes.map(el => 
          <CardRecipe el={ el } key={ el.recipe.label }/>
        )}
      </Grid>
    </Container>
  );
};

export default Home;