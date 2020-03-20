import React from 'react';
import './App.css';
import ChatPage from './components/ChatPage';

 class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() { 
    return (
    <div className="App">
        <div className="navbar">
            <span className="groupchat-name">#ผนงรจตกม</span>
            <a href="#">EXIT</a>
        </div>
        < ChatPage />
    </div>
  );
}

 }

export default App;
