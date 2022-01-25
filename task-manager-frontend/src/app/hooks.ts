import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

/*
https://react-redux.js.org/using-react-redux/usage-with-typescript

For useSelector, it saves you the need to type (state: RootState) every time

For useDispatch, the default Dispatch type does not know about thunks or other middleware. 
In order to correctly dispatch thunks, you need to use the specific customized AppDispatch type from the store 
that includes the thunk middleware types, and use that with useDispatch. 
Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where it's needed.
*/
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
