import React from 'react';
import { Card } from './index';
import { Grid, Typography } from '@material-ui/core';
import messages from '../constants/messages';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';

const Recipes = ({ recipes, typeButtonCard }) => {
  return (
    <SnackbarProvider maxSnack={ 3 } autoHideDuration={ 2000 }>
      {recipes.length 
        ? recipes.map(recipe => (
            <Card 
              recipe={ recipe }
              key={ recipe.id }
              typeButtonCard={ typeButtonCard }
            />
          ))                
        : <Grid 
            container 
            justify='center' 
            alignItems='center' 
            style={{flexGrow: '1'}}
          >
            <Typography color='secondary' variant='h6'>
              { messages.recipes.error.toUpperCase() }
            </Typography>
          </Grid>
      }
    </SnackbarProvider>
  );
};

Recipes.propTypes = {
  typeButtonCard: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  }))
};

export default Recipes;