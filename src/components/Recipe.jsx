import React, { useState, useEffect } from 'react';
import { Edamam } from '../api/edamam';
import useStyles from '../styles/Recipe';
import { Container, Typography, Box, Link, Grid, TableContainer } from '@material-ui/core';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Preloader } from './index';
import { LoremIpsum } from 'lorem-ipsum';
import messages from '../constants/messages';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 1
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
}).generateParagraphs(5);

const Recipe = () => {
  const [ recipe, setRecipe ] = useState(null);
  const classes = useStyles();
  const isMaxWidth480 = useMediaQuery('(max-width: 480px)');
  
  useEffect(() => {
    const id = document.location.href.replace(/^.+recipes\/(.+)$/, '$1');

    Edamam.getRecipe({
      type: 'r',
      page: null,
      text: id,
      popstate: false,
      filter: {
        meal: '',
        diet: ''
      }
    })
      .then(data => setRecipe(data[0]));
  }, []);

  return (
    <Container component='main' className={ classes.main }>
      {!recipe ? <Preloader /> :
        <>
          <Typography variant='h5' align='center' style={{width: '100%'}} gutterBottom>
            { recipe.label }
          </Typography>
          <Grid container alignItems='flex-start' justify='center'>
            <img src={ recipe.image } alt='recipe' className={ classes.recipeImg } />
            <Box className={ classes.recipeInfo }>
              <Typography paragraph>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ lorem }
              </Typography>
              <Link 
                href={ recipe.url }
                target='_blank'
                rel='noopener noreferrer'
                color='textSecondary'
                variant='button'
              >
                { messages.recipe.link }
              </Link>
            </Box>
            <TableContainer component={ Paper } className={ classes.table }>
              <Table size='small' aria-label='nutritional value'>
                <TableHead className={ classes.tableHead }>
                  <TableRow>
                    {messages.recipe.tableHead.map((title, i) => {
                      if (isMaxWidth480 && title === 'Code') return null;
                      return (
                        <TableCell key={ title } align={ i === 0 ? 'center' : 'right'}>
                          { title }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipe.digest.map((el, i) => (
                    <TableRow 
                      key={el.label} 
                      className={ i % 2 === 0 ? classes.tableRow : '' }
                    >
                      <TableCell align='center'>
                        { el.label }
                      </TableCell>
                      {isMaxWidth480 ? null :
                        <TableCell align='right'>
                          { el.tag }
                        </TableCell>
                      }
                      <TableCell align='right'>
                        { el.daily.toFixed() }
                      </TableCell>
                      <TableCell align='right'>
                        { el.total.toFixed() + el.unit }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      }
    </Container>
  );
};

export default Recipe;