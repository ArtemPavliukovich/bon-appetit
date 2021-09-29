import type { DefaultState } from '../types';

export const setHistoryState = (newState: DefaultState): void => {
  const { history }: any = window;

  if (history.state?.key) {
    history.replaceState({
      key: history.state.key,
      state: newState
    }, window.location.pathname, null);
  } else {
    history.replaceState(newState, window.location.pathname, null);
  }
};

export const getHistoryState = (): DefaultState => {
  return window.history.state?.key ? window.history.state.state : window.history.state;
};

export const setScrollPosition = (value: number | null): void => {
  const state: DefaultState = getHistoryState();
  setHistoryState({
    ...state,
    scroll: value
  });
};

window.addEventListener('beforeunload', () => {
  if (window.location.pathname === '/') {
    const state: DefaultState = getHistoryState();
    
    if (state) {
      state.preloader = 'not-filter';
      state.page = 0;
      state.scroll = null;
      setHistoryState(state);
    }
  }
});

window.addEventListener('popstate', () => {
  if (window.location.pathname === '/') {
    const state: DefaultState = getHistoryState();
    
    if (state) {
      state.preloader = 'not-filter';
      state.popstate = true;
      setHistoryState(state);
    }
  }
});