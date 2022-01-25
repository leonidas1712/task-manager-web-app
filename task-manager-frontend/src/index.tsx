import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Category from "./features/categories/CategoryPage";
import { getCategories } from './features/categories/categoriesSlice';
import { getTasks } from './features/tasks/tasksSlice';
import IndexPage from './features/IndexPage';
import Upcoming from './upcoming/Upcoming';
import AllTasks from './features/tasks/AllTasks';
import { CATEGORIES_PATH, UPCOMING_PATH, ALL_TASKS_PATH } from './urlHelper';

// get tasks and categories on load
store.dispatch(getCategories());
store.dispatch(getTasks());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<App/>}>
            <Route index element={<IndexPage/>}></Route>
            <Route path = {ALL_TASKS_PATH} element={<AllTasks />}/> 
            <Route path= {UPCOMING_PATH} element={<Upcoming/>} />
            <Route path="*" element= {<Navigate to= "/"/>}/>

            <Route path={CATEGORIES_PATH}>
              <Route index element={<IndexPage/>}></Route>
              <Route path=":categoryId" element={<Category/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
