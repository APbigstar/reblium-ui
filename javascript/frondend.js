// Get references to the dashboard and artist_mode elements
const dashboard = document.getElementById("dashboard");
const artistMode = document.getElementById("artist_mode");
const chatbot = document.getElementById("chatbot");

const navbar = document.querySelector(".navbar");
const videoContainer = document.getElementById("videoContainer");
const sizeContainer = document.getElementById("sizeContainer");

// Get all elements with the class name 'preset-avatar'
const presetAvatars = document.querySelectorAll(".preset-avatar");

// Function to handle the click event
function toggleDashboardAndArtistMode() {
  // Toggle the 'display' property for dashboard and artist_mode
  document.getElementById("avatarId").textContent = ""; // Clears the avatar ID display
  document.getElementById("avatarName").textContent = ""; // Clears the avatar ID display

  if (dashboard.style.display !== "none") {
    dashboard.style.display = "none";
    artistMode.style.display = "block";
    chatbot.style.display = "none";
  } else {
    dashboard.style.display = "block";
    artistMode.style.display = "none";
    chatbot.style.display = "none";
  }
}

// Add the click event listener to each preset-avatar element
presetAvatars.forEach(function (presetAvatar) {
  presetAvatar.addEventListener("click", toggleDashboardAndArtistMode);
});

document.addEventListener("DOMContentLoaded", function () {
  // Automatically select the 'Games' category on page load
  showCategory("apps");

  // Optionally, directly add the 'selected' class to the 'Games' button
  var gamesButton = document.querySelector('.category[data-category="games"]');
  if (gamesButton) {
    gamesButton.classList.add("selected");
  }
});

function showCategory(categoryId, event = null) {
  // Hide all categories
  var categories = document.getElementsByClassName("category-content");
  for (var i = 0; i < categories.length; i++) {
    categories[i].style.display = "none";
  }

  // Remove 'selected' class from all category buttons
  var categoryButtons = document.querySelectorAll(".categories .category");
  categoryButtons.forEach(function (button) {
    button.classList.remove("selected");
  });

  // Show the selected category content
  var selectedCategory = document.getElementById(categoryId);
  if (selectedCategory) {
    selectedCategory.style.display = "block";
  }

  // Add 'selected' class to the clicked category button
  if (event) {
    event.currentTarget.classList.add("selected");
  } else {
    // For initial load, find and select the category button programmatically
    var initialSelectedButton = document.querySelector(
      `.category[data-category="${categoryId}"]`
    );
    if (initialSelectedButton) {
      initialSelectedButton.classList.add("selected");
    }
  }
}

function togglechatbot() {
  const dashboard = document.getElementById("dashboard");
  const chatbot = document.getElementById("chatbot");
  const artistMode = document.getElementById("artist_mode");
  // Toggle the 'display' property for dashboard and chatbot_mode
  if (dashboard.style.display !== "none") {
    dashboard.style.display = "none";
    artistMode.style.display = "none";

    chatbot.style.display = "block"; // Show chatbot_mode
  } else {
    dashboard.style.display = "block";
    artistMode.style.display = "none";
    chatbot.style.display = "none"; // Hide chatbot_mode
  }
}

function toggleSection(sectionId) {
  // Array of all possible sections
  const sections = [
    "avatar-Discover",
    "avatar-Templates",
    "avatar-Avatars",
    "avatar-Pricing",
  ];

  // Loop through all sections and hide them
  sections.forEach((section) => {
    const el = document.getElementById(section);
    if (el) {
      el.style.display = "none";
    }
  });

  // Show the requested section
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = "block";
  }
}

// Initialize a flag to keep track of the state
let isElementsVisible = true;

document.addEventListener("DOMContentLoaded", function () {
  const dashboard = document.getElementById("dashboard");
  const chatbot = document.getElementById("chatbot");
  const artistMode = document.getElementById("artist_mode");

  // Function to show artist mode after dashboard
  function showArtistMode() {
    dashboard.style.display = "block";
    artistMode.style.display = "none";
    chatbot.style.display = "none";

    // Set the design button as active since we start with artist mode
    document.getElementById("designButton").classList.add("active");
    document.getElementById("designButton").classList.remove("inactive");
    document.getElementById("conversationButton").classList.add("inactive");
    document.getElementById("conversationButton").classList.remove("active");
  }

  // Show artist mode automatically after the dashboard
  showArtistMode();
});

// Function to handle the display toggle and button state
function updateDisplayState(buttonType) {
  const chatbot = document.getElementById("chatbot");
  const artistMode = document.getElementById("artist_mode");
  const conversationButton = document.getElementById("conversationButton");
  const designButton = document.getElementById("designButton");
  const previewButton = document.getElementById("previewButton");
  const elementsToShow = document.querySelectorAll("#chatbot > *");
  const logo = document.getElementById("chatbotLogo");
  const chatContainer = document.getElementById("chat-container");

  // Reset all elements to be shown
  elementsToShow.forEach((element) => {
    element.style.display = "block";
  });

  if (buttonType === "preview") {
    // Hide all elements except logo and chat-container for preview
    elementsToShow.forEach((element) => {
      if (element !== logo && element !== chatContainer) {
        element.style.display = "none";
      }
    });
  }

  // Set active/inactive button states
  previewButton.classList.toggle("active", buttonType === "preview");
  previewButton.classList.toggle("inactive", buttonType !== "preview");
  conversationButton.classList.toggle("active", buttonType === "conversation");
  conversationButton.classList.toggle(
    "inactive",
    buttonType !== "conversation"
  );
  designButton.classList.toggle("active", buttonType === "design");
  designButton.classList.toggle("inactive", buttonType !== "design");

  if (buttonType === "conversation" || buttonType === "preview") {
    chatbot.style.display = "block";
    artistMode.style.display = "none";
    chatbot.focus(); // Focus the chatbot div
    console.log(`Active: ${chatbot.id}`);
  } else if (buttonType === "design") {
    artistMode.style.display = "block";
    chatbot.style.display = "none";
    artistMode.focus(); // Focus the artist_mode div
    console.log(`Active: ${artistMode.id}`);
  }
  handleMute();
}

// Event listeners for buttons
document
  .getElementById("conversationButton")
  .addEventListener("click", function () {
    updateDisplayState("conversation");
  });

document.getElementById("designButton").addEventListener("click", function () {
  updateDisplayState("design");
});

document.getElementById("previewButton").addEventListener("click", function () {
  updateDisplayState("preview");
});

// Event listener for Tab key
document.addEventListener("keydown", function (event) {
  if (event.key === "Tab") {
    event.preventDefault(); // Prevent the default tab behavior
    // Check which mode is currently active and switch to the other
    const chatbot = document.getElementById("chatbot");
    const artistMode = document.getElementById("artist_mode");
    if (window.getComputedStyle(chatbot).display === "none") {
      updateDisplayState("conversation");
    } else {
      updateDisplayState("design");
    }
  }
});

// Event listener to handle the click on the menuBar and toggle the sideMenu
document.addEventListener("DOMContentLoaded", function () {
  const menuBar = document.getElementById("menuBar");
  const triangle = document.getElementById("triangle");
  const sideMenu = document.getElementById("sideMenu");
  const chatInput = document.querySelector(".chatbot");
  const buttonsContainer = document.getElementById("buttonsContainer");
  let isMenuOpen = true; // Set it to true to have the menu expanded by default

  // This block of code will run once the DOM content is loaded
  // and it will expand the menu by default
  sideMenu.classList.add("expanded");
  menuContent.style.display = "block";
  triangle.style.transform = "translate(-50%, -50%) rotate(180deg)";
  isMenuOpen = true;

  menuBar.addEventListener("click", function () {
    // Toggle the 'expanded' class on the sideMenu
    sideMenu.classList.toggle("expanded");
    if (sideMenu.classList.contains("expanded")) {
      // If the sideMenu is expanded, show the menuContent and rotate the triangle
      menuContent.style.display = "block";
      triangle.style.transform = "translate(-50%, -50%) rotate(180deg)";
      isMenuOpen = true;
    } else {
      // If the sideMenu is collapsed, hide the menuContent and reset the triangle rotation
      menuContent.style.display = "none";
      triangle.style.transform = "translate(-50%, -50%)";
      isMenuOpen = false;
    }
  });

  menuContent.addEventListener("click", function (event) {
    const clickedButton = event.target;
    if (clickedButton.tagName === "BUTTON") {
      // Prevent the click on the menuContent buttons from propagating to the parent elements
      event.stopPropagation();
    }
  });
});

menuContent.addEventListener("click", function (event) {
  let clickedElement = event.target;

  // Check if the clicked element or any of its parents have the .content-container class
  while (clickedElement !== menuContent) {
    if (clickedElement.classList.contains("content-container")) {
      // Prevent the click event from propagating to the side menu
      event.stopPropagation();
      return; // Exit the function
    }
    clickedElement = clickedElement.parentNode;
  }
});

menuContent.addEventListener("click", function (event) {
  let clickedElement = event.target;

  // Check if a button was clicked
  if (clickedElement.tagName === "BUTTON") {
    // Hide all content containers
    const contentContainers = document.querySelectorAll(".content-container");
    contentContainers.forEach((container) => {
      container.style.display = "none";
    });

    // Show the content container associated with the clicked button
    const nextElement = clickedElement.nextElementSibling;
    if (nextElement && nextElement.classList.contains("content-container")) {
      nextElement.style.display = "block"; // or any other display style you prefer
    }
  }
});

// Function to toggle the display of sub-menus based on the menuId
function toggleMenu(menuId) {
  const subMenu = document.getElementById(`${menuId}SubMenu`);
  const otherSubMenus = document.querySelectorAll(
    ".sub-menu:not(#" + menuId + "SubMenu)"
  );

  // Hide other sub-menus
  otherSubMenus.forEach(function (subMenu) {
    subMenu.style.display = "none";

    // Close all buttons within other submenus
    const buttons = subMenu.querySelectorAll("button");
    buttons.forEach(function (button) {
      button.classList.remove("active"); // Remove the "active" class
    });
  });

  // Toggle display of selected sub-menu
  subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";

  // Open the first button immediately for this submenu
  openFirstButton(menuId);
}

// Function to open the first button in the specified sub-menu
function openFirstButton(menuId) {
  const firstButton = document.querySelector(
    `#${menuId}SubMenu button:first-child`
  );
  if (firstButton) {
    firstButton.click();
  }
}

// Function to make the button of sub-menus turn blue when selected menuId
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".sub-menu button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove selected class from all buttons
      buttons.forEach(function (btn) {
        btn.classList.remove("selected");
      });

      // Add selected class to the clicked button
      this.classList.add("selected");
    });
  });
});

// makes the images that is clicked active with a blue border
let activeImageCell = null; // To keep track of the currently active cell

function toggleActive(element) {
  if (activeImageCell) {
    activeImageCell.classList.remove("active"); // Remove active class from the previously active cell
  }

  if (element !== activeImageCell) {
    element.classList.add("active"); // Add active class to the clicked cell
    activeImageCell = element; // Update the active cell reference
  } else {
    activeImageCell = null; // Clicked the active cell again, deactivate it
  }
}

// Select all sliders
const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
  // Find the parent container of the slider
  const sliderContainer = slider.parentElement;

  // Find the value display element within the container
  const valueIndicator = sliderContainer.querySelector(".slider-value");

  // Update the value indicator when the slider value changes
  slider.addEventListener("input", () => {
    valueIndicator.textContent = slider.value;
  });
});

// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Select all sub-menu buttons
  const subMenuButtons = document.querySelectorAll(
    ".sub-menu button.transparent-button "
  );

  // Attach click event listener to each sub-menu button
  subMenuButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the corresponding sub-menu element
      const subMenu = this.nextElementSibling;
      // Toggle the sub-menu display
      toggleSubMenu(subMenu);
    });
  });
});

// Function to toggle the display of a sub-menu
function toggleSubMenu(subMenu) {
  // Toggle the display property of the sub-menu
  subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";

  // Hide other sub-menus
  const otherSubMenus = document.querySelectorAll(
    ".sub-menu:not(" + subMenu.id + ")"
  );
  otherSubMenus.forEach(function (menu) {
    menu.style.display = "none";
  });
}

// drop zone
function handleDropRight(e) {
  commonDropHandler(e, "DropB*0,TextureOnly*1,Assetname*");
}

function handleDropLeft(e) {
  commonDropHandler(e, "DropB*1,TextureOnly*1,Assetname*");
}

function commonDropHandler(e, commandPrefix) {
  e.preventDefault();
  const dropZone = e.currentTarget;
  dropZone.classList.remove("drag-over");

  const imageUrl = e.dataTransfer.getData("text/plain");
  const altText = e.dataTransfer.getData("text/html");
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(altText, "text/html");
  const draggedImageAlt = htmlDoc.querySelector("img")
    ? htmlDoc.querySelector("img").alt
    : "";

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = draggedImageAlt;

  dropZone.innerHTML = "";
  dropZone.appendChild(image);

  const fullCommand = `${commandPrefix}${draggedImageAlt}, `;
  console.log(`Command: ${fullCommand}`);
  handleSendCommands({ dragdrop: fullCommand });
}

// Event listener assignments
const dropZones = document.querySelectorAll(".drop-zone");

dropZones.forEach((dropZone) => {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });

  if (dropZone.id === "drop-right") {
    dropZone.addEventListener("drop", handleDropRight);
  } else if (dropZone.id === "drop-left") {
    dropZone.addEventListener("drop", handleDropLeft);
  }
});

// Variables to keep track of the current asset name and value
let currentAsset = "Birthmark_01";
let currentValue = 0;

// Function to update the slider value and call handleSendCommands
function updateSliderValue() {
  // Your existing code to update the slider value goes here

  // Update the asset name based on the current button clicked
  handleSendCommands({
    assetname: currentAsset,
    slidertype: "M_Switch_" + currentAsset + "*" + currentValue,
  });
}

// Event listeners for the asset name buttons
document
  .getElementById("birthmarkButton")
  .addEventListener("click", function () {
    // Toggle to the next Birthmark asset name
    switch (currentAsset) {
      case "Birthmark_01":
        currentAsset = "Birthmark_02";
        break;
      case "Birthmark_02":
        currentAsset = "Birthmark_03";
        break;
      case "Birthmark_03":
        currentAsset = "No_Birthmark";
        break;
      case "No_Birthmark":
        currentAsset = "Birthmark_01";
        break;
      // Add cases for other asset names as needed
    }

    // Call the function to update the slider value
    updateSliderValue();
  });

// Variables to keep track of the current asset name and value for Rosacea
let currentrosaceaAsset = "Rosacea_01";
let currentrosaceaValue = 0;

// Function to update the rosacea slider value and call handleSendCommands
function updaterosaceaSliderValue() {
  // Your existing code to update the slider value goes here

  // Update the rosacea asset name based on the current button clicked
  handleSendCommands({
    assetname: currentrosaceaAsset,
    slidertype: "M_Switch_" + currentrosaceaAsset + "*" + currentrosaceaValue,
  });
}

// Event listeners for the asset name buttons
document.getElementById("rosaceaButton").addEventListener("click", function () {
  // Toggle to the next Rosacea asset name
  switch (currentrosaceaAsset) {
    case "Rosacea_01":
      currentrosaceaAsset = "Blushing_allover";
      break;
    case "Blushing_allover":
      currentrosaceaAsset = "Blushing_Cheeks";
      break;
    case "Blushing_Cheeks":
      currentrosaceaAsset = "Blushing_FaceBottom";
      break;
    case "Blushing_FaceBottom":
      currentrosaceaAsset = "Blushing_FullFace";
      break;
    case "Blushing_FullFace":
      currentrosaceaAsset = "00_NoRosacea";
      break;
    case "00_NoRosacea":
      currentrosaceaAsset = "Rosacea_01";
      break;
    // Add cases for other asset names as needed
  }

  // Call the function to update the slider value
  updaterosaceaSliderValue();
});

// Variables to keep track of the current asset name and value for Age Variations
let currentAgeAsset = "Age_Variation_25_40_Var1";
let currentAgeValue = 0;

// Function to update the age slider value and call handleSendCommands
function updateAgeSliderValue() {
  // Your existing code to update the slider value goes here

  // Update the age asset name based on the current button clicked
  handleSendCommands({
    assetname: currentAgeAsset,
    slidertype: "M_Switch_" + currentAgeAsset + "*" + currentAgeValue,
  });
}

// Event listeners for the asset name buttons
document.getElementById("ageButton").addEventListener("click", function () {
  // Toggle to the next Age asset name
  switch (currentAgeAsset) {
    case "Age_Variation_25_40_Var1":
      currentAgeAsset = "Age_Variation_25_40_Var1_0";
      break;
    case "Age_Variation_25_40_Var1_0":
      currentAgeAsset = "Age_Variation_25_40_Var1_1";
      break;
    case "Age_Variation_25_40_Var1_1":
      currentAgeAsset = "Age_Variation_25_40_Var1_2";
      break;
    case "Age_Variation_25_40_Var1_2":
      currentAgeAsset = "Age_Variation_25_40_Var1_3";
      break;
    case "Age_Variation_25_40_Var1_3":
      currentAgeAsset = "Age_Variation_25_40_Var1_4";
      break;
    case "Age_Variation_25_40_Var1_4":
      currentAgeAsset = "Age_Variation_25_40_Var1_5";
      break;
    case "Age_Variation_25_40_Var1_5":
      currentAgeAsset = "Age_Variation_25_40_Var1_6";
      break;
    case "Age_Variation_25_40_Var1_6":
      currentAgeAsset = "Age_Variation_25_40_Var1"; // Cycle back to the first variation
      break;
  }

  // Call the function to update the slider value
  updateAgeSliderValue();
});

// Variables to keep track of the current asset name and value for Mole
let currentMoleAsset = "Moles_01";
let currentMoleValue = 0;

// Function to update the Mole slider value and call handleSendCommands
function updateMoleSliderValue() {
  // Your existing code to update the slider value goes here

  // Update the Mole asset name based on the current button clicked
  handleSendCommands({
    assetname: currentMoleAsset,
    slidertype: "M_Switch_" + currentMoleAsset + "*" + currentMoleValue,
  });
}

// Event listeners for the Mole asset name buttons
document.getElementById("moleButton").addEventListener("click", function () {
  // Toggle to the next Mole asset name
  switch (currentMoleAsset) {
    case "Moles_01":
      currentMoleAsset = "Moles_02";
      break;
    case "Moles_02":
      currentMoleAsset = "Moles_03";
      break;
    case "Moles_03":
      currentMoleAsset = "No_Mole";
      break;
    case "No_Mole":
      currentMoleAsset = "Moles_01";
      break;
    // Add cases for other Mole asset names as needed
  }

  // Call the function to update the Mole slider value
  updateMoleSliderValue();
});

// Variables to keep track of the current asset name and value for Acne
let currentAcneAsset = "Acne_01";
let currentAcneValue = 0;

// Function to update the Acne slider value and call handleSendCommands
function updateAcneSliderValue() {
  // Your existing code to update the slider value goes here

  // Update the Acne asset name based on the current button clicked
  handleSendCommands({
    assetname: currentAcneAsset,
    slidertype: "M_Switch_" + currentAcneAsset + "*" + currentAcneValue,
  });
}

// Event listeners for the Acne asset name buttons
document.getElementById("acneButton").addEventListener("click", function () {
  // Toggle to the next Acne asset name
  switch (currentAcneAsset) {
    case "Acne_01":
      currentAcneAsset = "Acne_02";
      break;
    case "Acne_02":
      currentAcneAsset = "Acne_03";
      break;
    case "Acne_03":
      currentAcneAsset = "Acne_04";
      break;
    case "Acne_04":
      currentAcneAsset = "Acne_01";
      break;
    // Add cases for other Acne asset names as needed
  }

  // Call the function to update the Acne slider value
  updateAcneSliderValue();
});

// Variables to keep track of the current Vitiligo asset and value
let currentVitiligoAsset = "Vitiligo_01";
let currentVitiligoValue = 0;

function updateVitiligoSliderValue() {
  handleSendCommands({
    assetname: currentVitiligoAsset,
    slidertype: "M_Switch_" + currentVitiligoAsset + "*" + currentVitiligoValue,
  });
}

// Event listeners for the Vitiligo asset name buttons
document
  .getElementById("vitiligoButton")
  .addEventListener("click", function () {
    switch (currentVitiligoAsset) {
      case "Vitiligo_01":
        currentVitiligoAsset = "Vitiligo_02";
        break;
      case "Vitiligo_02":
        currentVitiligoAsset = "Vitiligo_03";
        break;
      case "Vitiligo_03":
        currentVitiligoAsset = "Vitiligo_01";
        break;
    }

    // Call the function to update the Vitiligo slider value
    updateVitiligoSliderValue();
  });

// Variables to keep track of the current Pimples asset and value
let currentPimplesAsset = "Pimples_01";
let currentPimplesValue = "0";

function updatePimplesSliderValue() {
  handleSendCommands({
    assetname: currentPimplesAsset,
    slidertype: "M_Switch_" + currentPimplesAsset + "*" + currentPimplesValue,
  });
}

// Event listener for the Pimples asset name button
document.getElementById("pimpelsButton").addEventListener("click", function () {
  switch (currentPimplesAsset) {
    case "Pimples_01":
      currentPimplesAsset = "Pimples_02";
      break;
    case "Pimples_02":
      currentPimplesAsset = "Pimples_03";
      break;
    case "Pimples_03":
      currentPimplesAsset = "Pimples_04";
      break;
    case "Pimples_04":
      currentPimplesAsset = "Pimples_01";
      break;
  }

  updatePimplesSliderValue();
});

// Variables to keep track of the current Freckles asset and value
let currentFrecklesAsset = "Freckles_Variation_01";
let currentFrecklesValue = "0";

function updateFrecklesSliderValue() {
  handleSendCommands({
    assetname: currentFrecklesAsset,
    slidertype: "M_Switch_" + currentFrecklesAsset + "*" + currentFrecklesValue,
  });
}

// Event listener for the Freckles asset name button
document
  .getElementById("frecklesButton")
  .addEventListener("click", function () {
    switch (currentFrecklesAsset) {
      case "Freckles_Variation_01":
        currentFrecklesAsset = "Freckles_Variation_02";
        break;
      case "Freckles_Variation_02":
        currentFrecklesAsset = "Freckles_Variation_03";
        break;
      case "Freckles_Variation_03":
        currentFrecklesAsset = "Freckle_Variation_04";
        break;
      case "Freckle_Variation_04":
        currentFrecklesAsset = "Freckles_Variation_05";
        break;
      case "Freckles_Variation_05":
        currentFrecklesAsset = "Freckle_Variation_06";
        break;
      case "Freckle_Variation_06":
        currentFrecklesAsset = "Freckle_Variation_07";
        break;
      case "Freckle_Variation_07":
        currentFrecklesAsset = "Freckles_Variation_01";
        break;
    }

    updateFrecklesSliderValue();
  });

// Variables to keep track of the current Stubble asset and value
let currentStubbleAsset = "Stubbles_Beard_Full_Diffuse";
let currentStubbleValue = "0";

function updateStubbleSliderValue() {
  handleSendCommands({
    assetname: currentStubbleAsset,
    slidertype: "M_Switch_" + currentStubbleAsset + "*" + currentStubbleValue,
  });
}

let altPressed = false;
let lastMouseX, lastMouseY;

document.addEventListener("keydown", function (event) {
  if (event.key === "Alt") {
    altPressed = true;
    // Optional: Change cursor style to indicate camera movement mode
    document.body.style.cursor = "move";
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "Alt") {
    altPressed = false;
    document.body.style.cursor = "default"; // Revert cursor style
  }
});

document.addEventListener("mousemove", function (event) {
  if (altPressed) {
    if (lastMouseX !== undefined && lastMouseY !== undefined) {
      // Calculate mouse movement since last event
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;

      // Update the camera position based on the mouse movement
      updateCameraPosition(deltaX, deltaY);
    }

    // Update last mouse position
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }
});

function updateCameraPosition(deltaX, deltaY) {
  // Implement how the camera should move based on the deltaX and deltaY values
  // This depends on your specific camera setup and 3D environment
}

// Function to close the payment modal and clear the iframe source for security
function closePaymentModal() {
  const modal = document.getElementById("paymentModal");
  modal.style.display = "none";
  document.getElementById("paymentFrame").src = ""; // Clears the iframe source to ensure privacy and security
}

// Attaching the event listener to the close button right after defining the function
document
  .getElementById("closePaymentModal")
  .addEventListener("click", closePaymentModal);

// Iterate over all img elements and add click event listeners
const images = document.querySelectorAll("img");
images.forEach((img) => {
  img.addEventListener("click", imageToText);
});

// Function to log alt text when an image is clicked
function imageToText() {
  console.log(this.alt);
}

// Get the button and the popup elements
const openPopup = document.getElementById("openPopup");
const ChatopenPopup = document.getElementById("ChatopenPopup");

const popup = document.getElementById("popup");
const closeButton = popup.querySelector(".close-button");
const confirmButton = popup.querySelector("#confirmButton"); // Get the Confirm button element

// Get the avatarId span element
const avatarIdSpan = document.getElementById("avatarId");

// Add event listener to the "New Avatar" button
openPopup.addEventListener("click", function () {
  console.log("Open popup button clicked");
  if (!avatarIdSpan.textContent.trim()) {
    console.log("Avatar ID is empty. Opening the pop-up.");
    popup.style.display = "block"; // Show the pop-up only if avatarId is empty
  }
});

// Add event listener to the "New Avatar" button
ChatopenPopup.addEventListener("click", function () {
  console.log("Open popup button clicked");
  if (!avatarIdSpan.textContent.trim()) {
    console.log("Avatar ID is empty. Opening the pop-up.");
    popup.style.display = "block"; // Show the pop-up only if avatarId is empty
  }
});

// Add event listener to the close button
closeButton.addEventListener("click", function () {
  popup.style.display = "none"; // Hide the pop-up
});

// Add event listener to the Confirm button
confirmButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // Close the pop-up immediately after clicking "Confirm"
  popup.style.display = "none";
});

// Function to show the exit confirmation modal
function showExitConfirmation() {
  const exitConfirmation = document.getElementById("exitConfirmation");
  exitConfirmation.style.display = "block";
}

// Function to hide the exit confirmation modal
function hideExitConfirmation() {
  const exitConfirmation = document.getElementById("exitConfirmation");
  exitConfirmation.style.display = "none";
}

// Function to confirm exit
function confirmExit() {
  // You can add your logic here for saving and exiting
  hideExitConfirmation();
  location.reload();
}

// Function to cancel exit
function cancelExit() {
  hideExitConfirmation();
}

function cancelExit() {
  const exitConfirmation = document.getElementById("exitConfirmation");
  exitConfirmation.style.display = "none";
}

// Function to show the download confirmation modal
function showDownloadConfirmation() {
  const downloadConfirmation = document.getElementById("downloadConfirmation");
  downloadConfirmation.style.display = "block";
}

// Function to hide the download confirmation modal
function hideDownloadConfirmation() {
  const downloadConfirmation = document.getElementById("downloadConfirmation");
  downloadConfirmation.style.display = "none";
}

// Function to handle the cancel button click
function cancelDownloadExit() {
  hideDownloadConfirmation();
}

// Event listener for the "Export/Download" button
document
  .getElementById("downloadButton")
  .addEventListener("click", showDownloadConfirmation);

// Get the store button element
const storeButton = document.getElementById("storeButton");
const popupFrame = document.getElementById("popupFrame");

// Add click event listener to the store button
storeButton.addEventListener("click", () => {
  // Set the source URL for the iframe
  popupFrame.src = "https://reblium-1.xsollasitebuilder.com";

  // Display the iframe as a pop-up
  popupFrame.style.display = "block";
});

// Add click event listener to close the pop-up
popupFrame.addEventListener("click", () => {
  // Hide the iframe
  popupFrame.style.display = "none";
});

// Function to create an avatar element
function createAvatarElement(avatar) {
  const avatarElement = document.createElement("div");
  avatarElement.classList.add("avatar");

  const imageElement = document.createElement("img");
  imageElement.src = avatar.avatarImage;
  imageElement.alt = "Avatar";

  const nameElement = document.createElement("span");
  nameElement.classList.add("avatar-name");
  nameElement.textContent = avatar.avatarName;

  avatarElement.appendChild(imageElement);
  avatarElement.appendChild(nameElement);

  return avatarElement;
}

// Function that opens a modal and shows your webscam
const cameraInput = document.getElementById("cameraInput");
const cameraModal = document.getElementById("cameraModal");
const cameraFeed = document.getElementById("cameraFeed");
const modalClose = document.getElementsByClassName("close")[0];

function openCameraPopup() {
  var cameraModal = document.getElementById("cameraModal");
  cameraModal.style.display = "block";

  var cameraFeed = document.getElementById("cameraFeed");

  // Request access to the user's camera
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      cameraFeed.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Error accessing camera:", error);
      closeCameraPopup();
    });
}

function closeCameraPopup() {
  var cameraModal = document.getElementById("cameraModal");
  var cameraFeed = document.getElementById("cameraFeed");

  // Stop the camera feed and hide the modal
  if (cameraFeed.srcObject) {
    cameraFeed.srcObject.getTracks().forEach((track) => track.stop());
  }

  cameraModal.style.display = "none";
}

function takePicture() {
  var cameraFeed = document.getElementById("cameraFeed");
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  // Set the canvas dimensions to match the video feed
  canvas.width = cameraFeed.videoWidth;
  canvas.height = cameraFeed.videoHeight;

  // Draw the current frame from the video feed onto the canvas
  context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

  // Get the raw image data from the canvas as base64
  var base64Image = canvas.toDataURL("image/jpeg"); // Specify the desired format (e.g., 'image/jpeg')

  // Remove the data URL prefix
  base64Image = base64Image.replace(/^data:image\/(png|jpeg);base64,/, "");

  // Display the base64 data in the console log (without the prefix)
  console.log("Base64 Image Data (without prefix):", base64Image);

  // Call a function to send the base64 image to the API
  sendImageToAPI(base64Image);
}

// upload function and convert to base64
function handleImageUpload(input) {
  const selectedImage = input.files[0];

  if (selectedImage) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Image = e.target.result.split(",")[1]; // Extract the base64 data
      console.log("Base64 Image:", base64Image); // Display the base64 image in the console

      // Call a function to send the base64 image to the API
      sendImageToAPI(base64Image);
    };

    reader.readAsDataURL(selectedImage);
  }
}

function sendImageToAPI(base64Image) {
  const apiUrl = "/api/predict"; // Updated to use the Netlify proxy path

  // Create a FormData object and append the base64 image with the key "image_file"
  const formData = new FormData();
  formData.append("image_file", base64Image);

  // Make a POST request to the API
  fetch(apiUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Check if the HTTP status code indicates success
      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API response:", data);
      handleSendCommands({ loadavatar: JSON.stringify(data) });
    })
    .catch((error) => {
      console.error("Error sending image to API:", error);
    });
}
