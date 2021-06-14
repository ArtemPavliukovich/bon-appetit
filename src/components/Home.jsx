import React, { useState, useEffect, useRef } from 'react';
import Edamam from '../api/edamam';
import { Container, Grid, CircularProgress, TextField, Button } from '@material-ui/core';
import { Recipes } from './index';
import useStyles from '../styles/Home';
import messages from '../constants/messages';

const Home = () => {
  const [ recipes, setRecipes ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ query, setQuery ] = useState('');

  const preloder = useRef(true);
  const isData = useRef(undefined);
  const load = useRef(true);
  const isQuery = useRef(false);
  const queryValue = useRef(query);

  const { main } = useStyles();

  const addQuery = () => {
    isQuery.current = true;
    isData.current = false;
    setQuery(queryValue.current);
  }

  useEffect(() => {
    let isMounted = true;
    
    Edamam.getData({
     apiType: 'recipeSearch', 
     page: page,
     text: query,
     type: 'q'
    })
      .then(data => {
        preloder.current = false;
        load.current = true;
        isData.current = data.more;
        if (isMounted) {
          if (isQuery.current) {
            isQuery.current = false;
            setRecipes([data.hits][0]);
          } else {
            setRecipes(prev => [...prev, ...[data.hits][0]]);
          }
        }
      });

    return (() => {isMounted = false});
  }, [page, query]);

  const loadContent = () => {
    const bodyHeight = document.body.offsetHeight,
          screenHeight = document.documentElement.clientHeight,
          scrollHeight = window.pageYOffset;
    
    if (isData.current && load.current && bodyHeight - screenHeight - scrollHeight < 700) {
      load.current = false;
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', loadContent, {passive: true});
    return () => {
      window.removeEventListener('scroll', loadContent, {passive: true});
    };
  }, []);
  
  return (
    <Container component='main' className={ main }>
      {recipes.length || !preloder.current
        ? <Grid container spacing={ 3 }>
            <Grid container justify='center'>
              <TextField
                size='small'
                label='Search for recipes' 
                variant='outlined' 
                onChange={ (e) => queryValue.current = e.target.value.trim() }
              />
              <Button
                size='small'
                variant='outlined'
                style={{marginLeft: '12px'}}
                onClick={ addQuery }
              >
                { messages.home.searchButton }
              </Button>
            </Grid>
            <Recipes recipes={ recipes } typeButtonCard={ 'add' } />
          </Grid>
        : <Grid container justify='center' alignItems='center'>
            <CircularProgress size={ 50 } />
          </Grid>
      }
    </Container>
  );
};

export default Home;