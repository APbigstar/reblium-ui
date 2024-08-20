// Import the WebRTCClient from the provided URL
import { WebRTCClient } from "https://unpkg.com/@arcware/webrtc-plugin@latest/index_new.umd.js";


newWebRTC = new WebRTCClient({
    address: "wss://signalling-client.ragnarok.arcware.cloud/",
    shareId: "share-41e6555a-9a90-4532-aef1-d2eb8b774c2e",
    settings: {},
    playOverlay: false,
  
    loader: (val) => {
        if (val) {
            showLoader();  // Assume this function shows a loading indicator
        } else {
            hideLoader();  // Assume this function hides the loading indicator
        }
    },
  
    applicationResponse: (new_user_connected) => {
        console.log("response", new_user_connected); // Logging the response
    },
  
    sizeContainer: document.getElementById("sizeContainer"),
    container: document.getElementById("videoContainer"),
    audioRef: document.getElementById("audioRef"),
});



