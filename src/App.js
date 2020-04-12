import React from 'react';
import './App.css';
import ChatPage from './components/ChatPage';
import Homepage from './components/Homepage';
import Register from './components/Register';
import { BrowserRouter as Router, Switch, Route, Link ,NavLink, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { auth } from './actions';


 class App extends React.Component {

  constructor(props){
    super(props);
  }

  async componentWillMount(){
    console.log("loading user");
    await this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (!this.props.auth.isAuthenticated) {
        console.log('app.js not authenticate');
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() { 
    let {PrivateRoute} = this;
      return (
      <div className="App">
          <Switch>
            <PrivateRoute path="/chatpage" component={ChatPage} />
            <Route path="/register" component={Register} />
            <Route exect path='/' component={Homepage} />
          </Switch>
          {/* < ChatPage /> */}
      </div>
    );
  }

 }

 const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
