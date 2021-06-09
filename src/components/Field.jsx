import React, { useState } from 'react';
import { Grid, Typography, Link, IconButton, Input } from '@material-ui/core';
import { Create, DeleteForeverOutlined, CheckCircleOutline } from '@material-ui/icons';
import useStyles from '../styles/Field';
import { useDispatch, useSelector } from 'react-redux';
import { setPlannerField } from '../store/actions';

const Field = ({ fieldName, i }) => {
  const classes = useStyles();
  const [ comment, setComment ] = useState(false);
  const dispatch = useDispatch();
  const [ field ] = useSelector(state => state.planner).filter(field => Object.keys(field)[0] === fieldName);
  
  const addComment = (e) => {
    if (e.key === 'Enter') {
      setComment(!comment);
    }
  };

  return (
    <Grid container className={ `${classes.field} ${i % 2 === 0 ? classes.fon : ''}` }>
      <Grid item xs={ 2 } component={ Typography } variant='button'>
        {fieldName}
      </Grid>
      <Grid item xs={ 4 }>
        <Link 
          href={ `${field[fieldName].url}` }
          target='_blank' 
          rel='noopener noreferrer' 
          underline='none'
          color='inherit'
        >
          {field[fieldName].title}
        </Link>
      </Grid>
      <Grid 
        item 
        xs={ 4 }
        className={ classes.comment }
        component={ comment ? Input : 'div' }
        autoFocus
        defaultValue={ field[fieldName].comment }
        onChange={(e) => dispatch(setPlannerField({
          title: field[fieldName].title,
          url: field[fieldName].url,
          field: fieldName,
          comment: e.target.value
        }))}
        onKeyPress={ addComment }
      >
        { field[fieldName].comment }
      </Grid>
      <Grid item xs={ 2 } className={ classes.actions }>
        <IconButton 
          aria-label='change comment'
          onClick={ () => setComment(!comment) }
          className={ `${comment ? classes.iconColor : ''}` }
        >
          { comment ? <CheckCircleOutline /> : <Create /> }
        </IconButton>
        <IconButton
          color='secondary' 
          aria-label='delete recipe'
          onClick={() => {
            dispatch(setPlannerField({
              title: '',
              url: '#',
              field: fieldName,
              comment: ''
            }));

            if (comment) {
              setComment(false);
            }
          }}
        >
          <DeleteForeverOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Field;