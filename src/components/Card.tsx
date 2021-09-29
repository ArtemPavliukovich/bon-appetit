import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, batch } from 'react-redux';
import { LoremIpsum } from 'lorem-ipsum';
import { useSnackbar } from 'notistack';
import { 
  Grid, Card, CardMedia, CardActionArea, Typography, Chip, CardContent, IconButton 
} from '@material-ui/core';
import { 
  MenuBookTwoTone, MoodBadOutlined, Favorite, PostAdd, DeleteOutlineOutlined 
} from '@material-ui/icons';
import { Ingredients, PlannerFields } from './index';
import useStyles from '../styles/Card';
import { addFavoriteRecipe, deleteFavoriteRecipe, addRecipe } from '../store/actions';
import { store } from '../store/store';
import { setScrollPosition } from '../api/history';
import noPhoto from '../images/no-photo.svg';
import type { RecipeType } from '../types';
import { typeButton } from '../constants/enums';

interface MyCardProps {
  typeButtonCard: typeButton;
  recipe: RecipeType;
};

const regexp: RegExp = new RegExp('^.*recipe_(.+)$', 'i');

const MyCard: React.FC<MyCardProps> = ({ recipe, typeButtonCard }) => {
  const [ openIngredients, setOpenIngredients ] = useState<boolean>(false);
  const [ openPlannerFields, setPlannerFields ] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  const setFavorite = (): void => {
    if (typeButtonCard === typeButton.add) {
      if (store.getState().favorites.every((el: RecipeType) => el.uri !== recipe.uri)) {
        batch(() => {
          dispatch(addFavoriteRecipe({ recipe }));
          dispatch(addRecipe({countRecipe: 1}));
        });
      } else {
        enqueueSnackbar('This recipe already exists!', {variant: 'warning'});
      }
    } else {
      dispatch(deleteFavoriteRecipe({id: recipe.uri}));
    }
  };

  const openRecipe = (): void => {
    setScrollPosition(window.pageYOffset);
  };
  
  const lorem: string = useMemo((): string => {
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
              onClick={(): void => setOpenIngredients(true)}
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
            { typeButtonCard === typeButton.add ? <Favorite /> : <DeleteOutlineOutlined /> }
          </IconButton>
          <IconButton 
            aria-label='add to planner' 
            color='primary'
            onClick={(): void => setPlannerFields(true)}
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

export default React.memo(MyCard);