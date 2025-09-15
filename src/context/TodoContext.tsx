"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

type Action =
  | {
      type: "ADD_TODO";
      payload: { text: string; priority: "low" | "medium" | "high" };
    }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "EDIT_TODO"; payload: { id: string; text: string } }
  | {
      type: "EDIT_PRIORITY";
      payload: { id: string; priority: "low" | "medium" | "high" };
    }
  | { type: "REORDER_TODOS"; payload: { todos: Todo[] } }
  | { type: "SET_TODOS"; payload: Todo[] };

interface State {
  todos: Todo[];
}

interface TodoContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState: State = {
  todos: [],
};

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: action.payload.text,
            completed: false,
            priority: action.payload.priority,
          },
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo,
        ),
      };
    case "EDIT_PRIORITY":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, priority: action.payload.priority }
            : todo,
        ),
      };
    case "REORDER_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch({ type: "SET_TODOS", payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    if (state.todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    }
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
