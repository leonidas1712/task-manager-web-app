import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categories/categoriesSlice';
import tasksReducer from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    tasks: tasksReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// ThunkAction<R,S,E,A> = (dispatch: ThunkDispatch<S,E,A>, getState: () => S, extra: E) => R
// R = ret type of thunk fn. S = type used by getState, E: any extra arg injected, A = Action types dispatched
// where Action<string> means type part of Action is a string 
// function takes in dispatch function, getState and extra as args
// use AnyAction from redux toolkit 

// use AppThunk below for custom thunks not written with cAT. Assumes return type = void. If you want to use
// value returned by the promise (like .unwrap), do AppThunk<Promise<T>> where T is the return type of the promise
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
