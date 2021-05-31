import React, { useState, useEffect, useRef } from 'react';
import Edamam from '../api/edamam';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { Card } from './index';
import useStyles from '../styles/Home';

const Home = () => {
  const [ recipes, setRecipes ] = useState([]);
  const [ page, setPage ] = useState(0);

  const prevRecipes = useRef(recipes);
  const prevPage = useRef(page);
  const isData = useRef(undefined);

  const { main, displayOff, position } = useStyles();

  useEffect(() => {
    let isMounted = true;

    Edamam.getData('recipeSearch', page)
      .then(data => {
        //console.log(data);
        const recipes = [...prevRecipes.current, ...[data.hits][0]];
        prevRecipes.current = recipes;
        prevPage.current = page;
        isData.current = data.more;
        if (isMounted) setRecipes(recipes);
      });

    return (() => {isMounted = false});
  }, [page]);

  const loadContent = () => {
    const bodyHeight = document.body.offsetHeight,
          screenHeight = document.documentElement.clientHeight,
          scrollHeight = window.pageYOffset;
    
    if (isData.current && bodyHeight - screenHeight - scrollHeight < 700) {
      setPage(prevPage.current + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', loadContent, {passive: true});
    return () => {
      window.removeEventListener('scroll', loadContent, {passive: true});
    };
  }, []);
  
  return (
    <Container component='main' className={ `${main} ${recipes.length ? '' : position}` }>
      <CircularProgress className={ recipes.length ? displayOff : '' } size={ 50 } />
      <Grid container spacing={ 3 } className={ !recipes.length ? displayOff : '' }>
        {recipes.map((el, i) =>
          <Card el={ el } key={ i + el.recipe.label } />
        )}
      </Grid>
    </Container>
  );
};

export default Home;