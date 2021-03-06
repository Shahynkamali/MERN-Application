import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {Container} from 'reactstrap'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './Components/AppNavBar'
import WineList from './Components/WineList'
import ItemModel from './Components//ItemModel'
import {loadUser} from './actions/authActions'

import './App.css'



class App extends Component{
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render(){
    return (
      <Provider store={store}>
        <div>
          <AppNavBar/>
          <Container>
            <ItemModel/>
            <WineList/>
          </Container>
        </div>
      </Provider>
    );

  }
}



export default App;
