import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';

class Concursante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primerDato: 0
    };
  }
  render() {
    const obtenerPuntaje = (opcion) => {
      firebase.database().ref(opcion).once('value').then((span)=> {
        var childKey = span.key;
        var childData = span.val();
        childData++;
        this.setState(function () {
          return {
            primerDato: childData
          }
        });
        firebase.database().ref(opcion).set(childData).then(() => {
          console.log('cuenta actualizada!');
        });
      });

    }


    return (
      <div>
        <p>{
          this.state.primerDato
        }</p>
        <Button bsStyle="primary" onClick={() => obtenerPuntaje(this.props.opcion)}>
        {this.props.opcion}</Button>
      </div>
    );
  }
}


class App extends Component {
  
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBPqzc7lM12Y1WQCwxDvrXmyiR-SOobb68",
      authDomain: "talentnight-7ec3d.firebaseapp.com",
      databaseURL: "https://talentnight-7ec3d.firebaseio.com",
      projectId: "talentnight-7ec3d",
      storageBucket: "talentnight-7ec3d.appspot.com",
      messagingSenderId: "20735400064"
    };
    firebase.initializeApp(config);

  }

  render() {
		/*firebase.database().ref('alumno').on ('value',  function (span) {
			var childKey = span.key;
			var childData = span.val();
			alert('new element'+ childData);
		});*/

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Concursante opcion={'opcion1'}/>
        <Concursante opcion={'opcion2'}/>
      </div>
    );
  }
}

export default App;
