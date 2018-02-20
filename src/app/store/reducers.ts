
import { combineReducers } from 'redux';

import { matrixReducer } from '../matrix/reducer';

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = 
  combineReducers({
    matrixReducer: matrixReducer
  });