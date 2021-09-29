import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Card } from './index';
import messages from '../constants/messages';
import { typeButton } from '../constants/enums';
import type { RecipeType } from '../types';

interface RecipesProps {
  recipes: Array<RecipeType>;
  typeButtonCard: typeButton;
};

const Recipes: React.FC<RecipesProps> = ({ recipes, typeButtonCard }) => {
  return (
    <SnackbarProvider maxSnack={ 3 } autoHideDuration={ 2000 }>
      {recipes.length 
        ? recipes.map((recipe: RecipeType) => (
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
            style={{flexGrow: 1}}
          >
            <Typography color='secondary' variant='h6'>
              { messages.recipes.error.toUpperCase() }
            </Typography>
          </Grid>
      }
    </SnackbarProvider>
  );
};

export default Recipes;