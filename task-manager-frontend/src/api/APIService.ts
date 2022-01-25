import { Category, Task } from "../Types";
import axios from 'axios';

// APIService functions to interface with API without knowing url, HTTP req details etc.
// object for use in POST request to add task
export type TaskPostObject = {
    name: string;
    description?: string | null;
    due_date?:string | null 
    priority?: string | null
}

export type CategoryPostObject = {
    name: string
}

// Assume all inputs have been sanitised at this point
// TODO: refactor all inputs to have only one arg (or none), with type: { params?:..., body?:...} 
    // in order to match async thunks
const { REACT_APP_API_URL:API_URL } = process.env;
const CATEGORIES_NAME = "categories";
const TASKS_NAME = "tasks";

const CATEGORIES = API_URL + CATEGORIES_NAME;
const TASKS = API_URL + TASKS_NAME;

// to test loading/spinners
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// GET categories/
async function getCategories(): Promise<Category[]> {
    const res = await axios.get<Category[]>(CATEGORIES);
    return res.data;
}

// POST categories/, body: { name: string }
async function addCategory(name: string): Promise<Category> {
    const res = await axios.post<Category>(CATEGORIES, { name });
    return res.data;
}

// GET tasks/
async function getTasks(): Promise<Task[]> {
    const res = await axios.get<Task[]>(TASKS);
    return res.data;
}

// DELETE tasks/:id
// return id of task that was deleted
async function deleteTask(id: number): Promise<number> {
    const url = `${TASKS}/${id}`;
    const res = await axios.delete<Task>(url);
    return res.data.id;
}

// POST /categories/:id/tasks
// return added task
async function addTask(categoryId:number, body: TaskPostObject): Promise<Task> {
    const url = `${CATEGORIES}/${categoryId}/${TASKS_NAME}`;
    const res = await axios.post<Task>(url, body);
    return res.data;
}

// PATCH /tasks/:taskid
// receive params in sep. object so can re-use TaskPostObject type
// return edited task
export type EditTaskParams = { taskId: number }
export type TaskPatchObject = {
    name: string;
    category_id: number
    description?: string | null;
    due_date?:string | null 
    priority?: string | null
 }
async function editTask(params:EditTaskParams, body: TaskPatchObject): Promise<Task> {
    const { taskId } = params;
    const url = `${TASKS}/${taskId}`;
    const res = await axios.patch<Task>(url, body);
    return res.data;
}

// PATCH /categories/:id
// return category that was edited
export type EditCategoryParams = { categoryId: number}
async function editCategory(params: EditCategoryParams, body: CategoryPostObject): Promise<Category> {
    const { categoryId } = params;
    const url = `${CATEGORIES}/${categoryId}`;
    const res = await axios.patch<Category>(url, body);
    return res.data;
}

// DELETE /categories/:id
// return category that was deleted
export async function deleteCategory(params: EditCategoryParams):Promise<Category> {
    const { categoryId } = params;
    const url = `${CATEGORIES}/${categoryId}`;
    const res = await axios.delete<Category>(url);
    return res.data;
}

export {
    getCategories,
    addCategory,
    getTasks,
    deleteTask,
    addTask,
    editTask,
    editCategory
}
