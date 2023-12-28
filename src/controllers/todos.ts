import express, { RequestHandler } from "express";

import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(200).json({ message: "Created the todo.", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json(TODOS);
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    const deletedTodo = TODOS.splice(todoIndex, 1)[0];

    res.status(200).json({ message: "Deleted", deletedTodo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

export const editTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id;
  const newText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    TODOS[todoIndex].text = newText;
    res.status(200).json({ message: "Edited", editedTodo: TODOS[todoIndex] });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};
