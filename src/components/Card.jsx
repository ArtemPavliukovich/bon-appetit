import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from '../styles/Card';
import { Grid, Card, CardMedia, CardActionArea, Typography, Chip, CardContent, IconButton } from '@material-ui/core';
import { MenuBookTwoTone, MoodBadOutlined, Favorite, PostAdd, DeleteOutlineOutlined } from '@material-ui/icons';
import { Ingredients, PlannerFields } from './index';
import { LoremIpsum } from 'lorem-ipsum';
import { useDispatch } from 'react-redux';
import { addFavoriteRecipe, deleteFavoriteRecipe, addRecipe } from '../store/actions';
import { useSnackbar } from 'notistack';
import { store } from '../store/store';
import PropTypes from 'prop-types';
import { setScrollPosition } from '../api/history';
import noPhoto from '../images/no-photo.svg';

const regexp = new RegExp('^.*recipe_(.+)$', 'i');

const MyCard = ({ recipe, typeButtonCard }) => {
  const [ openIngredients, setOpenIngredients ] = useState(false);
  const [ openPlannerFields, setPlannerFields ] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  const setFavorite = () => {
    if (typeButtonCard === 'add') {
      if (store.getState().favorites.every(el => el.uri !== recipe.uri)) {
        dispatch(addFavoriteRecipe({recipe: recipe}));
        dispatch(addRecipe({countRecipe: 1}));
      } else {
        enqueueSnackbar('This recipe already exists!', {variant: 'warning'});
      }
    } else {
      dispatch(deleteFavoriteRecipe({id: recipe.uri}));
    }
  };

  const openRecipe = () => {
    setScrollPosition(window.pageYOffset);
  };
  
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
  }, []);
  
  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
      <Card raised className={ classes.card }>
        <CardActionArea 
          component={ Link }
          to={ `/recipes/${recipe.uri.replace(regexp, '$1')}` }
          onClick={ openRecipe }
        >
          <CardMedia
            className={ classes.media }
            image={ ' ' }
            style={{
              background: `url(${recipe.image}) no-repeat center / cover, url(${noPhoto}) no-repeat center / 100% 100%`
            }}
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
          <Ingredients
            openIngredients={ openIngredients } 
            setOpenIngredients= { setOpenIngredients } 
            ingredients={ recipe.ingredients }
          />
          <PlannerFields
            openPlannerFields={ openPlannerFields } 
            setPlannerFields= { setPlannerFields }
            title={ recipe.label }
            url={ recipe.url }
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

MyCard.propTypes = {
  recipe: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    calories: PropTypes.number.isRequired
  }).isRequired,
  typeButtonCard: PropTypes.string.isRequired
};

export default React.memo(MyCard);