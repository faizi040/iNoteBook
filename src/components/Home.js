import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';
//importing usecontext from react to use context we created

const Home = (props) => {

  return (
    <>
      <AddNote />
    
        <Notes />
        {/* using Notes componnet to get all notes */}
   

    </>
  )
}

export default Home
//nothing but only arrow function base components -same working like function components
