import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  
import { composeWithDevTools } from "@redux-devtools/extension";
import { loadjobreducer } from './reducers/loadjobsReducer';
import { loadJobTypeReducer } from './reducers/JobTypeReducer';
import { userLoginreducer, userLogoutReducer } from './reducers/userReducer';
// Combine reducers
const reducer = combineReducers({
  loadJobs: loadjobreducer,
  jobTypes: loadJobTypeReducer,
  userSignin: userLoginreducer,
  userLogout: userLogoutReducer
});

// Initial state
let initialState = {
  // usersignin: {  userInfo: localStorage.getItem("userInfo")   ? JSON.parse(localStorage.getItem("userInfo")) : null  }
};

// Middleware array
const middleware = [thunk];

// Create the Redux store with middleware and devtools
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
