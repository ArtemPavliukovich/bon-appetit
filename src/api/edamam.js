const ITEM_PAGE = 12;

export default class Edamam {
  static cfg = {
    recipeSearch: {
      ID: '7d9eaa37',
      API_KEY: '3f3205e03268bdeebff3d78c3f0edf43'
    }
  }

  static getData (cfgType, page, query = 'meat', queryType = 'q') {
    const BASE_URL = 'https://api.edamam.com/search',
          API = `?app_id=${this.cfg[cfgType].ID}&app_key=${this.cfg[cfgType].API_KEY}`,
          queryApi = `&${queryType}=${query}`,
          options = page !== null ? `&from=${+page * ITEM_PAGE}&to=${ITEM_PAGE * (+page + 1)}&imageSize=REGULAR` : '';
    
    return fetch(BASE_URL + API + queryApi + options)
      .then(response => response.json());
  }
};