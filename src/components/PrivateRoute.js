import React from 'react';

import {Redirect, Route} from 'react-router-dom';

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure();
// let message = toast('Sign In To Continue');

const PrivateRoute = ({ component: Component, ...rest}) =>(
    <Route
       {...rest}
       render={props=>
           localStorage.getItem("token")?(
               <Component{...props}/>
           ):(
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location},
            
                }} 
                />
            ) 
       }
    />
)

export default PrivateRoute;