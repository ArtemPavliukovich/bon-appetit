import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Edamam from '../api/edamam';

const Recipe = () => { // дорабатывать
  const [ recipe, setRecipe ] = useState(null);
  const id = useSelector(state => state.recipe);
  
  useEffect(() => {
    Edamam.getData('recipeSearch', null, id, 'r')
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      {'Recipe'}
    </div>
  );
};

export default Recipe;