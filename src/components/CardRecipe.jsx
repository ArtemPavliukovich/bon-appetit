import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardActionArea, Typography, Chip, Button, Box } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, IconButton, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined';
import RoomServiceTwoToneIcon from '@material-ui/icons/RoomServiceTwoTone';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  media: {height: 250},
  box: {margin: '8px 0'},
  cardContent: {padding: '0!important'},

  title: {
    lineHeight: '1.2',
    margin: '8px 0'
  },

  card: {
    padding: '16px',
    height: '100%',
    backgroundColor: grey[300],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

const CardRecipe = ({ el }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } data-id={ el.recipe.uri }>
      <Card raised className={ classes.card }>
        <CardActionArea>
          <CardMedia
            className={ classes.media }
            image={ el.recipe.image }
            title='open'
          />
        </CardActionArea>
        <Typography variant='h6' align='center' className={ classes.title }>
          { el.recipe.label }
        </Typography>
        <CardContent className={ classes.cardContent }>
          <Box className={ classes.box }>
            <Chip
              icon={ <RestaurantIcon /> }
              label={ `Servings: ${el.recipe.yield}` }
              color='secondary'
              size='small'
              disabled
            />
          </Box>
          <Box className={ classes.box }> 
            <Chip
              icon={ <MoodBadOutlinedIcon /> }
              label={ `Calories: ${el.recipe.calories.toFixed()}` }
              color='secondary'
              size='small'
              disabled
            />
          </Box>
          <Box className={ classes.box }>
            <Chip
              icon={ <MenuBookTwoToneIcon /> }
              label={ `Ingredients: ${el.recipe.ingredients.length}` }
              color='secondary'
              size='small'
              clickable
              onClick={ () => setOpen(true) }
            />
          </Box>
          <Box className={ classes.box }>
            <Chip
              icon={ <RoomServiceTwoToneIcon /> }
              label={ `Dish type: ${el.recipe?.dishType || '-'}` }
              color='secondary'
              size='small'
              disabled
            />
          </Box>
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
                <IconButton aria-label="close" onClick={ () => setOpen(false) }>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </DialogTitle>
            <DialogContent dividers>
              {el.recipe.ingredients.map(ingredient => {
                return (
                  <Typography key={ ingredient?.weight || ingredient.text}>
                    {ingredient.text}
                  </Typography>
                );
              })}
            </DialogContent>
          </Dialog>
          <Button color="primary" fullWidth variant='outlined' className={ classes.box }>
            Save
          </Button>
          <Button color="primary" fullWidth variant='outlined'>
            Add to Planner
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default CardRecipe;