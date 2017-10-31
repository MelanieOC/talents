import React, { Component } from 'react';
import './App.css';
import { Button, Image, Col, Row, Navbar, Nav, NavItem } from 'react-bootstrap';
import * as firebase from 'firebase';
import { individuales, grupales } from './data.js';
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'

const Navs = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1}><NavLink className='navlink' exact to="/">Home</NavLink></NavItem>
          <NavItem eventKey={2}><NavLink className='navlink' to="/individual">Individual</NavLink></NavItem>
          <NavItem eventKey={2}><NavLink className='navlink' to="/grupal">Grupal</NavLink></NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
class MostrarParticipantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primerDato: 0,
      votadoGrupal: false,
      votadoIndividual: false
    };
  }
  render() {
    const obtenerPuntaje = (opcion) => {
      firebase.database().ref(opcion).once('value').then((span) => {
        var childKey = span.key;
        var childData = span.val();
        childData++;
        firebase.database().ref(opcion).set(childData).then(() => {
          if (this.props.array === individuales) {
            this.setState(function () {
              return {
                votadoIndividual: true
              }
            });
          } else {
            this.setState(function () {
              return {
                votadoGrupal: true
              }
            });
          }

        });
      });
    }
    const comparar = this.props.array === individuales ? this.state.votadoIndividual : this.state.votadoGrupal;
    return (
      <div style={{ padding: '20px' }}>
        <Row>
          {
            comparar ? <h1>GRACIAS POR VOTAR</h1> :
              this.props.array.map(item => {
                return (
                  <Col md={6} sm={6} className='participante'>
                    <Image src={item.image} className={item.tipo} circle responsive />
                    <p className='nombre'>{item.user}</p>
                    <Button className='voto' bsStyle="primary" bsSize="large" onClick={() => obtenerPuntaje(item.nombre)}>
                      <i className="fa fa-star" aria-hidden="true"></i> Vote
                    </Button>
                  </Col>
                );
              })
          }
        </Row>
      </div>
    );
  }
}
/*
<div className='voto'>{
                    this.state.primerDato
                  }</div>
*/
const Home = () => {
  return (
    <div>
      <h1>Vota por tu favorita</h1>
    </div>
  );
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

    return (
      <BrowserRouter>
        <div className="App">
          <Navs />
          <div className='content'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/individual" render={() => <MostrarParticipantes array={individuales} />} />
              <Route path="/grupal" render={() => <MostrarParticipantes array={grupales} />} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>

    );
  }
}



export default App;
