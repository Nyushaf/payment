import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm = () => {
    
    const stripe = useStripe();
    const elements = useElements();
    const [messageSuccess, setMessageSuccess] = useState(false);
    
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '20px',
                iconColor: '#3D3B40',
                color: '#424770',
                backgroundColor: '#F8F4EC',
                fontSmoothing: 'antialiased',
                padding: '20px 4px',
                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: '#87BBFD',
                },
            },
            invalid: {
                iconColor: '#FF004D',
                color: '#FF004D',
            },
        },
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
    
        if (!error) {
            console.log("Stripe 23 | token generated!", paymentMethod);
            try {
                const { id } = paymentMethod;
                const response = await axios.post(
                    "http://localhost:8080/stripe/charge",
                    {
                    amount: 999,
                    id: id,
                    }
                );
    
                console.log("Stripe 35 | data", response.data.success);
                if (response.data.success) {
                    console.log("CheckoutForm.js 25 | payment successful!");
                    setMessageSuccess(true)
                }
            } catch (error) {
                console.log("CheckoutForm.js 28 | ", error);
            }
        } else {
            console.log(error.message);
        }
    };

    return (
        <div className="container">
                {!messageSuccess ? 
                <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
                    <CardElement options={cardElementOptions} className="input" />
                    <button>Pay</button>
                </form>
                :
                <div>
                    <h2>Payment success!!!</h2>
                    <h3>Thank you!</h3>
                </div>
                }
        </div>
    );
};