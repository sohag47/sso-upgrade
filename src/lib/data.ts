export type Todo = {
  id: number
  title: string
  completed: boolean
}

export const todos: Todo[] = [
  { id: 1, title: "Learn Next.js Route Handlers", completed: true },
  { id: 2, title: "Build a TypeScript API", completed: false },
]
