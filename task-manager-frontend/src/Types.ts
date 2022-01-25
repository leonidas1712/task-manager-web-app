export type CreatedAt = {
    created_at: string
}

export type Category = {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}

export type Task = {
    id: number,
    name: string,
    description: string,
    due_date?: string,
    priority?: string,
    category_id: number,
    created_at: string,
    updated_at: string,
}

