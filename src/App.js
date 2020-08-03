import React from 'react';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import {BrowserRouter, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import Navigationbar from './components/Navigationbar'
import Footer from './components/Footer'
import { Row, Container, Col } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigationbar/>
        <Container> 
            <Row>
              <Col lg={12} style={{marginTop:"20px"}}> 
                  <Route path= '/' exact component={Home}/>
                  <Route path= '/register' component={RegisterForm} />
                  {/* <Route path= '/dashboard' component={Dashboard} /> */}
                  <Route path='/login' component={Login}/>
                  <PrivateRoute path='/admindashboard' component={AdminDashboard}/>
                  <PrivateRoute path='/dashboard' component={Dashboard}/>
              </Col>
            </Row>  
        </Container>
        <Footer/>
     </BrowserRouter>   
    </div>
  );
}

export default App;
