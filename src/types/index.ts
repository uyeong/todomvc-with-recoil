interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

enum TodoFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}

interface TodoStats {
  all: number,
  active: number,
  completed: number,
}

export { TodoFilter };
export type { Todo, TodoStats };