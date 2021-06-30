import React, { useState } from 'react';
import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  filter: {
    width: '150px',
    marginRight: '12px',
    '&:last-child': {
      marginRight: '0',
    }
  }
});

const Filter = ({ setState, items, name, value }) => {
  const [ open, setOpen ] = useState(false);
  const classes = useStyles();
  
  const changeFilter = (e) => {
    setState(prev => ({
      ...prev,
      preloader: 'filter',
      recipes: [],
      page: 0,
      scroll: null,
      filter: {
        ...prev.filter,
        [name.toLowerCase()]: e.target.value
      }
    }));
  }
  
  return (
    <FormControl variant='outlined' size='small' className={ classes.filter }>
      <InputLabel id={ name }>
        { name }
      </InputLabel>
      <Select
        labelId={ name }
        label={ name }
        open={ open }
        value={ value }
        onClose={ () => setOpen(false) }
        onOpen={ () => setOpen(true) }
        onChange={ changeFilter }
      >
        {items.map(item => 
          <MenuItem value={ item } key={ item }>
            { item ? item : 'none' }
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

Filter.propTypes = {
  setState: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Filter;