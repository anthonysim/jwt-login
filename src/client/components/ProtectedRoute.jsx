import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isAuthenticated } from '../actions/index.jsx';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      if (isAuth) {
        return (
          <div >
            <Component />
          </div>
        )
      } else {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    }} />
  )
}

export default ProtectedRoute;
