import React from "react";
import { withRouter } from 'react-router-dom';

const Protected = () => {
  return (
    <div>
      <h1>You are Logged in!</h1>
      <br />
      <div className="bitcoin">Bitcoin Wallet: 1,000</div>
      <div className="bitcoin">Total Value: $35,000,000</div>
    </div>
  )
};


export default withRouter(Protected);