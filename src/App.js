import React from 'react';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import {BrowserRouter, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path= '/' exact component={Home}/>
        <Route path= '/register' component={RegisterForm} />
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/admindashboard' component={AdminDashboard}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
     </BrowserRouter>   
    </div>
  );
}

export default App;
