const NUM_ITEMS_PAGE = 12;
const QUERY_RECIPE = 'http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_';
const BASE_URL = 'https://api.edamam.com/search';

export default class Edamam {
  static config = {
    recipeSearch: {
      id: '7d9eaa37',
      apiKey: '3f3205e03268bdeebff3d78c3f0edf43'
    }
  }

  static getData ({ text, type, page, apiType }) {
    const { id, apiKey } = this.config[apiType];

    const api = `?app_id=${id}&app_key=${apiKey}`,
          options = `&${type}=${type === 'q' ? text : QUERY_RECIPE + text}&imageSize=REGULAR`,
          pages = page !== null ? `&from=${+page * NUM_ITEMS_PAGE}&to=${NUM_ITEMS_PAGE * (+page + 1)}` : '';
    
    return fetch(BASE_URL + api + options + pages)
      .then(response => response.json());
  }
};