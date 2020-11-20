import React from 'react';
import Register from './Register';

function App() {

  function checkLoggedIn(){
    return false;
  }

  function navLoggedIn(){

  }
  function navNotLoggedIn(){
    
  }

  return (
    <div>
      <Register/>
    </div>
  )
}

export default App
