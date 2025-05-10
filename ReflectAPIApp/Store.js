import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './Reducer';
import { persistReducer, persistStore } from 'redux-persist';
import rootSaga from './Saga';

const sagaMiddleware = createSagaMiddleware();

// Redux Persist configuration
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  };

const pReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = configureStore({
    reducer: pReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
  });

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
