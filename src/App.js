import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path= '/' exact component={Home}/>
        <Route path= '/register' component={RegisterForm} />
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
     </BrowserRouter>   
    </div>
  );
}

export default App;
