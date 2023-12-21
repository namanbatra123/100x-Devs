/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todoList = [];
    this.listLength = 0;
  }

  add(todo) {
    this.listLength++;
    this.todoList.push(todo);
  }

  remove(index) {
    if(this.listLength == 0){
      return null;
    }
    if(index >= 0 && index < this.listLength) {
      this.listLength--;
      this.todoList.splice(index, 1)
    }
  }

  update(index, updatedTodo) {
    if (index >= 0 && index < this.listLength) {
			this.todoList[index] = updatedTodo;
		}
  }

  getAll() {
    return this.todoList;
  }

  get(index) {
    if (index >= 0 && index < this.listLength) {
      return this.todoList[index];
    }
    else{
      return null;
    }
  }

  clear() {
		this.todoList = [];
		this.listLength = 0;
	}
}

module.exports = Todo;
