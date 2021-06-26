import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const plannerStateReconciler = (insideState, initialState) => {
  if (insideState) {
    const titlesInitialFields = initialState.planner.map(field => Object.keys(field).join(''));
    const titlesInsideFields = insideState.planner.map(field => Object.keys(field).join(''));
    const isChangeFields = titlesInitialFields.every(name => titlesInsideFields.includes(name));

    if (titlesInitialFields.length !== titlesInsideFields.length || !isChangeFields) {
      insideState.planner = initialState.planner.map(fieldInitialState => {
        return insideState.planner.find(fieldInsideState => 
          Object.keys(fieldInsideState).join('') === Object.keys(fieldInitialState).join('')
        ) ?? fieldInitialState;
      });
    }
  
    return insideState;
  } else {
    return initialState;
  }
};

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: plannerStateReconciler
  // blacklist: ['name'] or whitelist: ['name'] can be!!!
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };