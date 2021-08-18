import { combineReducers } from 'redux';

import { puzzleReducer } from 'application/redux/reducers/puzzleReducer';

const appReducers = combineReducers({
  puzzleReducer,
});

export { appReducers };
