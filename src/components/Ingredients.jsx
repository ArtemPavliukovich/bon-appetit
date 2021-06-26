import React from 'react';
import { Grid, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import messages from '../constants/messages';
import PropTypes from 'prop-types';

const Ingredients = ({ openIngredients, setOpenIngredients, ingredients }) => {
  return (
    <Dialog 
      open={ openIngredients } 
      onClose={ () => setOpenIngredients(false) } 
      aria-labelledby='dialog-title'
      fullWidth
    >
      <DialogTitle>
        <Grid container justify='space-between' alignItems='center'>
          <Typography variant='h6'>
            {messages.card.dialogTitle}
          </Typography>
          <IconButton aria-label='close' onClick={ () => setOpenIngredients(false) }>
            <Close />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        {ingredients.map((ingredient, i) => {
          return (
            <Typography key={ i + 'ingredient' }>
              {ingredient.text}
            </Typography>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

Ingredients.propTypes = {
  openIngredients: PropTypes.bool.isRequired,
  setOpenIngredients: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired
  }))
};

export default Ingredients;