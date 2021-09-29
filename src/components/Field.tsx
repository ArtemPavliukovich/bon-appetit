import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Link, IconButton, Input } from '@material-ui/core';
import { Create, DeleteForeverOutlined, CheckCircleOutline } from '@material-ui/icons';
import useStyles from '../styles/Field';
import { setPlannerField } from '../store/actions';
import type { ObjectPlannerField, PlannerField } from '../types';

interface FieldProps {
  field: ObjectPlannerField;
};

interface CommentField {
  input: boolean;
  text: string;
};

const Field: React.FC<FieldProps> = ({ field }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fieldName: string = Object.keys(field).join('');
  const { title, url, comment }: PlannerField = field[fieldName];
  const [ commentField, setCommentField ] = useState<CommentField>({
    input: false,
    text: comment
  });
  
  const setComment = (add: boolean = true): void => {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCommentField(prev => ({
          ...prev,
          text: e.target.value.trim()
        }))}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>): void => {
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
          onClick={(): void => commentField.input ? setComment() : setCommentField(prev => ({
            ...prev,
            input: !prev.input
          }))}
        >
          { commentField.input ? <CheckCircleOutline /> : <Create /> }
        </IconButton>
        <IconButton
          color='secondary' 
          aria-label='delete recipe'
          onClick={(): void => setComment(false)}
        >
          <DeleteForeverOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default React.memo(Field);