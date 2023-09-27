import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import noteContext from './context/notes/noteContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';


// react function base components
function App() {
  const host = "http://localhost:5000"

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState(null);
  // //using State variable and passing it as value to context

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  // fuction to get all notes

  const getNotes = async () => {
    //Api call
    try {


      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },

        //data will be an object {title:title,desription:description,tag:tag}
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects

      setNotes(json);

    } catch (error) {
      console.log(error);
    }


  }

  // function to add new note
  const addNote = async (title, description, tag) => {
    //Api call to add in database
    try {


      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        //data will be an object {title:title,desription:description,tag:tag}
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      if (json) {
       showAlert("Data added successfully","success");
      }
    } catch (error) {
      // console.log(error);
      console.log(error);
      showAlert("some problem Occured","danger");
    }


  }
  const deleteNote = async (id) => {
    try {
      //Api call to delete in database
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },

      });
      const json = response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      //logic to delete in client
      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes);
      // console.log("deleltin the note with id:", id);
      showAlert(`Deleted the note successfully`,"success")
    } catch (error) {
      // console.log(error)
      console.log(error);
      showAlert("some problem Occured","danger");
    }


  }
  const editNote = async (id, title, description, tag) => {
    //Api call
    try {


      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      showAlert(`Note updated successfully`,"success")

      //logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    } catch (error) {
      console.log(error);
      showAlert("some problem Occured","danger");
    }

  }



  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {/* {{notes,setNotes}}==={{notes:notes,setNotes:setNotes}} */}
      {/* now you can use this state variable notes and setNotes function within all components wrapped in this noteContext.Provider segement */}
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />

        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} ></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} /> } ></Route>
            <Route exact path="/signUp" element={<SignUp showAlert={showAlert}/>} ></Route>

          </Routes>


        </div>
      </BrowserRouter>
    </noteContext.Provider>

  )

}
export default App;







