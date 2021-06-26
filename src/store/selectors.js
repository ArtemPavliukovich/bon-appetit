// это не используется в проекте, я для себя оставил
import { createSelector } from 'reselect';

const getFavorites = state => state.favorites;

export const selectFavorites = createSelector(
  [ getFavorites ],
  favorites => favorites // func how filter something
);