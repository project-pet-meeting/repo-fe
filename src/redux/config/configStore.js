//기존 store incourse 프로젝트 때 사용했던 방식
import { configureStore } from "@reduxjs/toolkit";
import defaultSlice from "../modules/defaultSlice";

const store = configureStore({

  reducer: {
    something: defaultSlice,
  }

});

export default store;


// //legacy type
// import { applyMiddleware, combineReducers } from "redux";

// const rootReducer = combineReducers({
//   todos,
// });
// const store = createStore(rootReducer, applyMiddleware(logger));

// export default store;


// // createStore 내부
// const validateAction = action => {
//   if (!action || typeof action !== 'object' || Array.isArray(action)) {
//     throw new Error('Action must be an object!');
//   }
//   if (typeof action.type === 'undefined') {
//     throw new Error('Action must be have a type!');
//   }
// };

// const createStore = (reducer) => {
//   let state = undefined; //
//   dispatch({type: ActionType.INIT}) //

//   return {
//     dispatch: (action) => {
//       validateAction(action)
//       state = reducer(state, action); //
//     },
//     getState: () => state,
//     //...
//   };
// };

