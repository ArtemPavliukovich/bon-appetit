import React, { useState, useEffect, useRef } from 'react';
import Edamam from '../api/edamam';
import { Container, Grid } from '@material-ui/core';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {padding: '24px'}
});

const Home = () => {
  const [ recipes, setRecipes ] = useState([]);
  const [ page, setPage ] = useState(0);

  const prevRecipes = useRef(recipes);
  const prevPage = useRef(page);
  const isData = useRef(undefined);

  const { main } = useStyles();

  useEffect(() => {
    Edamam.getData('recipeSearch', page)
      .then(data => {
        const recipes = [...prevRecipes.current, ...[data.hits][0]];
        prevRecipes.current = recipes;
        prevPage.current = page;
        isData.current = data.more;
        setRecipes(recipes);
      });
  }, [page]);

  useEffect(() => { // тут есть проблема, надо вернуть функцию чтоб удалять обработчик
    window.addEventListener('scroll', () => {
      const lazyHeight = document.body.offsetHeight - window.pageYOffset;
      
      if (isData.current && lazyHeight < document.documentElement.clientHeight + 700) {
        setPage(prevPage.current + 1);
      }
    }, {passive: true});
  }, []);
  
  return (
    <Container component='main' className={ main }>
      <Grid container spacing={ 3 }>
        {!recipes.length ? null : recipes.map((el, i) => 
          <Card el={ el } key={ i + el.recipe.label } />
        )}
      </Grid>
    </Container>
  );
};

export default Home;