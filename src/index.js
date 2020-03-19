import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/bootstrap.min.css';
import './css/theme.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import fbConfig from './api/fbConfig'; 
import thunk from 'redux-thunk';
import rootReducer  from './store/reducers/rootReducer'
import { getAllSurah } from './store/actions/quranAction'

const store = createStore(rootReducer, 
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
		reactReduxFirebase(fbConfig),
		reduxFirestore(fbConfig, {attachAuthIsReady: true})
	)
);
store.dispatch(getAllSurah())
console.log(store.getState())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));