/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    this.todo = [];
  }
  add(value) {
    this.todo.push(value);
  }
  remove(i) {
    if (i < this.todo.length) {
      this.todo.splice(i, 1);
    }
   }
  update(i, value) {
    if (i < this.todo.length) {
      this.todo.splice(i, 1, value); 
    }
  }
  getAll() {
    return this.todo;
  }
  get(i) {
    if (i < this.todo.length) {
    return this.todo[i];  
    } else {
      return null;
    }
  }
  clear() {
    this.todo = [];
  }
}

module.exports = Todo;
