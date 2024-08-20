const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const crypto = require('crypto');  // Node.js crypto module for generating HMAC

const app = express();
const router = express.Router();


app.post('/', (req, res) => {
    console.log("Received Webhook:", req.body);  // Log the entire request body

    if (!verifySignature(req)) {
        return res.status(401).send('Invalid signature');
      }
    
      // Process the successful payment
      const orderId = req.body.order.id;
      const items = req.body.items;
      console.log(`Order ${orderId} paid with items:`, items);
    
      // Update your system with the payment information
      res.status(204).send();
});




function handleOrderPaid(order, user, items) {
    console.log('Handling order paid:', { order, user, items });
    // Your logic for handling a successful payment
}



app.use('/.netlify/functions/xsolla_oder_paid', router);

module.exports = app;
module.exports.handler = serverless(app);
