import type { Filter } from '../types';

const BASE_URL: string = 'https://api.edamam.com/search?';
const NUM_ITEMS_PAGE: number = 12;
const QUERY_RECIPE: string = 'http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_';

interface Config {
  id: string;
  apiKey: string;
};

interface ApiParams {
  text: string;
  type: string;
  page: string | null;
  filter: Filter;
  popstate: boolean;
};

interface ApiSearchParams {
  app_id: string;
  app_key: string;
  imageSize: 'REGULAR';
  from: string;
  to: string;
  [type: string]: string;
};

export const diet: Array<string> = [
  '',
  'balanced',
  'high-protein',
  'low-fat',
  'low-carb'
];

export const meal: Array<string> = [
  '',
  'breakfast',
  'lunch',
  'dinner',
  'snack'
];

export class Edamam {
  private static config: Config = {
    id: '7d9eaa37',
    apiKey: '3f3205e03268bdeebff3d78c3f0edf43'
  }

  public static async getRecipe<T> ({ text, type, page, filter, popstate }: ApiParams): Promise<T> {
    const { id, apiKey } = this.config;

    const filterMealType: {mealType?: string} = filter.meal ? {
      mealType: filter.meal.toLowerCase()
    } : {};

    const filterDietType: {diet?: string} = filter.diet ? {
      diet: filter.diet.toLowerCase()
    } : {};

    const apiParams: ApiSearchParams = {
      app_id: id,
      app_key: apiKey,
      imageSize: 'REGULAR',
      from: page === null ? '' : (popstate) ? '0' : +page * NUM_ITEMS_PAGE + '',
      to: page === null ? '' : (+page + 1) * NUM_ITEMS_PAGE + '',
      [type]: type === 'q' ? text : QUERY_RECIPE + text,
      ...filterMealType,
      ...filterDietType
    };

    return fetch(BASE_URL + decodeURI(new URLSearchParams(apiParams).toString()))
      .then(response => response.json());
  }
};