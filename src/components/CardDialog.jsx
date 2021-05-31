import React from 'react';
import { Grid, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const CardDialog = ({ open, setOpen, ingredients }) => {
  return (
    <Dialog 
      open={ open } 
      onClose={ () => setOpen(false) } 
      aria-labelledby='dialog-title'
      fullWidth
    >
      <DialogTitle>
        <Grid container justify='space-between' alignItems='center'>
          <Typography variant='h6'>
            Ingredients List
          </Typography>
          <IconButton aria-label='close' onClick={ () => setOpen(false) }>
            <Close />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        {ingredients.map((item, i) => {
          return (
            <Typography key={ i + 'ingredient' }>
              {item.text}
            </Typography>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

export default CardDialog;