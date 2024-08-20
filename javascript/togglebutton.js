document.addEventListener('DOMContentLoaded', function() {
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
    };

    function toggleAsset(category) {
        const { items, commandKey } = assets[category];
        let currentIndex = parseInt(localStorage.getItem(category + 'Index'), 10) || 0;
        
        handleSendCommands({ [commandKey]: items[currentIndex] });
        currentIndex = (currentIndex + 1) % items.length; // Update index
        
        localStorage.setItem(category + 'Index', currentIndex);
        document.getElementById(category + 'Index').textContent = currentIndex + 1; // Display 1-based index
    }
    

    // Setup event listeners
    document.getElementById('hairButton').addEventListener('click', () => toggleAsset('hairstyles'));
    document.getElementById('outfitButton').addEventListener('click', () => toggleAsset('outfits'));
    document.getElementById('lightButton').addEventListener('click', () => toggleAsset('lightings'));
});






/////////////////////////  Load Avatar on click  //////////////////////////////
async function loadAndSendAvatarData(jsonFilePath) {
    try {
      const response = await fetch(jsonFilePath);
      const jsonData = await response.json();
      handleSendCommands({ resetavatar: JSON.stringify(jsonData) });
    } catch (error) {
      console.error('Error loading JSON:', error);
    }
  }


/////////////////////////  Toggle voice male or female  //////////////////////////////

  document.addEventListener('DOMContentLoaded', function() {
    const voiceMappings = {
      "en-US": {
          male: "cmn-TW-Wavenet-C",
          female: "en-GB-News-G"
      }
    };
  
    const voiceButton = document.getElementById('voiceButton');
    const voiceIcon = document.getElementById('voiceIcon');
    let currentGender = 'male';  // Initial gender set to male
  
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
          currentGender = 'male';
          updateVoiceBasedOnGender();
        }
      }, 1000);  // Check every second
    }
  
    // Initialize video check and voice setting on page load
    checkVideoAndSendVoice();
  
    // Toggle gender on button click
    voiceButton.addEventListener('click', updateVoiceIcon);
  });