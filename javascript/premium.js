const premium_stripe = Stripe(
  "pk_test_51Lk3NyF22hdHq8pHZqvo4zdHTulTRAOglzRh9mYLFoBTxxNYf6KsBbuE6sva3HMNkoNzK5QG3Dni3trOyyKBTmac00DpBp4Cpb"
);
const premium_element = premium_stripe.elements();
const premium_cardElement = premium_element.create("card");

let selectedPeriod = "monthly";
let selectedPlan = "premium";

const monthlyBtn = document.getElementById("monthlyBtn");
const annuallyBtn = document.getElementById("annuallyBtn");
const freeCredits = document.getElementById("freeCredits");
const premiumCredits = document.getElementById("premiumCredits");
const proCredits = document.getElementById("proCredits");
const premiumPrice = document.getElementById("premiumPrice");
const proPrice = document.getElementById("proPrice");

const planID = {
  premium: { monthly: 1, yearly: 2 },
  pro: { monthly: 3, yearly: 4 },
};

document.addEventListener("DOMContentLoaded", async function () {
  premium_cardElement.mount("#premium-card-element");
});

async function handlePremiumPay() {
  const depositButton = document.getElementById("premium-start-button");
  const cardErrors = document.getElementById("premium-card-errors");
  premium_cardElement.on("change", function (event) {
    if (event.error) {
      cardErrors.textContent = event.error.message;
    } else {
      cardErrors.textContent = "";
    }
  });
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AcmVibGl1bS5jb20iLCJleHAiOjE3MjQ0Mzc2NzgsImdyb3VwcyI6W3siaWQiOjQxNTEyLCJuYW1lIjoiZGVmYXVsdCIsImlzX2RlZmF1bHQiOnRydWV9XSwiaGFzX2F0dHJzIjp0cnVlLCJpYXQiOjE3MjQzNTEyNzgsImlzX21hc3RlciI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi54c29sbGEuY29tIiwicHJvbW9fZW1haWxfYWdyZWVtZW50IjpmYWxzZSwicHVibGlzaGVyX2lkIjo0MDU0MzUsInN1YiI6ImQ2NWUzODBmLThlMTYtNDNjMS1iOTEwLWE0ODVjMTZkM2EyNyIsInR5cGUiOiJ4c29sbGFfbG9naW4iLCJ1c2VybmFtZSI6IkRlbW8gUmVibGl1bSIsInhzb2xsYV9sb2dpbl9hY2Nlc3Nfa2V5IjoiNUN6ZU11MTNmZWY2cXVpR2FDX1pIRzJlcnBFVUhoLUlhTmFIdDl2Y3E0WSIsInhzb2xsYV9sb2dpbl9wcm9qZWN0X2lkIjoiNGEwNGQwMzctYTFmYi00YmVkLWIyNmItOGZiZDg2Yzk0ODI4In0.7IOvVh6ifTrvNZ9om-21UJVG89ZugJ4F8Qi3_-IPzUQ&remember_me=false";

  depositButton.disabled = true;
  depositButton.textContent = "Processing...";

  try {
    // Create PaymentIntent on your server
    const response = await fetch("/.netlify/functions/createSubscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsolla-token": token, // Ensure this line is included
      },
      body: JSON.stringify({
        plan_id: planID[selectedPlan][selectedPeriod],
        userId: globalUserInfoId,
        userEmail: globalUserEmail,
      }), // Convert to cents
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to create payment intent");
    }

    const paymentIntent = result.data;

    // Confirm the card payment
    const confirmResult = await premium_stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: premium_cardElement,
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
      console.log("confirm function start--");
      // Payment successful, confirm on your server
      const confirmResponse = await fetch(
        "/.netlify/functions/confirmPlanPaymentIntent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-xsolla-token": token,
          },
          body: JSON.stringify({
            payment_intent_id: confirmResult.paymentIntent.id,
            userId: globalUserInfoId,
          }),
        }
      );

      const confirmResultStatus = await confirmResponse.json();

      if (confirmResultStatus.success !== true) {
        throw new Error(
          confirmResultStatus.error || "Failed to verify payment"
        );
      }

      // Reset form and show success message
      cardErrors.textContent = "Payment successful!";
      cardErrors.className = "mt-2 text-green-600 text-sm";

      cancelPremiumPay();
      setTimeout(async () => {
        await getSelectedSubscription();
        await setCurrentPremium();
      }, 0);
    } else if (confirmResult.paymentIntent.status === "requires_action") {
      // Handle 3D Secure authentication if needed
      window.location.href =
        confirmResult.paymentIntent.next_action.redirect_to_url.url;
    }
  } catch (error) {
    cardErrors.textContent = error.message;
  } finally {
    depositButton.disabled = false;
    depositButton.textContent = "Start now";
  }
}

monthlyBtn.addEventListener("click", () => setPrice("monthly"));
annuallyBtn.addEventListener("click", () => setPrice("annually"));

function setPrice(type) {
  if (type === "monthly") {
    selectedPeriod = "monthly";
    monthlyBtn.classList.replace("bg-gray-800", "bg-blue-starndard");
    annuallyBtn.classList.replace("bg-blue-starndard", "bg-gray-800");
    freeCredits.textContent = "10";
    premiumCredits.textContent = "100";
    proCredits.textContent = "200";
    premiumPrice.textContent = "15";
    proPrice.textContent = "120";
  } else {
    selectedPeriod = "yearly";
    annuallyBtn.classList.replace("bg-gray-800", "bg-blue-starndard");
    monthlyBtn.classList.replace("bg-blue-starndard", "bg-gray-800");
    freeCredits.textContent = "100";
    premiumCredits.textContent = "200";
    proCredits.textContent = "450";
    premiumPrice.textContent = "12";
    proPrice.textContent = "99";
  }
}

function showPremiumPriceSection(planType) {
  selectedPlan = planType;
  const premiumSelectionPart = document.getElementsByClassName(
    "premium-selection-part"
  )[0];
  premiumSelectionPart.style.display = "none";
  const premiumPayPart = document.getElementsByClassName("premium-pay-part")[0];
  premiumPayPart.style.display = "block";
}

function cancelPremiumPay() {
  selectedPlan = "free";
  const premiumSelectionPart = document.getElementsByClassName(
    "premium-selection-part"
  )[0];
  premiumSelectionPart.style.display = "block";
  const premiumPayPart = document.getElementsByClassName("premium-pay-part")[0];
  premiumPayPart.style.display = "none";
}
