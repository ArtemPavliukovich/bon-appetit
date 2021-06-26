import React, { useState } from 'react';
import { Grid, Typography, Link, IconButton, Input } from '@material-ui/core';
import { Create, DeleteForeverOutlined, CheckCircleOutline } from '@material-ui/icons';
import useStyles from '../styles/Field';
import { useDispatch } from 'react-redux';
import { setPlannerField } from '../store/actions';
import PropTypes from 'prop-types';

const Field = ({ field }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fieldName = Object.keys(field).join('');
  const { title, url, comment } = field[fieldName];
  const [ commentField, setCommentField ] = useState({
    input: false,
    text: comment
  });
  
  const setComment = (add = true) => {
    if (comment !== commentField.text || !add) {
      dispatch(setPlannerField({
        title: add ? title : '',
        url: add ? url : '#',
        fieldName: fieldName,
        comment: add ? commentField.text : ''
      }));
    }

    setCommentField(prev => ({
      ...prev,
      input: false
    }));
  };

  return (
    <Grid container className={ classes.field }>
      <Grid item xs={ 2 }>
        <Typography variant='button' className={ classes.title }>
          {fieldName}
        </Typography>
      </Grid>
      <Grid item xs={ 4 }>
        <Link 
          href={ `${url}` }
          target='_blank' 
          rel='noopener noreferrer' 
          underline='none'
          color='inherit'
        >
          {title}
        </Link>
      </Grid>
      <Grid 
        item 
        xs={ 4 }
        className={ classes.comment }
        component={ commentField.input ? Input : 'div' }
        autoFocus
        defaultValue={ comment }
        onChange={(e) => setCommentField(prev => ({
          ...prev,
          text: e.target.value.trim()
        }))}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setComment();
          }   
        }}
      >
        { comment }
      </Grid>
      <Grid item xs={ 2 } className={ classes.actions }>
        <IconButton 
          aria-label='change comment'
          className={ `${commentField.input ? classes.iconColor : ''}` }
          onClick={ () => commentField.input ? setComment() : setCommentField(prev => ({
            ...prev,
            input: !prev.input
          }))}
        >
          { commentField.input ? <CheckCircleOutline /> : <Create /> }
        </IconButton>
        <IconButton
          color='secondary' 
          aria-label='delete recipe'
          onClick={ () => setComment(false) }
        >
          <DeleteForeverOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};

Field.propTypes = {
  field: PropTypes.objectOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
};

export default React.memo(Field);