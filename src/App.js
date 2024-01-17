import React, { useState } from "react";
import StripeContainer from "./Stripe/StripeContainer";
import './App.css';
import banana from './banana.jpg';

function App() {
  const [buyItems, setBuyItems] = useState(false);

  const handleChange = () => {
    setBuyItems(true);
  }
  return (
    <div className="App">
      {buyItems ? <StripeContainer /> : 
      <div className="center">
        <h1>FRUIT SHOP</h1>
        <h3>9.99 CAD</h3>
        <img src={banana} alt="banana" width="300px"/>
        <br />
        <button onClick={handleChange}>BUY</button>
      </div>
      }
    </div>
  );
}

export default App;
