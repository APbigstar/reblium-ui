// Initialize Stripe
const stripe = Stripe("your_publishable_key");
const elements = stripe.elements();
const cardElement = elements.create("card");
cardElement.mount("#card-element");

// Get DOM elements
const amountInput = document.getElementById("amount");
const depositButton = document.getElementById("deposit-button");
const cardErrors = document.getElementById("card-errors");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2R1Y3Rpb25AcmVibGl1bS5jb20iLCJleHAiOjE3MjQzMTA2NDgsImdyb3VwcyI6W3siaWQiOjQxNTEyLCJuYW1lIjoiZGVmYXVsdCIsImlzX2RlZmF1bHQiOnRydWV9XSwiaGFzX2F0dHJzIjp0cnVlLCJpYXQiOjE3MjQyMjQyNDgsImlzX21hc3RlciI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi54c29sbGEuY29tIiwicHJvbW9fZW1haWxfYWdyZWVtZW50IjpmYWxzZSwicHVibGlzaGVyX2lkIjo0MDU0MzUsInN1YiI6IjIwNjUwNTEyLWFmZjUtNDIxZi1iZTRkLTVlMmZkZDZiNzQzYyIsInR5cGUiOiJ4c29sbGFfbG9naW4iLCJ1c2VybmFtZSI6Ik1hbyBMaW4gTGlhbyIsInhzb2xsYV9sb2dpbl9hY2Nlc3Nfa2V5IjoiWUJwekNGbEQzVGs3aVFyODVOMVVkVUcwaXFfemllODJtbTZLMEdsTkJJbyIsInhzb2xsYV9sb2dpbl9wcm9qZWN0X2lkIjoiNGEwNGQwMzctYTFmYi00YmVkLWIyNmItOGZiZDg2Yzk0ODI4In0.gvFi7YTvEdr9XoHSkIO-tHLxMWdql9tX4UFs749JMpg&remember_me=false";

// Add event listeners
cardElement.on("change", function (event) {
  if (event.error) {
    cardErrors.textContent = event.error.message;
  } else {
    cardErrors.textContent = "";
  }
});

depositButton.addEventListener("click", handleDeposit);

async function handleDeposit() {
  console.log("Clicked Deposit button");
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    cardErrors.textContent = "Please enter a valid amount.";
    return;
  }

  depositButton.disabled = true;
  depositButton.textContent = "Processing...";

  try {
    // Create PaymentIntent on your server
    const response = await fetch(
      "/.netlify/functions/createCreditPaymentIntent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'x-xsolla-token': localStorage.getItem('xsollaToken') // Assuming you store the Xsolla token in localStorage
          //  'x-xsolla-token': token // Assuming you store the Xsolla token in localStorage
        },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      }
    );
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to create payment intent");
    }

    const paymentIntent = result.data;

    // Confirm the card payment
    const confirmResult = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "", // You can add a name input if needed
          },
        },
      }
    );

    if (confirmResult.error) {
      throw confirmResult.error;
    }

    if (confirmResult.paymentIntent.status === "succeeded") {
      // Payment successful, confirm on your server
      const confirmResponse = await fetch(
        "/.netlify/functions/confirmCreditPaymentIntent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-xsolla-token": token,
          },
          body: JSON.stringify({
            payment_intent_id: confirmResult.paymentIntent.id,
            amount: amount,
          }),
        }
      );

      const confirmResult = await confirmResponse.json();

      if (!confirmResult.success) {
        throw new Error(confirmResult.error || "Failed to verify payment");
      }

      // Reset form and show success message
      amountInput.value = "";
      cardErrors.textContent = "Payment successful!";
      cardErrors.className = "mt-2 text-green-600 text-sm";
    } else if (confirmResult.paymentIntent.status === "requires_action") {
      // Handle 3D Secure authentication if needed
      window.location.href =
        confirmResult.paymentIntent.next_action.redirect_to_url.url;
    }
  } catch (error) {
    cardErrors.textContent = error.message;
  } finally {
    depositButton.disabled = false;
    depositButton.textContent = "Deposit";
  }
}

// Set the deposit title with email (you'll need to get this from your authentication system)
document.getElementById("deposit-title").textContent = `Deposit for ${email}`;
