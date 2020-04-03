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
        < ChatPage />
    </div>
  );
}

 }

export default App;
