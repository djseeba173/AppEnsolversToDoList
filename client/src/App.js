import React, { useState , useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const task_todo = {
    description: "",
    complete: false,
  }
  const [task , setTask] = useState('');
  const [taskList, setTaskList] = useState([])

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setTaskList(response.data)
    })
  }, [])

  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      description: task
    });

    setTaskList([
      ...taskList,
       {description: task},
      ]);
  };

  const deleteTask = (description) =>{
    Axios.delete(`http://localhost:3001/api/delete/${description}`);

  }

  const [newTask, setNewTask] = useState("");

  const updateTask = (oldTask) =>{
    Axios.put("http://localhost:3001/api/update", {
      oldDescription: oldTask,
      newDescription: newTask
    });
    let old = taskList.find(e=> e.description===oldTask)
    old.description = newTask
    setNewTask("");

  }


  return (
    <div className="App">
      <h1> ToDo List </h1>
      <div type="form" className="form"> 
        <label> Insert Task to do </label>
        <form>
          <input required="required" type="text" name="task" onChange={(e) =>{
            setTask(e.target.value)
          }} />
        </form>

        <button onClick={submitReview}> Add </button>
        <label> Tasks To do </label>
        <ul>
        {taskList.map((val)=> {
          return( 
          <div className='div'>
            <input type="checkbox" />
            <li> {val.description} </li>
            <button className='botoncito' onClick={()=> {deleteTask(val.description)}}> Delete </button>
            <div className='cajita'>
              <input type="text" id="updateInput" onChange={(e) => setNewTask(e.target.value)}/>
              <button className='botoncito' onClick={()=> (updateTask(val.description))}> Update </button>
            </div>
          </div>)
        })}
        </ul>
      </div>
    </div>
  );
}

export default App;
