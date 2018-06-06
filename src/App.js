import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Password from './components/password';
import Modal from './components/modal';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App container">
          <Modal />
          <Password />
        </div>
      </Provider>
    );
  }
}

export default App;
