import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { appReducers } from 'application/redux/reducers';

import App from 'presentation/App';

import 'presentation/styles/index.scss';

const PipePuzzleApp = () => {
  const store = createStore(appReducers, composeWithDevTools(applyMiddleware(thunk)));
  return (
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
};

const pipePuzzleRootElement = window.document.getElementById('PipePuzzleApp');
if (pipePuzzleRootElement?.hasChildNodes()) {
  hydrate(<PipePuzzleApp />, pipePuzzleRootElement);
} else {
  render(<PipePuzzleApp />, pipePuzzleRootElement);
}
