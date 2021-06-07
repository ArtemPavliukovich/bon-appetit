import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from '../styles/Card';
import { Grid, Card, CardMedia, CardActionArea, Typography, Chip, CardContent, IconButton } from '@material-ui/core';
import { MenuBookTwoTone, MoodBadOutlined, Favorite, PostAdd } from '@material-ui/icons';
import { CardDialog } from './index';
import { LoremIpsum } from 'lorem-ipsum';
import { GET_ID } from '../reducers/actions-const';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 1
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const regexp = new RegExp('^.*recipe_(.+)$', 'i');

const MyCard = ({ el }) => {
  const [ open, setOpen ] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  //console.log(el.recipe)
  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
      <Card raised className={ classes.card }>
        <CardActionArea
          component={ Link }
          onClick={() => {
            // убрать либо заменить на модалку с пзапросом на редирект и редиректнуть
            // action type
            dispatch({
              type: GET_ID,
              id: el.recipe.uri
            });
          }}
          to={ `/recipes/${el.recipe.uri.replace(regexp, '$1')}` }
        >
          <CardMedia
            className={ classes.media }
            image={ el.recipe.image }
            title='open'
          />
          <Typography variant='h6' align='center' className={ classes.title }>
            { el.recipe.label }
          </Typography>
          <Typography className={ classes.lorem } paragraph>
            { lorem.generateParagraphs(2) }
          </Typography>
        </CardActionArea>
        <CardContent className={ classes.cardContent }>
          <Grid container justify='space-between' className={ classes.chipsBox }>
            <Chip
              icon={ <MenuBookTwoTone /> }
              label={ `Ingredients: ${el.recipe.ingredients.length}` }
              color='secondary'
              size='small'
              clickable
              onClick={ () => setOpen(true) }
            />
            <Chip
              icon={ <MoodBadOutlined /> }
              label={ `Calories: ${el.recipe.calories.toFixed()}` }
              color='secondary'
              size='small'
              disabled
            />
          </Grid>
          <CardDialog
            open={ open }
            setOpen= { setOpen }
            ingredients={ el.recipe.ingredients }
          />
          <IconButton aria-label='add to favorites' className={ classes.favoriteIcon }>
            <Favorite />
          </IconButton>
          <IconButton aria-label='add to planner' color='primary'>
            <PostAdd />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MyCard;
