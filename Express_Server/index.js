var express = require('express');
var app = express();
const port= 3000;
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import handle methods
myfileOperations = require('./handle.js'); 

const myTodosPath = '../CLI_Todos/todo.json';
const path = require('path'); //to concatinate __dirname,anyfile --> to make absolutePath
                              //path.join(__dirname,"abc.json");

//get my Todos
const myfiletodos = fs.readFileSync(
  "../CLI_Todos/todo.json",(encoding = "utf8"));
  const myTodos = JSON.parse(myfiletodos || "[]");
  //need to convert the array of object to array of todos
  todos = [];
  myTodos.map((todo) => {
    todos.push(todo.todo);
  });
  console.log(todos);
//data to be sent to the homepage
todoAsHtml =
  "<body style='background-color:gray;'><div style='padding-top:50px;text-align:center;background-color:darkred;width:250px;height:500px;margin:50px auto'>";

todos.forEach((element) => {
  todoAsHtml += `<h1><a href="#" style="text-decoration:none; color:white">${element}</a></h1>`;
});
todoAsHtml += "</div>";
// 


app.get(['/','/home'],function(req,res){
    res.send(todoAsHtml);
    console.log(req.url);
})
app.post('/post',(req,res)=>{
    //code logic for add to todo
  
    console.log(req.body.todo);
    const { todo }=req.body; 
    myfileOperations.addTodo(myTodosPath,todo);
    // res.contentType('application/json');
    return res.status(200).send("todo created successfully");
})

app.put('/:id', function (req, res) {
    //code logic for edit certain todo
    res.send('PUT request to Todos')
})

app.delete('/delete/:id', function (req, res) {
    res.send('DELETE request from Todos')
})


app.listen(port);
console.log(`application started at :http://localhost:${port}`);