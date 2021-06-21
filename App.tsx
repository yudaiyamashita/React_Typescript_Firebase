import React, { useState, useEffect } from "react";

import { FormControl, TextField } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

import { db} from "./firebase";








const App: React.FC = () => {
  const [tasks , setTasks] = useState([{id: "",title: ""}]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot:any) => {
      setTasks(
        snapshot.docs.map((doc:any) => ({id: doc.id, title: doc.data().title}))
      );
    });
    return () => unSub();
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input});
    setInput("");
  };

  return (
    <div className="App">
      <h1>To do App by React/Firebase</h1>
      <FormControl>
        <TextField
        InputLabelProps = {{
          shrink: true,
        }}
        label = "New task?"
        value = {input}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => 
            setInput(e.target.value)
         }/>
      </FormControl>
      <button disabled = {!input} onClick = {newTask}>
        <AddToPhotosIcon />
      </button>

      {tasks.map((task) => (
        <h3 key = {task.id}>{task.title}</h3>
      ))}
    </div>
  );
}

export default App;