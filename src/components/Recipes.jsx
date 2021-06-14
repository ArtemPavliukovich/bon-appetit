import React from 'react';
import { Card } from './index';
import { Grid, Typography } from '@material-ui/core';
import messages from '../constants/messages';

const Recipes = ({ recipes, typeButtonCard }) => {
  return (
    <>
      {recipes.length 
        ? recipes.map((el, i) => (
            <Card 
              recipe={ el?.recipe ?? el }
              key={ i + 'recipe' }
              typeButtonCard={ typeButtonCard }
            />
          ))
        : <Grid 
            container 
            justify='center' 
            alignItems='center' 
            style={ {height: `${typeButtonCard === 'add' ? '100%' : 'auto'}`} }
          >
            <Typography color='secondary' variant='h6'>
              { messages.recipes.error.toUpperCase() }
            </Typography>
          </Grid>
      }
    </>
  );
};

  export default Recipes;