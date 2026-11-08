import { legacy_createStore as createStore } from 'redux';
import { reducer } from './reducer';

// The second argument connects Redux DevTools when the browser extension is installed
export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());