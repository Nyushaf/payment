import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51OWZsPIPzuapBbkCvZUC7ed8Ti1C0TUoFFikadHcUIDnv2dkWvgc1ouqNLef38X6bVJUCcaFNG9TXWF4iE5KJRFO00ZgZsPfZP";

const stripeTestPromise = loadStripe(PUBLIC_KEY);


const Stripe = () => {
    
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm  />
        </Elements>
    );
};

export default Stripe;