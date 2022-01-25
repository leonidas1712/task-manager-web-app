// for url related constants, functions, hooks

import { useLocation, useNavigate } from "react-router-dom";
export const CATEGORIES_PATH = "categories";
export const UPCOMING_PATH = "upcoming";
export const ALL_TASKS_PATH = "all";

// assumption: id is numeric, and non-category related page paths are not numeric
const isId = (url:string | number):boolean => {
    return !isNaN(Number(url));
}

// take in url location.pathname from useLocation and return the page id (upcoming or category id)
// format: /BASE_URL/:id e.g '/categories/113', page id might be blank
const pageIdFromUrl = (url:string):string => {
    // use split on "/" to get the very last part of the url: either a string like upcoming or a numeric id
    const arr =  url.split("/");
    return arr[arr.length - 1];
}

// to access the path at the very end of the url
// e.g /categories/123 -> pageId = 123, /upcoming => pageId = upcoming
export function usePageId() {
    const location = useLocation();
    return pageIdFromUrl(location.pathname);
}

// custom use navigate that takes in only the desired path (last part of url) and routes based on
// whether it is a category id (numeric) or something else
// so that we don't have to keep calling /categories/ etc. inside components
export function useNavigateHelper() {
    const navigate = useNavigate();

    function customNavigate(path: string | number | null) {
        if (path == null) {
            return navigate("");
        }

        if (isId(path)) {
            const url = `${CATEGORIES_PATH}/${path}`;
            return navigate(url);
        }

        return navigate(path + "");
    }

    return customNavigate;
}

