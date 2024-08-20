// Arcware part

    let newWebRTC;
    function handleSendCommands(command) {
        newWebRTC.emitUIInteraction(command);
    }

 


    









    /////////////////////////  Speech To Text with Mic Toggle  //////////////////////////////
    document.addEventListener('DOMContentLoaded', function() {
        const callButton = document.getElementById('call-button');
        const stopCallButton = document.getElementById('stopcall-button');
        const recognition = new webkitSpeechRecognition();
        let interimDiv = null; // Element to hold interim results
        let userName = "User"; // Default username
    
        // Update the userName when the input changes
        document.getElementById('userName').addEventListener('change', function() {
            userName = this.value.trim() || "User"; // Update userName, fallback to "User" if empty
        });
    
        recognition.continuous = false; // Set to true for continuous listening
        recognition.lang = "en-EN";
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
            
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
    
        recognition.onresult = function(event) {
            let finalTranscript = ''; // Stores the final transcript
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                let transcript = event.results[i][0].transcript.trim(); // Trim each transcript
                if (!transcript) continue; // Skip empty transcripts
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                    if (interimDiv) {
                        interimDiv.remove(); // Remove the interim results once final is received
                        interimDiv = null;
                    }
                    displayMessage(transcript, 'final', userName); // Send the final text to the server or another function
                    handleSendCommands({ usermessege: finalTranscript }); 

                } else {
                    displayMessage(transcript, 'interim', userName);
                }
            }
        };

        
        
        addWelcomeMessage();

        

        function displayMessage(message, type, sender) {
            const trimmedMessage = message.trim();
            if (!trimmedMessage) return; // Do not display empty or whitespace-only messages
    
            const chatbox = document.getElementById("chatbox");
            const messageElement = document.createElement("div");
            messageElement.classList.add("mb-2");
    
            // Determine message alignment and class based on sender
            if (sender === "bot") {
                messageElement.classList.add("text-left", "bot"); // Bot messages on the left
            } else {
                messageElement.classList.add("text-right", userName); // User messages on the right, tagged with the userName
            }
    
            // Build the inner HTML of the message element based on the type
            if (type === 'final') {
                messageElement.innerHTML = `<p style="background: ${sender === 'bot' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 255, 0.2)'};" class="text-white border rounded-lg py-2 px-4 inline-block">${trimmedMessage}</p>`;
            } else {
                if (!interimDiv) {
                    interimDiv = document.createElement("div");
                    interimDiv.id = 'interim';
                    interimDiv.classList.add("mb-2", "text-right");
                    interimDiv.innerHTML = `<p style="background: rgba(255, 255, 0, 0.5);" class="text-white border rounded-lg py-2 px-4 inline-block">${trimmedMessage}</p>`;
                    chatbox.appendChild(interimDiv);
                } else {
                    interimDiv.innerHTML = `<p style="background: rgba(255, 255, 0, 0.5);" class="text-white border rounded-lg py-2 px-4 inline-block">${trimmedMessage}</p>`;
                }
            }
    
            // Append the new message to the chatbox and scroll to the latest message
            chatbox.appendChild(messageElement);
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    
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










    

    /////////////////////////  Load camara //////////////////////////////
    let cameraStream = null; // Global variable to hold the camera stream

    document.addEventListener('DOMContentLoaded', function () {
        const cameraVideo = document.getElementById('cameraVideo');
        const cameraContainer = document.getElementById('cameraContainer');


        // Function to start the camera and show it in the PiP window
        function startCamera() {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(stream => {
                    cameraStream = stream; // Store the stream globally
                    cameraVideo.srcObject = stream;
                    cameraVideo.play();
                    cameraContainer.classList.remove('hidden');
                })
                .catch(error => {
                    console.error("Error accessing the camera:", error);
                });
        }

        // Function to stop the camera
        function stopCamera() {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                cameraStream = null; // Clear the stored stream
                cameraVideo.srcObject = null;
                cameraContainer.classList.add('hidden');
            }
        }

        // Start the camera feed initially
        startCamera();

        // Event listener for video button toggle
        document.getElementById('videoButton').addEventListener('click', function() {
            const videoIcon = document.getElementById('videoIcon');
            const videoMutedIcon = document.getElementById('videoMutedIcon');
            const isMuted = videoIcon.classList.contains('hidden');

            if (!isMuted) {
                // Turn off the camera
                this.classList.remove('bg-gray-700', 'hover:bg-gray-600');
                this.classList.add('bg-red-500', 'hover:bg-red-600');
                videoIcon.classList.add('hidden');
                videoMutedIcon.classList.remove('hidden');
                stopCamera(); // Stop the camera
            } else {
                // Turn on the camera
                this.classList.add('bg-gray-700', 'hover:bg-gray-600');
                this.classList.remove('bg-red-500', 'hover:bg-red-600');
                videoIcon.classList.remove('hidden');
                videoMutedIcon.classList.add('hidden');
                startCamera(); // Start the camera
            }
        });
    });



    



    /////////////////////////  Chat button toggle  //////////////////////////////
    document.addEventListener('DOMContentLoaded', function() {
        const toggleChatButton = document.getElementById('toggleChatButton');
        const chatContainer = document.getElementById('chat-container');
        const pipVideo = document.getElementById('cameraContainer');

        toggleChatButton.addEventListener('click', function() {
            chatContainer.classList.toggle('hidden');  // Toggle the visibility of the chatbox
            if (!chatContainer.classList.contains('hidden')) {
                // Chat is open, move PiP to overlap the video display
                pipVideo.style.right = '27%'; // Adjust this value to control how much it overlaps
            } else {
                // Chat is closed, move PiP back to its original position
                pipVideo.style.right = '2rem'; // Reset to original right position
                pipVideo.style.bottom = '6rem'; // Reset to original bottom position
            }
        });
    });


    /////////////////////////  Chat Container //////////////////////////////
    const chatBox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatHeader = document.getElementById("chat-header"); // Reference to the chat header if needed

    // Event listener for sending messages
    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
            addUserMessage(userMessage);
            userInput.value = "";
        }
    });

    userInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendButton.click(); // Trigger click on Enter key
        }
    });

    function addUserMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("mb-2", "text-right", "user");
        messageElement.innerHTML = `<p style="background: rgba(0, 0, 255, 0.2);" class="text-white border rounded-lg py-2 px-4 inline-block">${message}</p>`;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message

        handleSendCommands({ usermessege: message });
    }



    /////////////////////////  Hide and show information modal  //////////////////////////////
    document.addEventListener('DOMContentLoaded', function() {
        const closeBtn = document.getElementById('closeUsageModal');
        const modal = document.getElementById('usageModal');
        const audioRef = document.getElementById('audioRef'); 
    
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.add('hidden');  // Hide the modal
                audioRef.play();  // Play audio if necessary
    
                import('/javascript/arc_module.js');
            });
        }
    
       
    });



    /////////////////////////  Toggle info pop-up  //////////////////////////////
    // JavaScript code to toggle the modal display
    document.addEventListener("DOMContentLoaded", function() {
        const infoButton = document.getElementById('infoBtn');
        const closeButton = document.getElementById('closeProjectInfo');
        const modal = document.getElementById('projectInfoModal');

        // Function to show the modal
        infoButton.addEventListener('click', function() {
            modal.classList.remove('hidden');
        });

        // Function to hide the modal
        closeButton.addEventListener('click', function() {
            modal.classList.add('hidden');
        });
    });


    /////////////////////////  Stop talking button  //////////////////////////////
    document.getElementById('stopTalkingBtn').addEventListener('click', function() {
        handleSendCommands({ usermessege: 'STOP' });
        console.log('stop talking');
    });




    /////////////////////////  Password pop-up  //////////////////////////////
    document.addEventListener("DOMContentLoaded", function() {
        const settingsButton = document.getElementById('settingsButton');
        const submitBtn = document.getElementById('submitBtn');
        const passwordInput = document.getElementById('password');
        const errorMsg = document.getElementById('errorMsg');
        const popupPassword = document.getElementById('popupPassword');
        const personaModal = document.getElementById('personaModal');
        const closeModal = document.getElementById('closeModal');
        const closeBtn = document.getElementById('closeBtn');
        const correctPassword = 'Reblium';
        let isPasswordCorrect = false;
    
        function showPasswordPopup() {
            if (!isPasswordCorrect) {
                popupPassword.classList.remove('hidden');
                passwordInput.value = '';
                errorMsg.classList.add('hidden');
            } else {
                personaModal.classList.remove('hidden');
            }
        }
    
        function verifyPassword() {
            const password = passwordInput.value;
            if (password === correctPassword) {
                errorMsg.textContent = 'Password Correct! Access Granted.';
                errorMsg.classList.remove('text-red-500', 'hidden');
                errorMsg.classList.add('text-green-500');
                popupPassword.classList.add('hidden');
                personaModal.classList.remove('hidden');
                isPasswordCorrect = true;
            } else {
                errorMsg.textContent = 'Incorrect Password!';
                errorMsg.classList.remove('text-green-500', 'hidden');
                errorMsg.classList.add('text-red-500');
            }
        }
    
        settingsButton.addEventListener('click', showPasswordPopup);
        submitBtn.addEventListener('click', verifyPassword);
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                verifyPassword();
            }
        });
        closeBtn.addEventListener('click', function() {
            popupPassword.classList.add('hidden');
        });
        closeModal.addEventListener('click', function() {
            personaModal.classList.add('hidden');
        });
    });
    
    
    


    /////////////////////////  modal to send a persona pop-up  //////////////////////////////
    document.addEventListener("DOMContentLoaded", function() {
        const sendPersonaButton = document.getElementById('sendPersona');
        const personaNameInput = document.getElementById('personaName');
        const sentMessages = document.getElementById('sentMessages');
        const personaModal = document.getElementById('personaModal');
        const closeModal = document.getElementById('closeModal');
    
        // Function to add a sent message to the display and make it editable
        function displaySentMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.classList.add('message', 'mt-2', 'p-2', 'border', 'border-gray-300', 'rounded-md', 'cursor-pointer', 'editable');
            messageDiv.addEventListener('click', () => editMessage(messageDiv));
            sentMessages.appendChild(messageDiv);
        }
    
        // Event listener for the send persona button
        sendPersonaButton.addEventListener('click', function() {
            const personaDetails = personaNameInput.value.trim();
            if (personaDetails) {
                handleSendCommands({ personas: personaDetails }); // Send the persona details
                displaySentMessage(personaDetails); // Display the sent message
                personaModal.classList.add('hidden');
                personaNameInput.value = ''; // Clear input after sending
            } else {
                showMessage('errorMsg', "Please enter some details for the persona."); // Alert if input is empty
            }
        });
    
        // Event listener for closing the persona modal
        closeModal.addEventListener('click', function() {
            personaModal.classList.add('hidden');
        });
    
        // Function to handle message editing
        function editMessage(messageDiv) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = messageDiv.textContent; // Take the current text from the div
            input.classList.add('mt-2', 'p-2', 'w-full', 'border', 'border-gray-300', 'rounded-md');
    
            input.addEventListener('blur', () => saveChanges(input, messageDiv));
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    input.blur(); // Trigger blur to save changes when Enter is pressed
                }
            });
    
            sentMessages.replaceChild(input, messageDiv); // Replace div with input
            input.focus();
        }
    
        // Function to save changes and update the message
        function saveChanges(input, messageDiv) {
            const newText = input.value.trim();
            if (newText && newText !== messageDiv.textContent) { // Check if text has actually changed
                messageDiv.textContent = newText; // Update the div text
                sentMessages.replaceChild(messageDiv, input); // Replace input with div
                handleSendCommands({ personas: newText }); // Update the message on the backend
            } else {
                sentMessages.replaceChild(messageDiv, input); // No change or empty, revert to the message div
            }
        }
    });
    
    
    
    





    /////////////////////////  Screen share function  //////////////////////////////
    document.addEventListener("DOMContentLoaded", function () {
        const screenShare = document.getElementById("screenShare");
        const videoElem = document.getElementById("shareVideo");
        const screenShareBtn = document.getElementById("enableScreenShareBtn");
        let isSharingScreen = false;
    
        // Options for getDisplayMedia()
        const displayMediaOptions = {
            video: {
                cursor: "always",
                height: 1000,
                width: 1200
            },
            audio: false
        };
    
        // Toggle screen share on button click
        screenShareBtn.addEventListener("click", function () {
            if (!isSharingScreen) {
                startScreenShare();
                screenShare.classList.remove('hidden');
                screenShareBtn.classList.add('bg-blue-500');
                screenShareBtn.classList.add('hover:bg-blue-600');
                captureFrames();
            } else {
                stopScreenShare();
                screenShare.classList.add('hidden');
            }
        });
    
        // Start the screen capture
        async function startScreenShare() {
            try {
                videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
                isSharingScreen = true; // Update sharing status
            } catch (err) {
                console.error("Error: " + err);
                isSharingScreen = false; // Ensure status is correct if starting sharing fails
            }
        }
    
        // Stop the screen capture
        function stopScreenShare() {
            let tracks = videoElem.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoElem.srcObject = null;
            isSharingScreen = false; // Update sharing status
            screenShareBtn.classList.remove('bg-blue-500');
            screenShareBtn.classList.remove('hover:bg-blue-600');
        }
    
        // Function to capture frames and convert them to base64
        function captureFrames() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = displayMediaOptions.video.width;
            canvas.height = displayMediaOptions.video.height;
    
            const interval = setInterval(() => {
                if (!isSharingScreen) {
                    clearInterval(interval);
                    return;
                }
                ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/jpeg');
                sendDataToBackend(imageData);
            }, 5000); // Capture frame every 5 seconds
        }

        // Function to send data to the backend
        async function sendDataToBackend(imageData) {
            try {
                const response = await fetch('/.netlify/functions/screenShare', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // Ensure you include the entire data URI format expected by the backend
                    body: JSON.stringify({ base64Image: imageData })  // Note: Make sure the key matches what the backend expects
                });
                const data = await response.json();
                console.log('Response from server:', data);
            } catch (error) {
                console.error('Failed to send data:', error);
            }
        }
    });
    
  











    