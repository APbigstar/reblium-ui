   // Arcware part
   let newWebRTC;
   function handleSendCommands(command) {
     newWebRTC.emitUIInteraction(command);
   }


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



function sendVoiceAndPersona() {
 const selectElement = document.getElementById('voices');
 const selectedValue = selectElement.value;

 let persona;
 switch (selectedValue) {
  case 'en-US-Standard-D':
     persona = 'This is your new identity: Alex the Explorer has spent years traveling the globe, from the bustling streets of Paris to the serene landscapes of New Zealand. With a wealth of knowledge on historical landmarks, cultural traditions, and hidden gems, Alex is your go-to guide for an enlightening and adventurous tour.';
     break;
   case 'en-US-Standard-J':
     persona = 'This is your new identity: Taylor the Trendsetter lives and breathes fashion. With an eye for emerging trends and a deep understanding of personal style, Taylor helps individuals find their unique look. From sustainable brands to high-fashion statements, Taylor knows how to make any wardrobe pop.';
     break;
   case 'en-US-Standard-F':
     persona = 'This is your new identity: Jordan the Journeyer, an avid cyclist and environmental advocate, has explored countless trails and city paths around the world on two wheels. Jordan knows the best routes for breathtaking views and those perfect spots for a mid-ride coffee break.';
     break;
   case 'en-US-Standard-H':
     persona = 'This is your new identity: Sky the Visionary is a digital native who exists at the forefront of technology and social media trends. As a virtual influencer, Sky collaborates with brands to create engaging content that resonates with a global audience.';
     break;
 }

 handleSendCommands({ voiceid: selectedValue, personas: persona });


 // Determine the filename based on the selected value
 let jsonFilePath;
 switch (selectedValue) {
   case 'en-US-Standard-D':
     jsonFilePath = 'avatar_presets/json/P0.DHS'; // Path for Alex's avatar data
     break;
   case 'en-US-Standard-J':
     jsonFilePath = 'avatar_presets/json/P4.DHS'; // Path for Taylor's avatar data
     break;
   case 'en-US-Standard-F':
     jsonFilePath = 'avatar_presets/json/P1.DHS'; // Path for Jordan's avatar data
     break;
   case 'en-US-Standard-H':
     jsonFilePath = 'avatar_presets/json/P2.DHS'; // Path for Sky's avatar data
     break;
 }

 if (jsonFilePath) {
   // Load and send the avatar data for the selected persona
   loadAndSendAvatarData(jsonFilePath);
 } else {
   console.log('No matching avatar data file found for the selected persona.');
 }
}


async function loadAndSendAvatarData(jsonFilePath) {
 try {
   const response = await fetch(jsonFilePath);
   if (!response.ok) {
     throw new Error('Network response was not ok');
   }
   const jsonData = await response.json();
   console.log(jsonData);

  // Assuming handleSendCommands is defined and can handle these commands
  handleSendCommands({ resetavatar: JSON.stringify(jsonData) });
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

  


 // Speech to text    
 document.addEventListener("DOMContentLoaded", function() {
   const startRecBtn = document.getElementById("start-rec-btn");
   const micBtnWrapper = document.getElementById("mic-btn-wrapper"); // The wrapper for the mic button
   const chatbox = document.querySelector(".chatbox");


   // Check for speech recognition support
   if (!("webkitSpeechRecognition" in window)) {
     alert("Your browser does not support speech recognition. Please try this feature in Google Chrome.");
     return;
   }

   const recognition = new webkitSpeechRecognition();
   recognition.continuous = false; // Adjust as needed - set to false for single-shot mode
   recognition.lang = "en-EN"; // Set your desired language
   recognition.interimResults = false; // Whether to show interim results
   recognition.maxAlternatives = 1; // Maximum number of alternatives to provide

   // Function to toggle the pulse effect
   function togglePulseAnimation(isRecording) {
     if (isRecording) {
         micBtnWrapper.classList.add("pulse-bg-animation"); // Add pulsing effect
     } else {
         micBtnWrapper.classList.remove("pulse-bg-animation"); // Remove pulsing effect
     }
   }

   // Start recognition
   startRecBtn.addEventListener("click", () => {
     if (recognition.start) {
         togglePulseAnimation(true); // Activate pulsing effect
         recognition.start();
     } else {
         togglePulseAnimation(false); // Deactivate pulsing effect
         recognition.stop();
     }
   });

   // Handle speech recognition results
   recognition.onresult = function(event) {
     const speechToText = event.results[0][0].transcript;
     console.log(`Recognized text: ${speechToText}`); // For debugging

     // Display the recognized text in the chat
     const newMessage = document.createElement("li");
     newMessage.classList.add("chat", "outgoing");
     newMessage.innerHTML = `<p>${speechToText}</p>`;
     chatbox.appendChild(newMessage);
     chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom

     togglePulseAnimation(false); // Deactivate pulsing effect

     handleSendCommands({ usermessege: speechToText });
   };

   // Handle errors
   recognition.onerror = function(event) {
     console.error("Speech recognition error", event.error);
     togglePulseAnimation(false); // Ensure to deactivate pulsing effect on error
   };

   // Handle recognition end
   recognition.onend = function() {
     console.log("Speech recognition ended.");
     togglePulseAnimation(false); // Deactivate pulsing effect when recognition ends
   };
});



   const chatbox = document.querySelector(".chatbox");
   const chatInput = document.querySelector(".chat-input textarea");
   const sendChatBtn = document.querySelector(".chat-input span");

   let userMessage = null; // Variable to store user's message
   const inputInitHeight = chatInput.scrollHeight;

   const createChatLi = (message, className) => {
     // Create a chat <li> element with passed message and className
     const chatLi = document.createElement("li");
     chatLi.classList.add("chat", `${className}`);
     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
     chatLi.innerHTML = chatContent;
     chatLi.querySelector("p").textContent = message;
     return chatLi; // return chat <li> element
   }

   const handleChat = () => {
     userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
     if (!userMessage) return;

     // Clear the input textarea and set its height to default
     chatInput.value = "";
     chatInput.style.height = `${inputInitHeight}px`;

     // Append the user's message to the chatbox
     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
     chatbox.scrollTo(0, chatbox.scrollHeight);

     // Here, instead of generating a response via an API, we directly call the Arcware function
     // Send the userMessage to the Arcware system
     handleSendCommands({ usermessege: userMessage });

     // Optionally, handle the response from Arcware if needed. For now, we'll simulate a response for visual feedback.
     setTimeout(() => {
       // Display a placeholder response in the chatbox. You might replace this with a real response from Arcware.
       const placeholderResponse = "Processing your request..."; // Placeholder text
       const incomingChatLi = createChatLi(placeholderResponse, "incoming");
       chatbox.appendChild(incomingChatLi);
       chatbox.scrollTo(0, chatbox.scrollHeight);
     }, 600);
   };

   chatInput.addEventListener("input", () => {
     // Adjust the height of the input textarea based on its content
     chatInput.style.height = `${inputInitHeight}px`;
     chatInput.style.height = `${chatInput.scrollHeight}px`;
   });

   chatInput.addEventListener("keydown", (e) => {
     // If Enter key is pressed without Shift key and the window 
     // width is greater than 800px, handle the chat
     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
         e.preventDefault();
         handleChat();
     }
   });

   sendChatBtn.addEventListener("click", handleChat);

   // Define the list of asset names
   const assetNames = ['Studio_Softbox', 'Studio_makeUp', 'Studio_reblium', 'Studio_2_Tone', 'Old', 'Studio_Dramatic', 'Studio_CyberRed'];

   // Initialize the current asset index
   let currentAssetIndex = 0;

   function toggleAssetName() {
     // Increment the current index
     currentAssetIndex = (currentAssetIndex + 1) % assetNames.length;

     // Get the new asset name
     const newAssetName = assetNames[currentAssetIndex];

     // Call the function to send the command with the new asset name
     handleSendCommands({ assetname: newAssetName });


   }
