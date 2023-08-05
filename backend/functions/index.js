/* eslint-disable */
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");

// Importing express module
const express = require("express");
// const cors = require('cors');

// Importing mongoose module
const port = 5000;
const app = express();
// app.use(cors());
const stripe = require("stripe")("sk_test_51NbgfDSBx5aTVTJHejkHNpd8abuaHUNO7Y\
3qd20wLN3EfwLvQQrbny0W2iuqQoqRHrLEv9NqqUx4thk4rfu5lNmI00Wfv4tmQi");


// Handling the get request
app.get("/", (req, res) => {
    res.send("Hello Worlds");
});
app.get("/payment-sheet", async (req, res) => {
	res.send("Hello World Post");
});

app.post("/payment-sheet", async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-11-15'}
    );
    console.log('customer ida : '+customer.id);
    console.log('ephemeralKey : '+ephemeralKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'eur',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'
    });
  });

// Starting the server on the 80 port
app.listen(port, () => {
	console.log(`The application started
				successfully on port ${port}`);
});

exports.app = functions.https.onRequest(app);
/* eslint-enable */
