
// Arcware part
let newWebRTC;
  function handleSendCommands(command) {
    newWebRTC.emitUIInteraction(command);
  }

const chatbox = document.getElementById("chatbox");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const openChatButton = document.getElementById("open-chat");
const closeChatButton = document.getElementById("close-chat");
const toggleIcon = document.getElementById("toggle-icon");

let isChatboxOpen = true; // Set the initial state to open

// Function to toggle the chatbox visibility
function toggleChatbox() {
  chatbox.classList.toggle("hidden");
  if (chatbox.classList.contains("hidden")) {
    // When chatbox is hidden, show only header and input
    chatContainer.classList.add("chat-collapsed");
    toggleIcon.textContent = '+';
  } else {
    // When chatbox is visible, expand to full view
    chatContainer.classList.remove("chat-collapsed");
    toggleIcon.textContent = '—';
  }
}

closeChatButton.addEventListener("click", toggleChatbox);


// Add an event listener to the send button
sendButton.addEventListener("click", function () {
  const userMessage = userInput.value;
  if (userMessage.trim() !== "") {
      addUserMessage(userMessage);
      userInput.value = "";
  }
});

userInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
      const userMessage = userInput.value;
      addUserMessage(userMessage);
      userInput.value = "";
  }
});

function addUserMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("mb-2", "text-right");
  messageElement.innerHTML = `<p style="background: rgba(0, 0, 0, 0.2);" class="text-white border rounded-lg py-2 px-4 inline-block">${message}</p>`;

  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;

  handleSendCommands({ usermessege: message });
}



function addBotMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("mb-2");
  messageElement.innerHTML = `<p style="background: rgba(0, 0, 0, 0.2);" class="text-white border rounded-lg py-2 px-4 inline-block">${message}</p>`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}


// Automatically open the chatbox on page load
toggleChatbox();





//Funciton that opens camera on page load and it does not show on mobile
// document.addEventListener("DOMContentLoaded", function() {
//   const webcamElement = document.getElementById('webcam');

//   // Function to open the camera
//   function openCamera() {
//       // Check if the screen width is at least 640 pixels
//       if (window.innerWidth >= 640) {
//           // Constraints for the media stream (video only)
//           const constraints = {
//               video: {
//                   width: { ideal: 1280 },
//                   height: { ideal: 720 }
//               },
//               audio: false // No audio for this example
//           };

//           // Request access to the webcam
//           navigator.mediaDevices.getUserMedia(constraints)
//               .then(function(stream) {
//                   // Set the source of the video element to the stream from the webcam
//                   webcamElement.srcObject = stream;
//                   console.log("Webcam successfully accessed!");
//               })
//               .catch(function(error) {
//                   console.error('Error accessing the webcam', error);
//                   alert('Unable to access the webcam. Please ensure you have given permission.');
//               });
//       } else {
//           console.log("Screen width is less than 640px, not accessing the webcam.");
//       }
//   }

//   // Automatically open the camera on page load
//   openCamera();
// });



document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('popupModal');
  const audioPlayer = document.getElementById('audioPlayer');
  modal.style.display = 'flex'; // Show modal on page load

  document.getElementById('closeButton').addEventListener('click', function () {
      modal.style.display = 'none'; // Hide modal
      audioPlayer.muted = false; // Unmute the audio
  });
});

   // Mute button
   let hasEnabledSound = false; // Flag to track if the user has enabled sound

   document.addEventListener('DOMContentLoaded', function() {
      const audioRef = document.getElementById('audioRef');
      audioRef.muted = true; // Ensure audio is muted initially
      
      const soundEnablePopup = document.getElementById('sound-enable-popup');
      if (!hasEnabledSound) {
          soundEnablePopup.classList.remove('hidden'); // Show the pop-up on page load
      }

      // Add event listener for enabling sound
      document.getElementById('enable-sound-button').addEventListener('click', function() {
          handleMute(); 
          hasEnabledSound = true;
          soundEnablePopup.classList.add('hidden');
      });
   });

   function handleMute() {
   const audioRef = document.getElementById('audioRef'); // Reference to your audio/video element
   const icon = document.getElementById('muteButton').firstElementChild;
   const soundEnablePopup = document.getElementById('sound-enable-popup'); // Get the pop-up element

   if (audioRef.paused || audioRef.muted) {
      audioRef.play(); // Attempt to play the audio
      audioRef.muted = false; // Ensure the audio is unmuted
      icon.className = 'fas fa-volume-up'; // Change icon to sound enabled
      icon.classList.remove('text-red-500', 'line-through'); // Adjust styles as needed
      soundEnablePopup.classList.add('hidden'); // Hide the pop-up when sound is enabled
   } else {
      audioRef.pause(); // Pause the audio
      audioRef.muted = true; // Mute the audio
      icon.className = 'fas fa-volume-mute'; // Change icon to sound muted
      icon.classList.add('text-red-500', 'line-through'); // Adjust styles as needed
      // Optionally show the pop-up again if you want to remind the user to unmute
      // soundEnablePopup.classList.remove('hidden'); 
   }
}


  // Upload avatar
  document.addEventListener('DOMContentLoaded', function() {
    // Target the custom upload button and the hidden file input
    const fileInput = document.getElementById('file-upload');
    const customUploadBtn = document.getElementById('custom-upload-btn');

    // Add click event listener to the custom button
    customUploadBtn.addEventListener('click', function() {
       fileInput.click(); // Programmatically click the hidden file input
    });

    // Upload avatar function remains the same
    function handleFileUpload(event) {
      const file = event.target.files[0];
     
      if (file) {
        const reader = new FileReader();
       
        reader.onload = async (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            console.log('File content:', jsonData);
           
            // Assuming handleSendCommands can handle this JSON data
            handleSendCommands({ resetavatar: JSON.stringify(jsonData) });
          } catch (error) {
            console.error('Error processing file:', error);
          }
        };
       
        reader.onerror = (error) => console.error('Error reading file:', error);
        reader.readAsText(file); // or use reader.readAsArrayBuffer(file) if your file is binary
      }
   }

   // Attach the file upload handler to the input's change event
   fileInput.addEventListener('change', handleFileUpload);
});

// load the avatar form an DHS file 
async function loadAndSendAvatarData(jsonFilePath) {
  try {
    const response = await fetch(jsonFilePath);
    const jsonData = await response.json();
    handleSendCommands({ resetavatar: JSON.stringify(jsonData) });
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}









document.addEventListener('DOMContentLoaded', function() {
  const voiceMappings = {
    "en-US": {
        male: "en-GB-Neural2-B",
        female: "en-GB-News-G"
    }
  };

  const voiceButton = document.getElementById('voiceButton');
  const voiceIcon = document.getElementById('voiceIcon');
  let currentGender = 'female';  // Initial gender set to male

  function updateVoiceIcon() {
    currentGender = currentGender === 'male' ? 'female' : 'male';
    voiceIcon.className = currentGender === 'male' ? 'fas fa-mars' : 'fas fa-venus';
    updateVoiceBasedOnGender();
  }

  function updateVoiceBasedOnGender() {
    const genderVoice = voiceMappings['en-US'][currentGender];
    console.log(`Selected voice: ${genderVoice} for ${currentGender} gender`);
    handleSendCommands({ voiceid: genderVoice });
  }

  // Check if video is loaded and then execute command
  function checkVideoAndSendVoice() {
    const videoElement = document.getElementById('videoContainer').querySelector('video');

    const checkInterval = setInterval(function() {
      if (videoElement && videoElement.readyState >= 3) {
        console.log('Video is loaded and ready to play.');
        clearInterval(checkInterval);  // Stop checking once the video is ready

        // Send male voice command as the initial setting
        currentGender = 'female';  // Ensure gender is set to male
        updateVoiceBasedOnGender();
      }
    }, 1000);  // Check every second
  }

  // Initialize video check and voice setting on page load
  checkVideoAndSendVoice();

  // Toggle gender on button click
  voiceButton.addEventListener('click', updateVoiceIcon);
});






 


  
 // Speech to text    
 document.addEventListener("DOMContentLoaded", function() {
  const chatbox = document.getElementById("chatbox");
  const callButton = document.getElementById('call-button');
  const stopCallButton = document.getElementById('stopcall-button');
  //const languageSelect = document.getElementById('languageSelect');

  // Check for speech recognition support
  if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition. Please try this feature in Google Chrome.");
      return;
  }

  stopCallButton.classList.add('hidden');

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false; // Set to true for continuous listening
  recognition.lang = "en-EN"; // Set your desired language

  recognition.interimResults = false; // Whether to show interim results
  recognition.maxAlternatives = 1; // Maximum number of alternatives to provide

  // Update language on selection change
  // languageSelect.addEventListener('change', function() {
  //     recognition.lang = this.value;
  //     console.log('Speech recognition language set to: ' + recognition.lang);
  // });

  // Toggle call and stop buttons function
  function toggleButtons() {
      callButton.classList.toggle('hidden');
      stopCallButton.classList.toggle('hidden');
  }

  // Event handler to start speech recognition
  callButton.addEventListener('click', () => {
      recognition.start();
      console.log("Speech recognition started.");
      toggleButtons(); // Show stop button
  });

  // Event handler to stop speech recognition
  stopCallButton.addEventListener('click', () => {
      recognition.stop();
      console.log("Speech recognition stopped.");
      toggleButtons(); // Show call button
  });


   // Handle recognized speech results
   recognition.onresult = function(event) {
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
            let speechToText = result[0].transcript.trim();
            if (speechToText) {
                speechToText = speechToText.charAt(0).toUpperCase() + speechToText.slice(1);
                console.log(`Recognized text: ${speechToText}`);
            
                const messageElement = document.createElement("div");
                messageElement.classList.add("mb-2", "text-right");
                messageElement.innerHTML = `<p style="background: rgba(0, 0, 0, 0.2);" class="text-white border rounded-lg py-2 px-4 inline-block">${speechToText}</p>`;
                chatbox.appendChild(messageElement);
                handleSendCommands({ usermessege: speechToText }); 

                chatbox.scrollTop = chatbox.scrollHeight;
            } else {
                console.log("No text recognized or text was only whitespace.");
            }
        }
    }
};

// Capture the original console.log function
const originalConsoleLog = console.log;

console.log = function() {
    originalConsoleLog.apply(console, arguments);  // Maintain original log functionality
    if (arguments.length > 0) {
        let arg = arguments[0];
        if (typeof arg === 'object' && arg.response && arg.response.FromAmir) {
            displayMessage(arg.response.FromAmir);
        }
    }
};

function displayMessage(message) {
    const chatbox = document.getElementById("chatbox");
    if (!chatbox) {
        console.error('Chatbox not found');
        return;
    }
    const messageElement = document.createElement("div");
    messageElement.className = "mb-2";
    messageElement.innerHTML = `<p style="background: rgba(0, 0, 0, 0.2);" class="text-white border rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}


// // Ensure this code is connected to your DOMContentLoaded or similar initialization function
// document.addEventListener("DOMContentLoaded", function() {
//     console.log({ response: { FromAmir: "I am Reblium Avatar." } });  // Example to trigger the functionality
//     console.log({ response: { FromAmir: "Just hanging out." } });    // Another example message
// });



  // Handle errors
  recognition.onerror = function(event) {
      console.error("Speech recognition error", event.error);
  };

  // Handle recognition end
  recognition.onend = function() {
      recognition.stop();

      console.log("Speech recognition ended.");
      toggleButtons(); // Show call button

  };
});





// Assets configuration for different categories
const assets = {
  hairstyles: {
      items: [
          'DG', 'Stephanie', 'Afro', 'Angel_braids', 'Angel_ponytail', 'Ben_Armstrong', 'Billieeilish', 'Bi_Wen_Jin', 'Brad_Pitt_Hair',
          'Buzzcut', 'Crypto', 'Cuban', 'Curly', 'Curly_Ponytail', 'David_Schwarztz', 'Dom', 'Elon_Musk', 'Gary_Vee', 'Brad_Garlinghouse',
          'Jeremy', 'Jeremy_Hogan', 'John_Deo', 'Jordan_Belfort', 'Katy_Perry', 'Livi', 'Madonna_Hair', 'Marilyn_Monroe', 'Martin_Hiesboeck',
          'Mason', 'Max', 'Monical', 'Natalia', 'Peaky_Blinders_Hair', 'Pixie_cut', 'Roger', 'Sadaf', 'Sisi', 'Snoop_Dogg', 'Suzanne', 'Tijmen',
          'Wavy', 'William', 'Wolfcut', 'Zuckerberg'
      ],
      commandKey: 'assetname'
  },
  outfits: {
      items: [
          'Businessman02', 'CasualBoy', '0_CasualFemale01', 'CasualFemale02', 'CasualFemale03', 'CasualFemale04',
          'CasualGirl', 'CasualMale01', 'Dress_01', 'Female_Outfit_08', 'Male_Outfit_06', 'Thobe',
          'Male_Outfit_08', 'SportsMale', 'Female_Outfit_07', 'Alice_Outfit'
      ],
      commandKey: 'assetname'
  },
  lightings: {
      items: [
          'Studio_Softbox', 'Studio_makeUp', 'Studio_reblium', 'Studio_2_Tone', 'Old', 'Studio_Dramatic', 'Studio_CyberRed'
      ],
      commandKey: 'assetname'
  },
  makeups: {
      items: [
          'Lipstick_01', 'lipstick_02', 'lipstick_Big', 'lipstick_BigBlur', 'lipstick_Gradient',
          'lipstick_HalfGradient', 'lipstick_Outline', 'Lipstick_Stylised_01', 'Lipstick_Stylised_02',
          'lipstick_Symmetrical', 'lipstick_UpperLip', '00_Lipstick'
      ],
      commandKey: 'assetname'
  }
};

// Function to toggle assets
function toggleAsset(category) {
  const { items, commandKey } = assets[category];
  let currentIndex = parseInt(localStorage.getItem(category + 'Index'), 10) || 0;
  handleSendCommands({ [commandKey]: items[currentIndex] });
  localStorage.setItem(category + 'Index', (currentIndex + 1) % items.length);
}

// Setup button event listeners
function setupButtonListeners() {
  document.getElementById('lightButton').addEventListener('click', () => toggleAsset('lightings'));
  document.getElementById('hairButton').addEventListener('click', () => toggleAsset('hairstyles'));
  document.getElementById('outfitButton').addEventListener('click', () => toggleAsset('outfits'));
  document.getElementById('makeupButton').addEventListener('click', () => toggleAsset('makeups'));
}

document.addEventListener('DOMContentLoaded', setupButtonListeners);

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
});

  // Listener for closing the persona modal
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('personaModal').classList.add('hidden');
});

// Setup all event listeners for interaction
function setupEventListeners() {
  // Listener for opening the persona modal
  document.getElementById('personaButton').addEventListener('click', () => {
      document.getElementById('personaModal').classList.remove('hidden');
  });



  // Listener for sending persona data on button click
  document.getElementById('sendPersona').addEventListener('click', (event) => {
      event.preventDefault(); // Prevent form submission if used within a form
      sendPersonaData();
  });

  // Listener for pressing Enter to send data in input field
  document.getElementById('personaName').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent form submission
          sendPersonaData();
      }
  });

  // Attach listeners to persona template buttons to load descriptions into input
  const personaButtons = document.querySelectorAll('.persona-template');
  personaButtons.forEach(button => button.addEventListener('click', () => {
      loadPersonaTemplate(button.getAttribute('data-description'));
  }));
}

// Load the persona template description into the input field
function loadPersonaTemplate(description) {
  document.getElementById('personaName').value = description;
}

// Display sent message in a dedicated container with functionality to edit by populating main input field
function displaySentMessage(message) {
  const messagesContainer = document.getElementById('sentMessages');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add('mt-2', 'p-2', 'border', 'border-black', 'rounded', 'cursor-pointer');

  // Prepend the new message to the container, so it appears above older messages
  if (messagesContainer.firstChild) {
    messagesContainer.insertBefore(messageDiv, messagesContainer.firstChild);
  } else {
    messagesContainer.appendChild(messageDiv);
  }

  // Clicking the message populates the main input field for editing
  messageDiv.addEventListener('click', () => {
      const personaInput = document.getElementById('personaName');
      personaInput.value = message; // Set the message text to the input field
      document.getElementById('personaModal').classList.remove('hidden'); // Open the modal if it's not already open

      // Focus on input to encourage immediate editing
      personaInput.focus();

      // Modify sendPersonaData to handle update, passing the specific messageDiv
      const sendButton = document.getElementById('sendPersona');
      sendButton.onclick = function(event) {
          event.preventDefault(); // Prevent form submission defaults
          sendPersonaData(messageDiv, message); // Pass the messageDiv and original message for update
      };
  });
}


// Send the persona data from the input field and update the display message
function sendPersonaData(messageDivToUpdate) {
  const personaInput = document.getElementById('personaName');
  const updatedMessage = personaInput.value.trim();

  if (updatedMessage) {
      // Assuming handleSendCommands is your backend update call
      handleSendCommands({ personas: updatedMessage });      
      if (messageDivToUpdate) {
          // Update the text of the original message div if this was an update action
          messageDivToUpdate.textContent = updatedMessage;
      } else {
          // Otherwise, just add a new message to the list
          displaySentMessage(updatedMessage);
      }
      personaInput.value = ''; // Clear the input after sending
      document.getElementById('personaModal').classList.add('hidden'); // Optionally close modal
  } else {
      alert('Please enter or select a persona name.');
  }
}









let currentRating = 0; // Tracks the current star rating after a click
const modal = document.getElementById('ratingModal');
const stars = document.querySelectorAll('.star');
const submitBtn = document.getElementById('submitRating');
const closeModalBtn = document.getElementById('closeModal');
const feedbackText = document.getElementById('feedbackText');

stars.forEach((star, idx) => {
  star.style.cursor = 'pointer';
  star.addEventListener('mouseenter', () => {
    updateStars(idx, 'orange');
  });
  star.addEventListener('mouseleave', () => {
    updateStars(currentRating - 1, 'orange');
  });
  star.addEventListener('click', () => {
    currentRating = idx + 1;
    updateStars(idx, 'orange');
  });
});

function updateStars(index, color) {
  stars.forEach((s, i) => {
    s.style.color = i <= index ? color : 'gray';
  });
}

submitBtn.addEventListener('click', function() {
  const feedback = feedbackText.value;

  // Send feedback data to the API
  fetch('/.netlify/functions/submitFeedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      rating: currentRating,
      message: feedback
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      console.log(data.message);
    } else {
      console.log('Failed to submit feedback');
    }
    modal.classList.add('hidden');
    feedbackText.value = '';
    updateStars(-1, 'gray');
    currentRating = 0;
  })
  .catch(error => {
    console.error('Error:', error);
    console.log('An error occurred while submitting feedback');
    modal.classList.add('hidden');
    feedbackText.value = '';
    updateStars(-1, 'gray');
    currentRating = 0;
  });
});

closeModalBtn.addEventListener('click', function() {
  modal.classList.add('hidden');
  feedbackText.value = '';
  updateStars(-1, 'gray');
  currentRating = 0;
});

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(showModal, 180000); // Show modal after 3 minutes
});

function showModal() {
  modal.classList.remove('hidden');
}





// document.addEventListener("DOMContentLoaded", function() {
//   setTimeout(() => {
//     document.getElementById("popup").classList.remove("hidden");
//     document.getElementById("popup").classList.add("visible");
//   }, 300000); // 5 minutes in milliseconds

// //   setTimeout(() => {
// //     closePopup();
// // }, 10000); // Simulate a 30-second ad

//   function closePopup() {
//       document.getElementById("popup").classList.remove("visible");
//       document.getElementById("popup").classList.add("hidden");
//   }
// });





