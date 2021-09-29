// Route
export interface RouteTypes {
  component: React.FC;
  exact: boolean;
  path: string;
};

// Reducers
export interface NavInitialState {
  favorites: number;
  planner: boolean;
};

// ApiEdamamResponse
export interface ResponseApiEdamam {
  more: boolean;
  hits: Array<RecipeType>;
};

// Components
export interface Ingredient {
  text: string;
};

export interface RecipeDigestType {
  label: string;
  daily: number;
  total: number;
  tag: string;
  unit: string;
};

export interface RecipeType {
  id: number;
  uri: string;
  image: string;
  label: string;
  ingredients: Array<Ingredient>;
  url: string;
  calories: number;
  digest: Array<RecipeDigestType>;
};

export interface PlannerField {
  url: string;
  title: string;
  comment: string;
};

export interface ObjectPlannerField {
  [fieldName: string]: PlannerField;
};

export interface Filter {
  meal: string;
  diet: string;
};

export interface DefaultState {
  recipes: Array<RecipeType>;
  page: number;
  query: string;
  isNextQuery: boolean;
  preloader: string | boolean;
  scroll: number | null;
  popstate: boolean;
  filter: Filter;
};

export interface DataAutorization {
  email: string;
  password: string;
  type: string;
};

export interface LoginError {
  type: string;
  text: string;
};