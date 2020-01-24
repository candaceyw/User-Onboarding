import React from 'react';
import FormikUserForm from './Components/UserForm';
import './output.css';



function App() {
  return (
    <div className="App">
      <FormikUserForm  user="name"/>
    </div>
  );
}

export default App;
