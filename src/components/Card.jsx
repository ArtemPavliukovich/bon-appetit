import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from '../styles/Card';
import { Grid, Card, CardMedia, CardActionArea, Typography, Chip, CardContent, IconButton, Snackbar } from '@material-ui/core';
//import MuiAlert from '@material-ui/lab/Alert';
import { MenuBookTwoTone, MoodBadOutlined, Favorite, PostAdd, DeleteOutlineOutlined } from '@material-ui/icons';
import { Ingredients, PlannerFields } from './index';
import { LoremIpsum } from 'lorem-ipsum';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteRecipe, deleteFavoriteRecipe } from '../store/actions';

const regexp = new RegExp('^.*recipe_(.+)$', 'i');

const MyCard = ({ recipe, typeButtonCard }) => {
  const [ openIngredients, setOpenIngredients ] = useState(false);
  const [ openPlannerFields, setPlannerFields ] = useState(false);
  const [ error, setError ] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  
  const setFavorite = () => {
    if (typeButtonCard === 'add') {
      if (favorites.every(el => el.uri !== recipe.uri)) {
        dispatch(addFavoriteRecipe({recipe: recipe}));
      } else {
        // add snackbar
        setError(true);
      }
    } else {
      dispatch(deleteFavoriteRecipe({id: recipe.uri}));
    }
  }
  
  const lorem = useMemo(() => {
    return new LoremIpsum({
      sentencesPerParagraph: {
        max: 4,
        min: 1
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    }).generateParagraphs(2);
  }, [recipe]);
  
  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
      <Card raised className={ classes.card }>
        <CardActionArea 
          component={ Link } 
          to={ `/recipes/${recipe.uri.replace(regexp, '$1')}` }
        >
          <CardMedia
            className={ classes.media }
            image={ recipe.image }
            title='open'
          />
          <Typography variant='h6' align='center' className={ classes.title }>
            { recipe.label }
          </Typography>
          <Typography className={ classes.lorem } paragraph>
            { lorem }
          </Typography>
        </CardActionArea>
        <CardContent className={ classes.cardContent }>
          <Grid container justify='space-between' className={ classes.chipsBox }>
            <Chip
              icon={ <MenuBookTwoTone /> }
              label={ `Ingredients: ${recipe.ingredients.length}` }
              color='secondary'
              size='small'
              clickable
              onClick={ () => setOpenIngredients(true) }
            />
            <Chip
              icon={ <MoodBadOutlined /> }
              label={ `Calories: ${recipe.calories.toFixed()}` }
              color='secondary'
              size='small'
              disabled
            />
          </Grid>
          <Ingredients
            openIngredients={ openIngredients } 
            setOpenIngredients= { setOpenIngredients } 
            ingredients={ recipe.ingredients }
          />
          <IconButton 
            aria-label='add to favorites' 
            className={ classes.favoriteIcon }
            onClick={ setFavorite }
          >
            { typeButtonCard === 'add' ? <Favorite /> : <DeleteOutlineOutlined /> }
          </IconButton>
          <IconButton 
            aria-label='add to planner' 
            color='primary'
            onClick={ () => setPlannerFields(true) }
          >
            <PostAdd />
          </IconButton>
          <PlannerFields
            openPlannerFields={ openPlannerFields } 
            setPlannerFields= { setPlannerFields }
            title={ recipe.label }
            url={ recipe.url }
          />
        </CardContent>
      </Card>
      {/* <Snackbar open={error} autoHideDuration={6000}>
        <MuiAlert onClose={handleClose} severity="success">
          This is a success message!
        </MuiAlert>
      </Snackbar> */}
    </Grid>
  );
}

export default React.memo(MyCard);