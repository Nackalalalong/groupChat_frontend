import React from 'react';
import './App.css';
import ChatPage from './components/ChatPage';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Switch, Route, Link ,NavLink} from 'react-router-dom';

 class App extends React.Component {

  constructor(props){
    super(props);
  }
  render() { 
    return (
    <div className="App">
        <Router>
          <Switch>
          
          <Route path="/chatpage" component={ChatPage} />
           
          <Route exect path='/' component={Homepage} />
          </Switch>
        </Router>
        {/* < ChatPage /> */}
    </div>
  );
}

 }

export default App;
