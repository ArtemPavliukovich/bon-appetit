import React from 'react';
import { Grid, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import messages from '../constants/messages';
import type { Ingredient } from '../types';

interface IngredientsProps {
  openIngredients: boolean;
  setOpenIngredients: (value: boolean) => void;
  ingredients: Array<Ingredient>;
};

const Ingredients: React.FC<IngredientsProps> = ({ openIngredients, setOpenIngredients, ingredients }) => {
  return (
    <Dialog 
      open={ openIngredients }
      onClose={(): void => setOpenIngredients(false)} 
      aria-labelledby='dialog-title'
      fullWidth
    >
      <DialogTitle>
        <Grid container justify='space-between' alignItems='center'>
          <Typography variant='h6'>
            {messages.card.dialogTitle}
          </Typography>
          <IconButton aria-label='close' onClick={(): void => setOpenIngredients(false)}>
            <Close />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        {ingredients.map((ingredient: Ingredient, i: number) => {
          return (
            <Typography key={ i }>
              {ingredient.text}
            </Typography>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default Ingredients;