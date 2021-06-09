import React, { useState, useEffect } from 'react';
import Edamam from '../api/edamam';

const getID = () => document.location.href.replace(/^.+recipes\/(.+)$/, '$1');

const Recipe = () => {
  //const [ recipe, setRecipe ] = useState(null);
  const id = getID();
  
  useEffect(() => {
    Edamam.getData({
      type: 'r',
      page: null,
      text: id,
      apiType: 'recipeSearch'
    })
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      {'Recipe'}
    </div>
  );
};

export default Recipe;