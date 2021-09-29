import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import type { ObjectPlannerField } from './../types';

const plannerStateReconciler = (insideState: RootState, initialState: RootState): RootState => {
  if (insideState) {
    const titlesInitialFields = initialState.planner.map((field: ObjectPlannerField): string => {
      return Object.keys(field).join('');
    });

    const titlesInsideFields = insideState.planner.map((field: ObjectPlannerField): string => {
      return Object.keys(field).join('');
    });

    const isChangeFields = titlesInitialFields.every((name: string): boolean => {
      return titlesInsideFields.includes(name);
    });

    if (titlesInitialFields.length !== titlesInsideFields.length || !isChangeFields) {
      insideState.planner = initialState.planner.map((fieldInitialState: ObjectPlannerField) => {
        return insideState.planner.find((fieldInsideState: ObjectPlannerField): boolean => {
          return Object.keys(fieldInsideState).join('') === Object.keys(fieldInitialState).join('');
        }) ?? fieldInitialState;
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

const store: any = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;