const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Response logging middleware
function logResponses(req, res, next) {
    const originalSend = res.send;
    res.send = function (body) {
        console.log("Responding with:", res.statusCode, body);
        originalSend.call(this, body);
    };
    next();
}

app.use(logResponses);  // Make sure to use this middleware before defining your routes


app.post('/', (req, res) => {
    const { notification_type, user, transaction } = req.body;
    console.log("Received webhook data:", req.body);

    if (!notification_type) {
        return res.status(400).json({
            error: {
                code: "INVALID_REQUEST",
                message: "Missing notification type"
            }
        });
    }

    switch (notification_type) {
        case "user_validation":
            return handleUserValidation(user, res);
        case "payment":
            return handlePayment(transaction, res);
        case "order_paid":
            return handleOrderPaid(transaction, res);
        case "order_canceled":
            return handleOrderCanceled(transaction, res);
        default:
            return res.status(400).json({
                error: {
                    code: "INVALID_NOTIFICATION_TYPE",
                    message: "Invalid or unsupported notification type"
                }
            });
    }
});

function handleUserValidation(user, res) {
    if (!user || !user.id) {
        return res.status(400).json({
            error: {
                code: "INVALID_REQUEST",
                message: "Missing user details for validation"
            }
        });
    }
    validateUser(user.id).then(isValidUser => {
        if (!isValidUser) {
            return res.status(400).json({
                error: {
                    code: "INVALID_USER",
                    message: "Invalid user"
                }
            });
        }
        res.status(204).end();
    }).catch(err => {
        console.error("Error during user validation:", err);
        res.status(500).json({
            error: {
                code: "SERVER_ERROR",
                message: "Internal server error during user validation"
            }
        });
    });
}

function handlePayment(transaction, res) {
    if (!transaction || !transaction.id) {
        return res.status(400).json({
            error: {
                code: "INVALID_REQUEST",
                message: "Missing transaction details for payment"
            }
        });
    }
    console.log("This is a action it need to do when payment is going");
    res.status(204).end();
}

function handleOrderPaid(transaction, res) {
    if (!transaction || !transaction.id) {
        console.log("Incomplete transaction data:", transaction);
        return res.status(400).json({
            error: "INVALID_REQUEST",
            message: "Missing transaction details for order completion"
        });
    }
    // Assuming a function updateOrderStatus updates the order status in the database
    updateOrderStatus(transaction.id, 'completed')
        .then(() => {
            console.log("Order completed successfully:", transaction.id);
            res.status(204).end();
        })
        .catch(error => {
            console.error("Failed to update order status:", error);
            res.status(500).json({
                error: "SERVER_ERROR",
                message: "Internal server error while updating order status"
            });
        });
}


function handleOrderCanceled(transaction, res) {
    if (!transaction || !transaction.id) {
        return res.status(400).json({
            error: {
                code: "INVALID_REQUEST",
                message: "Missing transaction details for order cancellation"
            }
        });
    }
    console.log("Handling order cancellation for transaction ID:", transaction.id);
    // Add logic to handle the rollback or update of the order
    res.status(204).end();
}


app.use('/.netlify/functions/xsolla_user_validation', express.Router().use('/', app));
module.exports.handler = serverless(app);





// Example function to simulate database user validation
function validateUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(userId === "84e2dc32-9624-45ec-956e-dfed3b0b6e65"); // Example user ID validation
        }, 100);
    });
}
