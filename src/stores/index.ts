// init stores
import { createStore } from 'redux';
import { userReducer } from '../reducers/userReducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
export const userStore = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);