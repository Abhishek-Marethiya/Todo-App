import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Create from "./Create";

import { v4 as uuidv4 } from "uuid";
function Home() {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState("all"); // New state for filter
  const allButtonRef = useRef(null);
  const finishedButtonRef = useRef(null);
  const unfinishedButtonRef = useRef(null);
  const inputref = useRef(null);
  

  
  
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    console.log(todoString);
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  // Sync todos state with local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
 
  // Set focus on the "All" button initially
  useEffect(() => {
    if (allButtonRef.current) 
      {
        allButtonRef.current.focus();
      }
  }, []);
  const resetFocus=()=>{
    if(filter==="finished") finishedButtonRef.current.focus();
    else if(filter==="unfinished") unfinishedButtonRef.current.focus();
    else allButtonRef.current.focus();
  }

  // const handleClick = (event) => {
  //   console.log(event);
  //   // Your function logic here
  // };
  //   window.addEventListener("click", handleClick)


  //take data from its child
  const getData = (data) => {
    setTodos([...todos, { id: uuidv4(), data: data, isCompleted: false }]);
    if (isEditing) {
      toast.success("Todo updated successfully!", {
        position: "top-right",
      });
      setIsEditing(false);
    } else {
      toast.success("Todo added successfully!", {
        position: "top-right",
      });
    }

    setData("");
    setFilter("all");
    allButtonRef.current.focus();
  
  };

  //delete item
  const handelDelete = (id) => {
   
      const newTodos = todos.filter((todo) => {
        return todo.id != id;
      });
      setTodos(newTodos); //set/render new List
      toast.success("Todo Deleted Successfully .", {
        position: "top-right",
      });
    
      resetFocus();
  
  };
  const handleEdit = (id) => {
    setIsEditing(true);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let data = todos[index].data;
    const newTodos = todos.filter((todo) => {
      return todo.id != id;
    });
    setTodos(newTodos); //set/render new List
    setData(data);
    resetFocus();
   
  };


  //check item
  const handleCheckBox = (e) => {

    let id = e.target.id;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    if (e.target.checked) {
      toast.success("Todo marked as completed!", {
        position: "top-left",
      });
    } else {
      toast.success("Todo marked as incompleted!", {
        position: "top-left",
      });
    }

    resetFocus();
  };

  //imp*****
  const filteredTodos = todos.filter((todo) => {
    if (filter === "finished") return todo.isCompleted;
    if (filter === "unfinished") return !todo.isCompleted;
    return true; // Default is "all"
  });



  return (
    <>
      <h1>TODO APP</h1>
      <Create
        getData={getData}
        data={data}
        setData={setData}
        inputref={inputref}
      />

      <h3>Your Todos...</h3>
      <div className="buttons">
        <button ref={allButtonRef} onClick={() => setFilter("all")}>
          All
        </button>
        <button ref={finishedButtonRef} onClick={() => setFilter("finished")}>Finished Todos</button>
        <button ref={unfinishedButtonRef} onClick={() => setFilter("unfinished")}>
          Unfinished Todos
        </button>
      </div>
      {filteredTodos.length === 0 ? (
        <div className="todos">
          <p>Your todo list is currently empty.</p>
        </div>
      ) : (
        <div className="todos">
          {filteredTodos.map((todo, key) => (
            <div className="todo" key={key}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  id={todo.id}
                  className="chkbox"
                  onChange={handleCheckBox}
                  checked={todo.isCompleted}
                />
                <div
                  className={`tododata ${
                    todo.isCompleted ? "linethrough" : ""
                  }`}
                >
                  {todo.data}
                </div>
              </div>
              <div className="todo-icons">
                <FaRegEdit
                  className="editIcon"
                  onClick={() => handleEdit(todo.id)}
                />
                <MdDelete
                  className="icon"
                  onClick={() => handelDelete(todo.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
