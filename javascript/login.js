// Get all elements with class "toggle-password"
const togglePasswordIcons = document.querySelectorAll(".toggle-password");

togglePasswordIcons.forEach((icon) => {
  icon.addEventListener("click", function () {
    // Get the target password input ID from the data-target attribute
    const targetId = this.getAttribute("data-target");
    const password = document.querySelector(`#${targetId}`);

    // Toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // Toggle the icon
    this.classList.toggle("bi-eye-slash");
    this.classList.toggle("bi-eye");
  });
});

// Add click event listener to the "Signup" link
document.querySelector(".signup-link").addEventListener("click", () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "block";
});

// Add click event listener to the "Login" link
document.querySelector(".login-link").addEventListener("click", () => {
  document.getElementById("login").style.display = "block";
  document.getElementById("signup").style.display = "none";
});

// Function to initiate social authentication with a given providerName
async function initiateSocialAuthentication(providerName) {
  try {
    const query = new URLSearchParams({
      projectId: "4a04d037-a1fb-4bed-b26b-8fbd86c94828",
      login_url: "https://beta.reblium.com/dashboard",

      with_logout: "0",
    }).toString();

    const resp = await fetch(
      `https://login.xsolla.com/api/social/${providerName}/login_url?${query}`,
      { method: "GET" }
    );

    if (resp.status === 200) {
      const responseData = await resp.json(); // Read response as JSON
      window.location.href = responseData.url; // Redirect the user to the authentication link
    } else {
      console.error("Error getting social authentication link");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Add click event listeners to the social login buttons
document.querySelectorAll(".quick-login-button").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const providerName = event.currentTarget.getAttribute("data-provider");
    await initiateSocialAuthentication(providerName);
  });
});

// Login system api using Xsolla
document
  .getElementById("login-button")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("id_username").value;
    const password = document.getElementById("id_password_1").value;
    const loginErrorMessage = document.getElementById("login-error-message"); // The element to display the error message

    const query = new URLSearchParams({
      projectId: "4a04d037-a1fb-4bed-b26b-8fbd86c94828",
      login_url: "https://beta.reblium.com/dashboard",
      with_logout: "0",
    }).toString();

    try {
      const resp = await fetch(`https://login.xsolla.com/api/login?${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          remember_me: false,
          username: username,
        }),
      });

      const data = await resp.json();

      console.log("username================================>", data);

      if (resp.status === 200) {
        // Authentication request successful
        // You can handle the success response here, e.g., redirect the user to the dashboard
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("email", username);
        window.location.href = data.login_url;
      } else {
        // Authentication request failed, handle the error (e.g., show an error message)
        console.error("Authentication failed:", data.error);
        loginErrorMessage.textContent = data.error.description;
        loginErrorMessage.style.display = "block"; // Show the error message element
      }
    } catch (error) {
      console.error("An error occurred during authentication:", error);
      loginErrorMessage.textContent =
        "An error occurred during authentication. Please try again later.";
      loginErrorMessage.style.display = "block"; // Show the error message element
    }
  });

// Event listener for the signup button
document
  .getElementById("signup-button")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if the terms and conditions checkbox is checked
    const termsCheckbox = document.getElementById("terms_checkbox");
    if (!termsCheckbox.checked) {
      alert("You must agree to the terms and conditions to sign up.");
      return;
    }

    const email = document.getElementById("id_username_signup").value;
    const password = document.getElementById("id_password_signup").value;
    const firstName = document.getElementById("id_first_name_signup").value; // New
    const lastName = document.getElementById("id_last_name_signup").value;

    const signupSuccesMessage = document.getElementById(
      "signup-succes-message"
    ); // The element to display the error message
    const signupErrorMessage = document.getElementById("signup-error-message"); // The element to display the error message

    const query = new URLSearchParams({
      projectId: "4a04d037-a1fb-4bed-b26b-8fbd86c94828",
      login_url: "https://beta.reblium.com/dashboard",
    }).toString();

    try {
      const resp = await fetch(`https://login.xsolla.com/api/user?${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
          username: `${firstName} ${lastName}`,
        }),
      });

      if (resp.status === 204) {
        console.log("Signup successful");

        // Display the success message from the data object
        signupSuccesMessage.textContent =
          "Signup successful. Check your email for further instructions.";
        signupSuccesMessage.style.display = "block"; // Show the success message element
      } else {
        const data = await resp.json();
        console.error("Signup failed:", data);

        // Display the error message from the data object
        signupErrorMessage.textContent = data.error.description;
        signupErrorMessage.style.display = "block"; // Show the error message element
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
      signupErrorMessage.textContent =
        "An error occurred during signup. Please try again later."; // Set a generic error message
      signupErrorMessage.style.display = "block"; // Show the error message element
    }
  });

// JavaScript to handle the password resend
document.getElementById("open-forgot-modal").addEventListener("click", () => {
  document.getElementById("forgot-password-modal").style.display = "block";
});

document.getElementById("close-forgot-modal").addEventListener("click", () => {
  document.getElementById("forgot-password-modal").style.display = "none";
});

// JavaScript to handle the "Forgot Password" button within the modal
document
  .getElementById("confirm-forgot-password")
  .addEventListener("click", async () => {
    const username = document.getElementById("forgot-username").value;
    try {
      const query = new URLSearchParams({
        projectId: "4a04d037-a1fb-4bed-b26b-8fbd86c94828",
        login_url: "https://beta.reblium.com/dashboard",
      }).toString();

      const resp = await fetch(
        `https://login.xsolla.com/api/password/reset/request?${query}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        }
      );

      if (resp.status === 204) {
        // Password reset request sent successfully
        console.log("Password reset request sent successfully");

        // Show the success message and hide the form
        document.getElementById("forgot-password-success").style.display =
          "block";
        document.querySelector(".forgot-password-form").style.display = "none";
      } else {
        const data = await resp.json();
        console.error("Password reset request failed:", data);
        // Show the error message to the user
        const forgotPasswordError = document.getElementById(
          "forgot-password-error"
        );
        document.querySelector(".forgot-password-form").style.display = "none";

        forgotPasswordError.textContent = data.error.description;
        forgotPasswordError.style.display = "block";
      }
    } catch (error) {
      console.error("An error occurred during password reset:", error);
      // Handle the error, e.g., show an error message to the user
    }
  });
