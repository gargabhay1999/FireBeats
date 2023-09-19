/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const port = 5006;
const app = express();

const SECRET_KEY = "SECRET_KEY"

const stripe = require("stripe")(SECRET_KEY);


app.get("/", (req, res) => {
    res.send("Hello Worlds");
});

app.post("/create-payment-intent", async (req, res) => {
    try {
      const customer = await stripe.customers.create();
      const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2022-11-15'}
      );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        customer: customer.id,
        payment_method_types: ["card"]
      });
      
        // automatic_payment_methods: {
        //   enabled: true,
        // },
    
      res.json({
        clientSecret: paymentIntent.client_secret
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });


app.listen(port, () => {
	console.log(`The application started
				successfully on port ${port}`);
});

exports.app = functions.https.onRequest(app);
/* eslint-enable */
