import { createStore, compose } from 'redux';
import reducer from '../reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;