import { CreatedAt } from "./Types";

// sidebar is position: fixed, need explicit width
export const sidebarWidth = "15rem";

// Loading status for tasks, categories
export enum Loading {
    IDLE = "idle",
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}

// earliest created comes first - default sort comparer for keeping in Redux store
// JS allows date subtraction but typescript needs numeric values
export const sortComparer = (fst:CreatedAt, snd:CreatedAt) => {
    return new Date(fst.created_at).getTime() - new Date(snd.created_at).getTime()
};


