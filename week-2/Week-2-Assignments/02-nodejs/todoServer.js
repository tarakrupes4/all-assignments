/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
// const express = require('express');
// const bodyParser = require('body-parser');
// const todos = [];
// const app = express();

// app.use(bodyParser.json());

// app.get("/todos", (req, res) => {
//   if (todos.length > 0) {
//     res.status(200).send(todos);
//   } else {
//     res.status(204).send("Data not found.");
//   }
// });

// app.get("/todos/:id", (req, res) => {
//   let i = req.params.id;
//   if (todos.length >= i) {
//     res.status(200).send(todos[i - 1]);
//   } else {
//      res.status(404).send("Data not found.");
//   }
// });

// const getId = () => {
//   return todos.length + 1;
// }

// app.post("/todos", (req,res) => {
//   const data = req.body;
//   let toData = {
//     ...data, id: getId(),
//   };
//   todos.push(toData);
//   res.status(201).send(todos);
// });

// app.put("/todos/:id", (req, res) => {
//   const data = req.body;
//   const id = req.params.id;
//   if (todos.length >= id) {
//      todos[id-1] = data;
//      res.status(200).send(todos[id-1]);
//   } else {
//     res.status(404).send("NO data to update")
//   }
 
// });

// app.delete("/todos/:id", (req, res) => {
//   const id = req.params.id;
//   if (todos.length >= id) {
//     todos.splice(id-1, 1);
//     res.status(200).send(todos);
//   } else {
//     res.status(204).send("NO data to delete");
//   }
// });

// app.all("*", (req, res) => {
//   res.status(404).send("Route not found");
// });

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const todos = [];

app.get("/todos", (req, res) => {
  if (todos.length > 0) {
    res.status(200).send(todos);
  } else {
    res.status(204).send("No data found.");
  }
});

app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((item) => item.id === id);
  if (todo) {
    res.status(200).send(todo);
  } else {
    res.status(404).send("Data not found.");
  }
});

const getNextId = () => {
  return todos.length + 1;
};

app.post("/todos", (req, res) => {
  const data = req.body;
  const newTodo = { ...data, id: getNextId() };
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  const index = todos.findIndex((item) => item.id === id);
  if (index !== -1) {
    todos[index] = updatedTodo;
    res.status(200).send(updatedTodo);
  } else {
    res.status(404).send("Data not found.");
  }
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((item) => item.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.status(404).send("Data not found.");
  }
});

app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

// app.listen(3001,()=>console.log('Application has started'));

module.exports = app;
