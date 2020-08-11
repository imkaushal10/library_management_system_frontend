import React from 'react';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import {BrowserRouter, Route} from 'react-router-dom'
import Dashboard from './components/Client/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import Books from './components/Books'
// import Navigationbar from './components/Navigationbar'
import Footer from './components/Client/Footer'
import Users from './components/Users'
import { } from 'reactstrap';

function App() {
  return (
    <div className="App" style={{marginTop: '20px'}}>
      <BrowserRouter>

        <Route path= '/' exact component={Home}/>
        <Route path= '/register' component={RegisterForm} />
        {/* <Route path= '/dashboard' component={Dashboard} /> */}
        <Route path='/login' component={Login}/>
        <Route path='/update/:id' exact component={AdminDashboard}/>
        <Route path='/books' exact component={Books}/>
        <Route path='/users' exact component={Users}/>
        <PrivateRoute path='/admindashboard' component={AdminDashboard}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
             

        <Footer/>
     </BrowserRouter>   
    </div>
  );
}

export default App;
