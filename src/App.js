import React, { useEffect } from 'react';
import firebase from './firebase';
import './App.css';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")

  const db = firebase.firestore().collection("todos")

  useEffect(() => {
    db.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      });
    setTodos(items)
    });
  });

  function handleSubmit(e)
  {
    e.preventDefault()

    const newTodo = {
      id: uuidv4(),
      todo: todo,
      completed: false,
    }

    db.doc(newTodo.id).set(newTodo)

    setTodo("")
  }

  function deleteTodo(id)
  {
    db.doc(id).delete()
  }

  function completeTodo(id)
  {
    db.doc(id).get().then((x) => {
        if (x.exists)
          x.ref.update({ completed: !x.data().completed });
    })
  }

  function editTodo(id)
  {
    const updateTodos = [...todos].map((todo) => {
      if(todo.id === id)
      {
        const updatedTodo = {
          todo: editingText
        }

        db.doc(id).update(updatedTodo)
      }
    })

    setTodoEditing(null)
    setEditingText("")
  }

  const headerStyle = {
    color: "white",
    position: "absolute",
    width:"100%",
    top: "0px",
    left: "0px",
    backgroundColor: "#3CB371",
    padding: "10px",
    fontFamily: "Arial",
    fontSize: "300%",
    marginTop: "0px",
    marginLeft: "-5px"
  };

  const boddy = {
    backgroundColor: "whitesmoke",
    marginLeft: "0px",
    marginTop: "0px",
    position: "absolute",
    height: "100%",
    width: "100%",
  };

  const todoForm = {
    position: "absolute",
    top: "20%",
    left: "22%",
    width: "60%",
  };

  const todoField = {
    position: "relative",
    width: "90%",
    height: "35px",
    border: "1px solid #000",
  };

  const successButton = {
    position: "relative",
    height: "40px",
    width: "70px",
    margin: "0px 0px 0px 4px",
    backgroundColor: "#32CD32",
    border: "0.5px solid",
    borderRadius: "5px",
    color: "#FFFFFF",
  };

  const editsuccessButton = {
    position: "relative",
    float: "right",
    height: "40px",
    width: "70px",
    margin: "-4px 0px 0px 4px",
    backgroundColor: "#32CD32",
    border: "0.5px solid #FFFFFF",
    borderRadius: "5px",
    color: "#FFFFFF",
  };

  const todoStyle = {
    position: "relative",
    top:"200px",
    left: "22.5%",
    backgroundColor: "#3CB371",
    color: "white",
    width: "57%",
    padding: "20px",
    marginTop: "1%",
    borderRadius: "7px",
    textAlign: "left"
  };

  const editField = {
    position: "relative",
    width: "70%",
    height: "35px",
    border: "1px solid #000",
  };

  const notCompText = {
    fontSize:"150%",
    fontWeight:"Bold"
  };

  const compCheck = {
    height: "20px",
    width: "20px",
    marginRight: "30px"
  };

  const editStyle = {
    position: "relative",
    height: "40px",
    width: "65px",
    margin: "-4px 0px 0px 4px",
    backgroundColor: "#DCDCDC",
    border: "0.5px solid",
    borderRadius: "5px",
    color: "#333333",
    float: "right",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const delLink = {
    position: "relative",
    height: "40px",
    width: "40px",
    margin: "-4px 0px 0px 4px",
    backgroundColor: "tomato",
    border: "0.5px solid",
    borderRadius: "5px",
    color: "#FFFFFF",
    float: "right",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (

    <div className="App" style={boddy}>
      
      <h1 style={headerStyle}>Todo List</h1>
      
      <form onSubmit={handleSubmit} style={todoForm}>
        <input type="text" style={todoField} onChange={(e) => setTodo(e.target.value)} value={todo} /><button style={successButton} type="submit">Add</button>
      </form>
      
      {todos.map((x) => 
      <div key={x.id} style={todoStyle} className="todoTask">

      <input type="checkbox" style={compCheck} onChange={() => completeTodo(x.id)} checked={x.completed} />
      
      {todoEditing === x.id?(<input type="text" style={editField} onChange={(e) => setEditingText(e.target.value)} value={editingText} />):
      (<span style={notCompText}>{x.todo}</span>)}
          
      {todoEditing === x.id?
      (<button style={editsuccessButton} onClick={() => editTodo(x.id)}>Save</button>):
      (<button style={editStyle} onClick={() => setTodoEditing(x.id)}>Edit</button>)}

      <button style={delLink} onClick={() => deleteTodo(x.id)}> X </button> 
      
      </div>)}
    
    </div>
  );
}

export default App;
