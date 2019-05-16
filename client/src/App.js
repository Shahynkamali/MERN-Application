import React from 'react';
import {Provider} from 'react-redux'
import {Container} from 'reactstrap'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './Components/AppNavBar'
import WineList from './Components/WineList'
import ItemModel from './Components//ItemModel'

import './App.css';



function App() {
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

export default App;
