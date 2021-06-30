export const setHistoryState = (newState) => {
  const { history } = window;

  if (history.state?.key) {
    history.replaceState({
      key: history.state.key,
      state: newState
    }, null, null);
  } else {
    history.replaceState(newState, null, null);
  }
};

window.addEventListener('popstate', (e) => {
  if (window.location.pathname === '/') {
    const state = e.state?.key ? e.state.state : e.state;
    
    if (state) {
      state.preloader = 'not-filter';
      state.popstate = true;
      setHistoryState(state);
    }
  }
});

window.addEventListener('beforeunload', () => {
  if (window.location.pathname === '/') {
    const { history } = window;
    const state = history.state?.key ? history.state.state : history.state;
    
    if (state) {
      state.preloader = 'not-filter';
      state.page = 0;
      state.scroll = null;
      setHistoryState(state);
    }
  }
});

export const getHistoryState = () => {
  return window.history.state?.key ? window.history.state.state : window.history.state;
};

export const setScrollPosition = (value) => {
  const state = getHistoryState();
  setHistoryState({
    ...state,
    scroll: value
  });
};