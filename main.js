let globalUserId = null; // Define at a global scope accessible to both functions

document.addEventListener("DOMContentLoaded", async function () {
  const confirmButton = document.getElementById("confirmButton");
  const usernameInput = document.getElementById("username");
  const popup = document.getElementById("popup");
  const avatarsContainer = document.getElementById("avatars-container");
  let user_info_id;

  // Function to fetch user data from the XSolla API using the user token
  async function fetchUserData(userToken) {
    try {
      const response = await fetch("https://login.xsolla.com/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // console.log(userData);

        // Display the user's email in your HTML
        document.getElementById("userEmail").textContent = userData.email;

        if (userData.picture) {
          // Display the user image if it exists in the response
          document.getElementById("userImage").src = userData.picture;
        }

        // console.log('User ID from XSolla:', userData.id); // Display the user ID in the console log
        return userData;
      } else {
        throw new Error("Invalid user token");
      }
    } catch (error) {
      throw error;
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const userToken = urlParams.get("token");

  // Function to fetch user's export credits
  async function fetchExportCredits(userToken) {
    const query = new URLSearchParams({ platform: "xsolla" }).toString();
    const projectId = "218213";

    try {
      const resp = await fetch(
        `https://store.xsolla.com/api/v2/project/${projectId}/user/virtual_currency_balance?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        if (data.items && data.items.length > 0) {
          const exportCredits = data.items[0].amount;
          document.getElementById("exportCredits").textContent = exportCredits; // Display credits in the HTML element
        }
      } else {
        console.error("Failed to fetch export credits data");
      }
    } catch (error) {
      console.error("Error fetching export credits data:", error);
    }
  }

  window.fetchExportCredits = fetchExportCredits;

  // Function to consume credits and update the display
  async function consumeCredits(userToken, sku, quantity) {
    const query = new URLSearchParams({ platform: "xsolla" }).toString();
    const projectId = "218213";

    try {
      const resp = await fetch(
        `https://store.xsolla.com/api/v2/project/${projectId}/user/inventory/item/consume?${query}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            sku: sku,
            quantity: quantity,
          }),
        }
      );

      if (resp.ok) {
        // Add a delay of 500 milliseconds (adjust as needed)
        // await new Promise(resolve => setTimeout(resolve, 100));

        // Update the display after consuming
        await fetchExportCredits(userToken);
      } else {
        console.error("Failed to consume credits");
      }
    } catch (error) {
      console.error("Error consuming credits:", error);
    }
  }

  // Function to handle Export Avatar
  async function exportAvatar() {
    try {
      await consumeCredits(userToken, "Reb-credit-01", 10); // Adjust SKU and quantity as needed
      console.log("Export Avatar completed");
    } catch (error) {
      console.error("Error exporting avatar:", error);
    }
  }

  // Function to handle Export Raw BaseMesh
  async function exportRawBaseMesh() {
    try {
      await consumeCredits(userToken, "Reb-credit-01", 20); // Adjust SKU and quantity as needed
      console.log("Export Raw BaseMesh completed");
    } catch (error) {
      console.error("Error exporting raw base mesh:", error);
    }
  }

  // Function to handle Export Avatar (only head Mesh)
  async function exportAvatarHead() {
    try {
      await consumeCredits(userToken, "Reb-credit-01", 5); // Adjust SKU and quantity as needed
      console.log("Export Avatar Head completed");
    } catch (error) {
      console.error("Error exporting avatar head:", error);
    }
  }

  async function generateAvatar() {
    try {
      await consumeCredits(userToken, "Reb-credit-01", 1); // Adjust SKU and quantity as needed
      console.log("Export Avatar Head completed");
    } catch (error) {
      console.error("Error exporting avatar head:", error);
    }
  }

  document
    .getElementById("exportAvatarButton")
    .addEventListener("click", exportAvatar);
  document
    .getElementById("exportRawBaseMeshButton")
    .addEventListener("click", exportRawBaseMesh);
  document
    .getElementById("exportAvatarHeadButton")
    .addEventListener("click", exportAvatarHead);
  document
    .getElementById("randomizeButton")
    .addEventListener("click", generateAvatar);

  // Call the function when the page loads
  window.addEventListener("load", async () => {
    try {
      await fetchExportCredits(userToken);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Function to create a new user in the database
  async function createUser(userId) {
    try {
      const response = await fetch(`/.netlify/functions/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Error creating new user: " + errorMessage);
      }

      const data = await response.json();
      return data.user_info_id;
    } catch (error) {
      console.error("Error creating new user:", error);
      throw error;
    }
  }

  // // display all the images by avatar id
  // function displayAvatarImageData(avatars) {
  //   for (const avatar of avatars) {
  //     if (avatar.Avatar_Image) {
  //       console.log(`Avatar ID ${avatar.id} Image Data:`, avatar.Avatar_Image);
  //     } else {
  //       console.log(`Avatar ID ${avatar.id} has no image data.`);
  //     }
  //   }
  // }

  // Refactor Fetching and Displaying Avatars:
  async function updateAvatarSection(user_info_id) {
    try {
      const avatars = await fetchAvatarData(user_info_id);

      displayAvatarNames(avatars);
      displayAvatarImageData(avatars); // Call the new function
    } catch (error) {
      console.error("Error updating avatar section:", error);
    }
  }

  async function fetchBlendshapeData(user_info_id) {
    try {
      const response = await fetch(
        `/.netlify/functions/getBlendshape?user_info_id=${user_info_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blendshapeData = await response.json();
      console.log("Fetched blendshape data:", blendshapeData);
      handleSendCommands({ loadUserblendshapes: blendshapeData });

      return blendshapeData;
    } catch (error) {
      console.error("Error fetching blendshape data:", error);
      return null;
    }
  }

  // Function to fetch avatar data from the backend API for a specific user_info_id
  async function fetchAvatarData(user_info_id) {
    try {
      const response = await fetch(
        `/.netlify/functions/getUserAvatars?user_info_id=${user_info_id}`
      );
      const data = await response.json();
      console.log("Fetched avatar data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching avatar data:", error);
      return [];
    }
  }

  async function fetchPersonalizedAvatars(user_info_id) {
    try {
      const url = `/.netlify/functions/getPersonalizedAvatars?user_info_id=${user_info_id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const personalizedAvatars = await response.json();
      console.log("Personalized Avatars:", personalizedAvatars);

      const container = document.getElementById("personalizedAvatarButton"); // Assuming this is the container for all avatars

      // Ensure the container exists
      if (!container) {
        console.error("Avatar display container not found.");
        return;
      }

      // Clear previous content
      container.innerHTML = "";

      // Iterate over each personalized avatar and create an img element
      personalizedAvatars.forEach((avatar) => {
        const img = document.createElement("img");
        img.src = `data:image/jpeg;base64,${avatar.Avatar_Image}`;
        img.alt = avatar.Avatar_Name || "Personalized Avatar";
        img.style.cursor = "pointer"; // Make it visually clear the images are clickable
        img.classList.add("avatar-image"); // Add a class for styling

        // Set onclick event to log only this avatar's data
        img.onclick = () => {
          console.log("Avatar clicked:", avatar.Avatar);
        };

        container.appendChild(img);
      });
    } catch (error) {
      console.error("Error fetching personalized avatars:", error);
    }
  }

  // Display the skeleton loading animation
  function showSkeletonLoader() {
    avatarsContainer.innerHTML = ""; // Clear the container

    for (let i = 0; i < 8; i++) {
      const skeletonAvatar = document.createElement("div");
      skeletonAvatar.className = "skeleton";

      const skeletonImage = document.createElement("div");
      skeletonImage.className = "skeleton-image";

      const skeletonText1 = document.createElement("div");
      skeletonText1.className = "skeleton-text";

      skeletonAvatar.appendChild(skeletonImage);
      skeletonAvatar.appendChild(skeletonText1);

      avatarsContainer.appendChild(skeletonAvatar);
    }
  }

  // Hide the skeleton loader and display the avatars
  function hideSkeletonLoader() {
    avatarsContainer.innerHTML = ""; // Clear the container
    // Call your displayAvatarNames function here to populate the container with avatars
    displayAvatarNames(avatarsData); // Replace with your actual avatars data
  }

  // Simulate loading avatars (replace this with your actual data fetching logic)
  function loadAvatars() {
    showSkeletonLoader();

    // Simulate an API call or data loading delay
    setTimeout(() => {
      // Replace the following with your actual data loading logic
      const avatarsData = fetchAvatars(); // Example fetchAvatars function

      // Once avatarsData is available, hide the skeleton loader and display avatars
      hideSkeletonLoader();
    }, 2000); // Adjust the delay as needed
  }

  // Call loadAvatars function to start loading avatars
  loadAvatars();

  // // Call the function when the site is loaded
  // document.addEventListener('DOMContentLoaded', function () {
  //   const sliderValues = getAllSliderValuesAndNames();
  // });

  async function updateAvatarName(id, newName) {
    try {
      const response = await fetch("/.netlify/functions/updateAvatarName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, Avatar_Name: newName }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Avatar name updated successfully:", result);
      } else {
        console.error("Error updating avatar name:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function displayAvatarNames(avatars) {
    avatarsContainer.innerHTML = ""; // Clear the avatars container before adding new data

    // Reverse the order of avatars
    avatars.reverse();

    for (const avatar of avatars) {
      const avatarDiv = document.createElement("div");
      avatarDiv.className = "preset-avatar";

      const avatarImg = document.createElement("img");
      avatarImg.src = avatar.Avatar_Image
        ? `data:image/jpeg;base64,${avatar.Avatar_Image}`
        : "src/Default_Avatar_Icon.png";
      avatarImg.alt = `Avatar ${avatar.id}`;

      const avatarName = document.createElement("span");
      avatarName.className = "avatar-name";
      avatarName.textContent = avatar.Avatar_Name;
      avatarName.setAttribute("contenteditable", false);

      avatarDiv.appendChild(avatarImg);
      avatarDiv.appendChild(avatarName);

      const avatarButtons = document.createElement("div");
      avatarButtons.className = "avatar-buttons";

      const editButton = document.createElement("button");
      editButton.id = "editButton";
      editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
      editButton.addEventListener("click", () => {
        toggleDashboardAndArtistMode(true); // Show artist_mode
      });

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
      deleteButton.addEventListener("click", () => {
        showDeleteModal(avatar.id);
      });

      avatarButtons.appendChild(editButton);
      avatarButtons.appendChild(deleteButton);
      avatarDiv.appendChild(avatarButtons);

      avatarsContainer.appendChild(avatarDiv);

      // Double-click event to enable editing
      avatarName.addEventListener("dblclick", () => {
        avatarName.setAttribute("contenteditable", true);
        avatarName.focus();
      });

      // Blur event to save changes and disable editing
      avatarName.addEventListener("blur", async () => {
        avatarName.setAttribute("contenteditable", false);
        const newName = avatarName.textContent.trim();
        if (newName !== avatar.Avatar_Name) {
          avatar.Avatar_Name = newName;
          await updateAvatarName(avatar.id, newName);
        }
      });

      const shareButton = document.createElement("button");
      shareButton.innerHTML = '<i class="fas fa-share"></i> Share';
      shareButton.addEventListener("click", () => {
        // Get the Base64 image string from the selected avatar object
        const base64Image = avatar.Avatar_Image; // Replace with the property name containing the Base64 string

        // Convert the Base64 string to a Blob
        const byteCharacters = atob(base64Image);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: "image/jpeg" });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element for downloading
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "persona_image.jpg"; // Set the desired download filename

        // Trigger a click event on the link to initiate the download
        link.click();

        // Clean up the URL object after download
        URL.revokeObjectURL(blobUrl);
      });

      // Create a teaching button with a custom class
      const downloadButton = document.createElement("button");
      downloadButton.innerHTML = '<i class="fas fa-chalkboard"></i> Download';
      downloadButton.className = "custom-button";

      // Create a play button with a custom class
      const chatButton = document.createElement("button");
      chatButton.innerHTML = '<i class="fas fa-play"></i> Chat';
      downloadButton.className = "custom-button";

      // Append the new buttons to the avatarButtons container
      avatarButtons.appendChild(editButton);
      avatarButtons.appendChild(deleteButton);
      avatarButtons.appendChild(shareButton);
      avatarButtons.appendChild(downloadButton);
      // avatarButtons.appendChild(chatButton);

      avatarDiv.appendChild(avatarButtons);

      // Add the event listener for both click and double-click on an avatar
      avatarDiv.addEventListener("click", async () => {
        await waitForVideoLoad(); // Ensures the video or related content is fully loaded

        const selectedAvatarId = avatar.id; // Ensure 'avatar' is the correct reference for the clicked avatar

        const selectedAvatar = avatars.find((av) => av.id === selectedAvatarId);
        if (selectedAvatar) {
          const avatarJsonData = selectedAvatar.Avatar;
          console.log(
            `JSON Data for Avatar ID ${selectedAvatarId}:`,
            avatarJsonData
          );

          handleSendCommands(avatarJsonData);

          const previouslySelectedAvatar =
            document.querySelector(".avatar.selected");
          if (previouslySelectedAvatar) {
            previouslySelectedAvatar.classList.remove("selected");
          }

          // Extract and log the Personas information
          if (avatarJsonData && avatarJsonData.Personas) {
            console.log(
              `Personas Information for Avatar ID ${selectedAvatarId}:`,
              avatarJsonData.Personas
            );

            // Display the Personas information in the input field
            document.getElementById("personaInput").value =
              avatarJsonData.Personas;
          } else {
            console.log(
              `No Personas information found for Avatar ID ${selectedAvatarId}.`
            );
          }

          avatarDiv.classList.add("selected");

          // Ensure these updates are not inside a conditional block that could be skipped
          document.getElementById("avatarId").textContent = selectedAvatar.id;
          document.getElementById("avatarName").textContent =
            selectedAvatar.Avatar_Name;

          // Call the handleSendCommands function with the avatarJsonData
          handleSendCommands({ resetavatar: JSON.stringify(avatarJsonData) });
          // handleSendCommands({ cameraswitch: 'Head' });
        } else {
          console.log(`Selected avatar ID ${selectedAvatarId} not found.`);
        }
      });

      avatarsContainer.appendChild(avatarDiv);
    }
  }

  function showDeleteModal(selectedAvatarId) {
    // Load the HTML template for the pop-up
    const deleteConfirmationHtml = `
    <div id="deleteConfirmation" class="modal-delete">
      <div class="modal-content-delete">
        <h3>Are you sure you want to delete this avatar?</h3>
        <div class="modal-buttons-delete">
          <button id="cancelDeleteButton" class="cancel-delete">Cancel</button>
          <button id="confirmDeleteButton" class="delete-delete">Delete</button>
        </div>
      </div>
    </div>
  `;
    // Append the HTML template to the document body
    document.body.insertAdjacentHTML("beforeend", deleteConfirmationHtml);

    // Get references to the pop-up and buttons
    const deleteConfirmation = document.getElementById("deleteConfirmation");
    const cancelButton = document.getElementById("cancelDeleteButton");
    const confirmButton = document.getElementById("confirmDeleteButton");

    // Show the pop-up
    deleteConfirmation.style.display = "block";

    // Add event listener to the "Cancel" button to hide the pop-up
    cancelButton.addEventListener("click", () => {
      deleteConfirmation.style.display = "none";
      deleteConfirmation.remove(); // Remove the pop-up from the DOM
    });

    // Add event listener to the "Confirm Delete" button to delete the avatar
    confirmButton.addEventListener("click", async () => {
      deleteConfirmation.style.display = "none";
      deleteConfirmation.remove(); // Remove the pop-up from the DOM
      await deleteAvatar(selectedAvatarId); // Call the function to delete the avatar
    });
  }

  async function deleteAvatar(selectedAvatarId) {
    try {
      const response = await fetch(
        `/.netlify/functions/deleteAvatar/${selectedAvatarId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete avatar.");
      }

      // Update the avatar section after successful deletion
      await updateAvatarSection(user_info_id);
      console.log("Avatar deleted successfully:", selectedAvatarId);
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  }

  // Function to add a new avatar name to the database and send a command
  async function addAvatarToDatabase(username, user_info_id) {
    try {
      const response = await fetch(`/.netlify/functions/addAvatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatarName: username, user_info_id }),
      });

      // Check if the response status is OK (2xx) before trying to parse JSON
      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the response
        console.error("Error adding avatar name:", errorMessage);
        return false;
      }

      const data = await response.json();
      console.log(
        "Avatar name added successfully:",
        username,
        "with ID:",
        data.saveavatar
      );

      // Send the 'saveavatar' command with the newly obtained avatar ID
      handleSendCommands({ saveavatar: data.saveavatar });

      document.getElementById("avatarId").textContent = data.saveavatar;

      return true; // Return true to indicate success
    } catch (error) {
      console.error("Network or server error:", error);
      return false;
    }
  }

  // Add event listener to the confirm button
  confirmButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the username from the input field
    const username = usernameInput.value;

    // Add the new avatar name to the database with the corresponding user_info_id
    const isAdded = await addAvatarToDatabase(username, user_info_id); // Pass user_info_id

    if (isAdded) {
      // Delay fetching and updating avatar section by 5 seconds
      setTimeout(async () => {
        await updateAvatarSection(user_info_id);
        console.log("Avatar name added to user account:", username);
      }, 5000);
    }

    // Close the pop-up
    popup.style.display = "none";
  });

  // This function gets the tier name based on the user id
  async function fetchTierName(user_info_id) {
    try {
      const response = await fetch(
        `/.netlify/functions/user-tier?user_info_id=${user_info_id}`
      );
      const data = await response.json();
      if (response.ok) {
        document.getElementById(
          "tier"
        ).textContent = `Reblium: ${data.tier_name}`;
      } else {
        console.error("Failed to fetch tier name:", data.error);
      }
    } catch (error) {
      console.error("Error fetching tier name:", error);
      document.getElementById("tier").textContent =
        "Error fetching tier information.";
    }
  }

  // // Call the function with user_info_id when needed
  document.getElementById("save-exit").addEventListener("click", () => {
    updateAvatarSection(user_info_id);
  });

  // Function to initialize the page and fetch/display avatar data
  async function initPage() {
    try {
      // Get the user token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const userToken = urlParams.get("token");

      if (!userToken) {
        console.error("User token not found in URL.");
        return;
      }

      // Fetch user data from the XSolla API using the user token
      const userData = await fetchUserData(userToken);

      const userId = userData.id;
      globalUserId = userData.id;
      console.log(userId);
      // Check if the user exists in the database and get the user_info_id
      const checkUserExistsResponse = await fetch(
        `/.netlify/functions/checkUserExists?user_id=${userId}`
      );
      const checkUserExistsData = await checkUserExistsResponse.json();

      if (!checkUserExistsData.exists) {
        // User does not exist, so add it to the database
        user_info_id = await createUser(userId);
        // console.log('New user created with user_info_id:', user_info_id);
      } else {
        // User already exists, get the user_info_id
        user_info_id = checkUserExistsData.user_info_id;
        // console.log('User already exists in the database:', user_info_id);
      }

      const blendshapeData = await fetchBlendshapeData(user_info_id);
      if (blendshapeData) {
        handleSendCommands({ resetavatar: JSON.stringify(blendshapeData) });
      }

      await fetchPersonalizedAvatars(user_info_id);
      await fetchTierName(user_info_id);

      // Fetch and display the avatars for the user with matching user_info_id
      const avatars = await fetchAvatarData(user_info_id);
      displayAvatarNames(avatars);
    } catch (error) {
      console.error("Error initializing page:", error);
    }
  }

  // Call the initPage function when the DOM is ready
  await initPage();
});
