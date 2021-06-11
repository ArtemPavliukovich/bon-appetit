import React from 'react';
import { Grid, Container, Typography, Box, Button } from '@material-ui/core';
import messages from '../constants/messages';
import useStyles from '../styles/Planner';
import { Field } from './index';
import SaveIcon from '@material-ui/icons/Save';
import html2canvas from 'html2canvas';

const saveScreenPlanner = () => {
  html2canvas(document.getElementById('planner'))
    .then(canvas => {
      const link = document.createElement('a');
      link.download = 'planner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
}

const Planner = () => {
  const classes = useStyles();
  const { planner } = messages;

  return (
    <>
      <Grid container justify='center' className={ classes.saveBox }>
        <Button
          variant='contained'
          color='primary'
          startIcon={ <SaveIcon /> }
          onClick={ saveScreenPlanner }
        >
          {planner.button}
        </Button>
      </Grid>
      <Grid container justify='center' alignItems='center' className={ classes.plannerWrap }>
        <Container maxWidth='md' className={ classes.planner } id='planner'>
          <Grid container>
            {planner.title.map((title, i) =>
              <Grid 
                item 
                key={ title + i } 
                className={ classes.title }
                component={ Typography }
                variant='h6'
                xs={ i === 0 || i === 3 ? 2 : 4 }
              >
                {title}
              </Grid>
            )}
          </Grid>
          {planner.fields.map((field, i) => 
            <Field fieldName={ field } key={ field + i } i={ i } />
          )}
        </Container>
      </Grid>
    </>
  );
};

export default Planner;