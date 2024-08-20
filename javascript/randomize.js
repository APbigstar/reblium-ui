
// Randomize the sliders in skin section
function randomizeSliders() {

    const assets = {
      "Age": {
        "variations": ["Age_Variation_25_40_Var1", "Age_Variation_25_40_Var1_0", "Age_Variation_25_40_Var1_1", "Age_Variation_25_40_Var1_2", "Age_Variation_25_40_Var1_3", "Age_Variation_25_40_Var1_4", "Age_Variation_25_40_Var1_5", "Age_Variation_25_40_Var1_6"],
        "currentIndex": 0
      },
      "Rosacea": {
        "variations": ["Rosacea_01", "Blushing_allover", "Blushing_Cheeks", "Blushing_FaceBottom", "Blushing_FullFace", "00_NoRosacea"],
        "currentIndex": 0
      },
      "Mole": {
        "variations": ["Moles_01", "Moles_02", "No_Mole", "Moles_03"],
        "currentIndex": 0
      },
      "Acne": {
        "variations": ["Acne_01", "Acne_02", "Acne_03", "Acne_04"],
        "currentIndex": 0
      },
      "Pimples": {
        "variations": ["Pimples_01", "Pimples_02", "Pimples_03", "Pimples_04"],
        "currentIndex": 0
      },
      "Freckles": {
        "variations": ["Freckles_Variation_01", "Freckles_Variation_02", "Freckles_Variation_03", "Freckle_Variation_04", "Freckles_Variation_05", "Freckle_Variation_06", "Freckle_Variation_07"],
        "currentIndex": 0
      },
      "Stubble": {
        "variations": ["Stubbles_Beard_Full_Diffuse"],
        "currentIndex": 0
      }
    };

      // List of slider IDs you want to include in the randomization
      const sliderIds = [
      'ageButton', 'rosaceaButton', 'moleButton',
      'acneButton', 'pimpelsButton', 'frecklesButton'
    ];
    // Get all asset categories from the object keys
    const assetCategories = Object.keys(assets);

    assetCategories.forEach(category => {
        // Randomly select a new asset variation for each category
        const assetInfo = assets[category];
        const totalVariations = assetInfo.variations.length;
        const randomIndex = Math.floor(Math.random() * totalVariations);
        const selectedAsset = assetInfo.variations[randomIndex];

        // Find the corresponding slider based on category ID
        const sliderId = category.toLowerCase() + 'Button'; // e.g., 'ageButton'
        const slider = document.querySelector('#' + sliderId)?.parentNode?.parentNode?.querySelector('.slider');

        if (slider) {
            // Randomly set the slider value
            const min = parseFloat(slider.min);
            const max = parseFloat(slider.max);
            const step = parseFloat(slider.step);
            const randomValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;

            slider.value = randomValue.toFixed(1); // Set the new random value
            const valueDisplay = slider.parentNode.querySelector('.slider-value');
            valueDisplay.textContent = randomValue; // Update the display

            // Construct a safe command to send
            handleSendCommands({
                assetname: selectedAsset,
                slidertype: `${category}*${randomValue}`
            });
        }
    });

    sliderIds.forEach(id => {
        const slider = document.querySelector('#' + id).parentNode.parentNode.querySelector('.slider');
        if (slider) {

            event.preventDefault();
            event.stopPropagation();

            // Calculate a random value within the slider's range
            const min = parseFloat(slider.min);
            const max = parseFloat(slider.max);
            const step = parseFloat(slider.step);
            const randomValue = (Math.floor(Math.random() * ((max - min) / step + 1)) * step + min).toFixed(1);

            // Set the slider value
            slider.value = randomValue;

            // Update the corresponding slider value display
            const valueDisplay = slider.parentNode.querySelector('.slider-value');
            if (valueDisplay) {
                valueDisplay.textContent = randomValue;
            }

            // Send the command via handleSendCommands
            const command = slider.getAttribute('oninput').replace(/this.value/g, randomValue);
            eval(command);  // Caution: using eval() has security implications
        }
    });
}

// Randomizer the hair assets
let hairAssets = [
    'hair_08_v2', 'Hair_Male_03', 'Hair_Male_02', 'Hair_Male_01', 
    'Hair_Wavy_03', 'Hair_Straight_02', 'Hair_Wavy_02', 'AB_Hair_04',
    'AB_Hair_03', 'AB_Hair_02', 'AB_Hair_01', 'Hair_Wavy_01', 
    'Hair_Straight_01', 'High_ponytail', 'DG', 'Stephanie', 
    'Afro', 'Angel_braids', 'Angel_ponytail', 'Bi_Wen_Jin', 
    'Brad_Pitt_Hair', 'Buzzcut', 'Crypto', 'Cuban', 
    'Curly', 'Curly_Ponytail', 'David_Schwarztz', 'Dom',
    'Elon_Musk', 'Gary_Vee', 'Katy_Perry', 'Livi',
    'Madonna_Hair', 'Marilyn_Monroe', 'Mason', 'Max', 
    'Natalia', 'Peaky_Blinders_Hair', 'Pixie_cut', 'Sadaf', 
    'Sisi', 'Snoop_Dogg', 'Suzanne', 'Tijmen', 'Wavy', 'William', 
    'Wolfcut', 'Zuckerberg', 'AliceHair', 'CyberCut', 
    'Lil_Miquela', 'StraightBangs', 'Mohawk', 'Eva',
    'Hair_Straight_01', 'Hair_Wavy_01', 'AB_Hair_01'
];


function randomizeHair() {
    event.preventDefault();
    event.stopPropagation();
    const randomIndex = Math.floor(Math.random() * hairAssets.length); // Get a random index
    const selectedHairAsset = hairAssets[randomIndex]; // Pick a hair asset name from the array

    
    // Call a function to send the command with the selected hair asset
    handleSendCommands({ assetname: selectedHairAsset });

    console.log("Randomized hair asset command sent:", selectedHairAsset); // Optional: log the asset name
}



// Randomizer for Eyebrows
let eyebrowAssets = [
    'No_Eyebrow', 'Eyebrows_7', 'Eyebrows_6', 'Eyebrows_11', 'Eyebrows_Unibrow_3',
    'Eyebrows_Name_10', 'Eyebrows_Name_2', 'Eyebrows_SadafJadran', 'Eyebrows_SnoopDogg',
    'Eyebrows_Unibrow_1', 'Eyebrows_Unibrow_2', 'Eyebrows_Unibrow_4', 'F_Brows_001',
    'F_Brows_002', 'F_Brows_003', 'F_Brows_004', 'F_Brows_005', 'M_Brows_001',
    'M_Brows_002', 'M_Brows_003', 'Brows_LessDense_01', 'Brows_LessDense_02'
];

function randomizeEyebrows() {
    event.preventDefault();
    event.stopPropagation();
    const randomIndex = Math.floor(Math.random() * eyebrowAssets.length); // Get a random index
    const selectedEyebrowAsset = eyebrowAssets[randomIndex]; // Pick an eyebrow asset name from the array

    // Call a function to send the command with the selected eyebrow asset
    handleSendCommands({ assetname: selectedEyebrowAsset });

    console.log("Randomized eyebrow asset command sent:", selectedEyebrowAsset); // Optional: log the asset name
}




// Randomizer for Eyelashes
let eyelashAssets = [
    'Lashes_Short', 'DefaultEyelashes', 'Girly', 'Alice_Eyelashes', 
    'Eyelashes_Clumped_Lashes', 'AB_Lashes_01'
];

function randomizeEyelashes() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * eyelashAssets.length); // Get a random index
    const selectedEyelashAsset = eyelashAssets[randomIndex]; // Pick an eyelash asset name from the array

    // Call a function to send the command with the selected eyelash asset
    handleSendCommands({ assetname: selectedEyelashAsset });

    console.log("Randomized eyelash asset command sent:", selectedEyelashAsset); // Optional: log the asset name
}




// Randomizer for Mustache
let mustacheAssets = [
    '00_NO_Mustache', 'Zorro', 'Frenchfork_01', 'mustache_Hook',
    'mustache_Horseshoe', 'Straight_Mustaches', 'Mustache_Chevron',
    'Mustache_Dali', 'Mustache_Frenchfork_02', 'Mustache_Gooate',
    'Mustache_Imperial', 'Mustache_Vandyke', 'Mustache_Vikinggoatee'
];

function randomizeMustache() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * mustacheAssets.length); // Get a random index
    const selectedMustacheAsset = mustacheAssets[randomIndex]; // Pick a mustache asset name from the array

    // Call a function to send the command with the selected mustache asset
    handleSendCommands({ assetname: selectedMustacheAsset });

    console.log("Randomized mustache asset command sent:", selectedMustacheAsset); // Optional: log the asset name
}





// Randomize for Beard
let beardAssets = [
    '00_NO_Beard', 'Imperial', 'beard_JohnDeaton', 'beard_FrenchFork',
    'Beard_Brad_Garlinghouse', 'Beard_Brad_Pitt', 'Beard_David_Schwarztz',
    'Beard_Elon_Musk', 'Beard_Farokh', 'Beard_Frenchfork_Short', 
    'Beard_Fullbeard', 'Beard_Gooate_Chin_Beard', 'Beard_JeremyHogan', 
    'Beard_Long_Straight', 'Beard_MartinHiesboeck', 'Beard_Mason', 
    'Beard_Muttonchops', 'Beard_Panos', 'Beard_SnoopDogg', 
    'Beard_Soulpatch', 'Beard_Vandyke', 'Beard_Vandyke_Chin', 
    'Beard_Vikinggoatee', 'Beard_Zorro_Chin', 'Beard_Stubble'
];

function randomizeBeard() {
    event.preventDefault();
    event.stopPropagation();

    const randomIndex = Math.floor(Math.random() * beardAssets.length); // Get a random index
    const selectedBeardAsset = beardAssets[randomIndex]; // Pick a beard asset name from the array

    // Call a function to send the command with the selected beard asset
    handleSendCommands({ assetname: selectedBeardAsset });

    console.log("Randomized beard asset command sent:", selectedBeardAsset); // Optional: log the asset name
}




// Randomize for HairCards
let haircardAssets = [
    'Hair01_cinematic', 'Hair02_cinematic', 'Hair03_cinematic', 'Hair04_LumiaEve_cinematic',
    'Mesh_hair_style1', 'Mesh_hair_style2'
];

function randomizeHaircard() {
    event.preventDefault();
    event.stopPropagation();

    const randomIndex = Math.floor(Math.random() * haircardAssets.length); // Get a random index
    const selectedHaircardAsset = haircardAssets[randomIndex]; // Pick a haircard asset name from the array

    // Call a function to send the command with the selected haircard asset
    handleSendCommands({ assetname: selectedHaircardAsset });

    console.log("Randomized haircard asset command sent:", selectedHaircardAsset); // Optional: log the asset name
}




// Randomize for lipstick
let lipstickAssets = [
    '00_Lipstick', 'Lipstick_01', 'lipstick_02', 'lipstick_Big', 
    'lipstick_BigBlur', 'lipstick_Gradient', 'lipstick_HalfGradient', 
    'lipstick_Outline', 'Lipstick_Stylised_01', 'Lipstick_Stylised_02', 
    'lipstick_Symmetrical', 'lipstick_UpperLip', 'lipstick_03', 'lipstick_04', 
    'lipstick_Butterfly', 'lipstick_Drip', 'lipstick_Smudged'
];

function randomizeLipstick() {
    event.preventDefault();
    event.stopPropagation();

    const randomIndex = Math.floor(Math.random() * lipstickAssets.length); // Get a random index
    const selectedLipstickAsset = lipstickAssets[randomIndex]; // Pick a lipstick asset name from the array

    // Call a function to send the command with the selected lipstick asset
    handleSendCommands({ assetname: selectedLipstickAsset, slidertype: 'M_Switch_Lipstick*1' });

    console.log("Randomized lipstick asset command sent:", selectedLipstickAsset); // Optional: log the asset name
}




// Randomize Eye Shadow
let eyeShadowAssets = [
    '00_EyesShadow', 'Eye_Shadow_SmokeyCatEye', 'Shadow_2', 'EyeShadow_Panda_Icon', 'Preset_RedBlue'
];

function randomizeEyeShadow() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * eyeShadowAssets.length); // Get a random index
    const selectedEyeShadow = eyeShadowAssets[randomIndex]; // Pick an eye shadow asset from the array

    // Call a function to send the command with the selected eye shadow
    handleSendCommands({ assetname: selectedEyeShadow });

    console.log("Randomized eye shadow command sent:", selectedEyeShadow); // Optional: log the asset name
}





// Randomize for Eyeliner
let eyelinerAssets = [
    '00_EyesLine', 'Simple', 'Eyeliner_Droopy', 'Eyeliner_Flick',
    'Eyeliner_SimpleLong', 'Eyeliner_Double', 'Eyeliner_Fox', 'Eyeliner_DoubleFlick',
    'Eyeliner_Dramatic', 'Eyeliner_GraphicLiner_02', 'Eyeliner_Arabic', 'Eyeliner_Triangle',
    'Eyeliner_Clown', 'Eyeliner_Low', 'Eyeliner_GraphicLiner_04'
];


function randomizeEyeliner() {
    event.preventDefault();
    event.stopPropagation();

    const randomIndex = Math.floor(Math.random() * eyelinerAssets.length); // Get a random index
    const selectedEyelinerAsset = eyelinerAssets[randomIndex]; // Pick an eyeliner asset from the array

    // Call a function to send the command with the selected eyeliner asset
    handleSendCommands({ assetname: selectedEyelinerAsset });

    console.log("Randomized eyeliner asset command sent:", selectedEyelinerAsset); // Optional: log the asset name
}




// Randomize Facepaint
let facePaintAssets = [
    'NO_facePaint', 'facePaint_Clown', 'facePaint_Honey', 'facePaint_Mermaid',
    'facePaint_Reindeer', 'facePaint_SugarSkull', 'facePaint_Tiger', 'facePaint_Zebra',
    'facePaint_Amphibian', 'facePaint_Avatar', 'facePaint_Dog', 'facePaint_Dragon',
    'facePaint_Goat', 'facePaint_Monkey', 'facePaint_Ox'
];


function randomizeFacePaint() {
    event.preventDefault();
    event.stopPropagation();

    const randomIndex = Math.floor(Math.random() * facePaintAssets.length); // Get a random index
    const selectedFacePaint = facePaintAssets[randomIndex]; // Pick a face paint asset from the array

    // Call a function to send the command with the selected face paint
    handleSendCommands({ assetname: selectedFacePaint });

    console.log("Randomized face paint command sent:", selectedFacePaint); // Optional: log the asset name
}




// Randomize Tattoos
let tattooAssets = [
    'NO_facePaint', 'Preset_FaceTattoos', 'facetattoo_maori', 'Face_Tattoo_4',
    'Face_Tattoo_5', 'Face_Tattoo_6', 'Face_Tattoo_7', 'Face_Tattoo_8'
];

function randomizeTattoo() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * tattooAssets.length); // Get a random index
    const selectedTattoo = tattooAssets[randomIndex]; // Pick a tattoo asset from the array

    // Call a function to send the command with the selected tattoo
    handleSendCommands({ assetname: selectedTattoo });

    console.log("Randomized tattoo command sent:", selectedTattoo); // Optional: log the asset name
}


// Randomize Iris Lens
let irisLensAssets = [
    '00_Lens', 'Iris_Ocean', 'Iris_Cyborg', 'Iris_Ghost', 'Iris_Heart',
    'Iris_Pentagram', 'Iris_Smiley', 'Iris_Snake', 'Iris_Brown'
];

function randomizeIrisLens() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * irisLensAssets.length); // Get a random index
    const selectedIrisLens = irisLensAssets[randomIndex]; // Pick an iris lens asset from the array

    // Call a function to send the command with the selected iris lens
    handleSendCommands({ assetname: selectedIrisLens });

    console.log("Randomized iris lens command sent:", selectedIrisLens); // Optional: log the asset name
}



// Randomize Iris
let irisAssets = [
    'Iris_brown3', 'iris_Brown', 'Iris_blue2', 'Iris_blue', 'Iris_blue2_1',
    'Iris_blue2_2', 'Iris_bluerazy', 'Iris_brown2', 'Iris_brown4',
    'Iris_Green', 'Iris_green2', 'Iris_greenY', 'Iris_Brown5'
];

function randomizeIris() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * irisAssets.length); // Get a random index
    const selectedIris = irisAssets[randomIndex]; // Pick an iris asset from the array

    // Call a function to send the command with the selected iris
    handleSendCommands({ assetname: selectedIris });

    console.log("Randomized iris command sent:", selectedIris); // Optional: log the asset name
}





// Randomize Special
let specialAssets = [
    'NO_Special', 'Cyber_1', 'Cyberpunk_Cheek_Implant', 'Cyberpunk_Face_Battery',
    'Cyberpunk_Face_Implants', 'Cyberpunk_Hexagon_Implants', 'Cyberpunk_Horizontal_Implants',
    'Cyberpunk_Jaw', 'Cyberpunk_Metal_Implants', 'Fantasy_Gold_Armor'
];

function randomizeSpecial() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * specialAssets.length); // Get a random index
    const selectedSpecial = specialAssets[randomIndex]; // Pick a special asset from the array

    // Call a function to send the command with the selected special
    handleSendCommands({ assetname: selectedSpecial });

    console.log("Randomized special command sent:", selectedSpecial); // Optional: log the asset name
}





// Randomize Eyes
let eyesAssets = [
    'Afro_01_Eyes', 'Afro_02_Eyes', 'Arabic_01_Eyes', 'Arabic_02_Eyes', 
    'Asian_01_Eyes', 'Asian_02_Eyes', 'Asian_03_Eyes', 'Asian_04_Eyes',
    'Asian_05_Eyes', 'Asian_06_Eyes', 'Asian_07_Eyes', 'Asian_08_Eyes',
    'Asian_09_Eyes', 'Asian_10_Eyes', 'Asian_11_Eyes', 'Asian_12_Eyes',
    'Asian_13_Eyes', 'Asian_14_Eyes', 'Asian_15_Eyes', 'Asian_16_Eyes',
    'Asian_17_Eyes', 'Asian_18_Eyes', 'Asian_19_Eyes', 'Asian_20_Eyes',
    'Asian_21_Eyes', 'Asian_22_Eyes', 'Asian_23_Eyes', 'Asian_24_Eyes',
    'Asian_25_Eyes', 'Asian_26_Eyes', 'Asian_27_Eyes', 'Asian_28_Eyes',
    'Caucasian_02_Eyes', 'Caucasian_03_Eyes', 'Caucasian_04_Eyes',
    'Caucasian_05_Eyes', 'Caucasian_06_Eyes', 'Caucasian_07_Eyes',
    'Caucasian_08_Eyes', 'Caucasian_09_Eyes', 'Caucasian_10_Eyes',
    'Indian_01_Eyes', 'Indian_02_Eyes', 'Indian_03_Eyes',
    'Indigenous_01_Eyes', 'Latin_01_Eyes', 'Latin_02_Eyes', 'Latin_03_Eyes',
    'Latin_04_Eyes', 'Latin_05_Eyes', 'Latin_06_Eyes', 'Latin_07_Eyes',
    'Latin_08_Eyes', 'Latin_09_Eyes'
];

function randomizeEyes() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * eyesAssets.length); // Get a random index
    const selectedEyes = eyesAssets[randomIndex]; // Pick an eyes asset from the array

    // Call a function to send the command with the selected eyes
    handleSendCommands({ assetname: selectedEyes });

    console.log("Randomized eyes command sent:", selectedEyes); // Optional: log the asset name
}






// Randomize Ears
let earsAssets = [
    'Afro_01_Ears', 'Afro_02_Ears', 'Arabic_01_Ears', 'Arabic_02_Ears',
    'Asian_01_Ears', 'Asian_02_Ears', 'Asian_03_Ears', 'Asian_04_Ears',
    'Asian_05_Ears', 'Asian_06_Ears', 'Asian_07_Ears', 'Asian_08_Ears',
    'Caucasian_01_Ears', 'Caucasian_02_Ears', 'Caucasian_03_Ears',
    'Caucasian_04_Ears', 'Caucasian_05_Ears', 'Caucasian_06_Ears',
    'Ear_001', 'Ear_002', 'Ear_003', 'Ear_004', 'Ear_005',
    'Indian_01_Ears', 'Indian_02_Ears', 'Indian_03_Ears',
    'Indigenous_01_Ears', 'Latin_01_Ears', 'Latin_02_Ears', 'Latin_03_Ears',
    'Latin_04_Ears', 'Latin_05_Ears', 'Latin_06_Ears', 'Latin_07_Ears',
    'Latin_08_Ears', 'Latin_09_Ears'
];

function randomizeEars() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * earsAssets.length); // Get a random index
    const selectedEars = earsAssets[randomIndex]; // Pick an ears asset from the array

    // Call a function to send the command with the selected ears
    handleSendCommands({ assetname: selectedEars });

    console.log("Randomized ears command sent:", selectedEars); // Optional: log the asset name
}







// Randomize Nose
let noseAssets = [
    'Afro_01_Nose', 'Afro_02_Nose', 'Arabic_01_Nose', 'Arabic_02_Nose',
    'Asian_01_Nose', 'Asian_02_Nose', 'Asian_03_Nose', 'Asian_04_Nose',
    'Asian_05_Nose', 'Asian_06_Nose', 'Asian_07_Nose', 'Asian_08_Nose',
    'Caucasian_01_Nose', 'Caucasian_02_Nose', 'Caucasian_03_Nose',
    'Caucasian_04_Nose', 'Caucasian_05_Nose', 'Caucasian_06_Nose',
    'Indian_01_Nose', 'Indian_02_Nose', 'Indian_03_Nose',
    'Indigenous_01_Nose', 'Latin_01_Nose', 'Latin_02_Nose', 'Latin_03_Nose',
    'Latin_04_Nose', 'Latin_05_Nose', 'Nose_001', 'Nose_002', 'Nose_003',
    'Nose_004', 'Nose_005', 'Nose_006', 'Nose_007', 'Nose_008',
    'Nose_009', 'Nose_010', 'Nose_011', 'Nose_012', 'Nose_013',
    'Nose_014', 'Nose_015', 'Nose_016', 'Nose_017', 'Nose_018',
    'Nose_019', 'Nose_020', 'Nose_021', 'Nose_022', 'Nose_023',
    'Nose_024', 'Nose_025', 'Nose_026', 'Afro_03_Nose', 'Afro_Nose_Variation_01',
    'Afro_Nose_Variation_02', 'Afro_Nose_Variation_03', 'Afro_Nose_Variation_05',
    'Afro_Nose_Variation_06', 'Arabic_03_Nose', 'Asian_09_Nose', 'Asian_10_Nose',
    'Asian_11_Nose', 'Asian_12_Nose', 'Asian_13_Nose', 'Asian_14_Nose',
    'Asian_15_Nose', 'Asian_16_Nose', 'Asian_17_Nose', 'Asian_18_Nose',
    'Asian_19_Nose', 'Asian_20_Nose', 'Asian_21_Nose', 'Asian_22_Nose',
    'Asian_23_Nose', 'Asian_24_Nose', 'Asian_25_Nose', 'Asian_26_Nose',
    'Asian_27_Nose', 'Asian_28_Nose', 'Asian_29_Nose', 'Asian_30_Nose',
    'Caucasian_07_Nose', 'Caucasian_08_Nose', 'Caucasian_09_Nose', 'Caucasian_10_Nose',
    'Latin_06_Nose', 'Latin_07_Nose', 'Latin_08_Nose', 'Latin_09_Nose'
];

function randomizeNose() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * noseAssets.length); // Get a random index
    const selectedNose = noseAssets[randomIndex]; // Pick a nose asset from the array

    // Call a function to send the command with the selected nose
    handleSendCommands({ assetname: selectedNose });

    console.log("Randomized nose command sent:", selectedNose); // Optional: log the asset name
}







// Randomize Mouth
let mouthAssets = [
    'Afro_01_Mouth', 'Afro_02_Mouth', 'Afro_03_Mouth', 'Arabic_01_Mouth',
    'Arabic_02_Mouth', 'Arabic_03_Mouth', 'Asian_01_Mouth', 'Asian_02_Mouth',
    'Asian_03_Mouth', 'Asian_04_Mouth', 'Asian_05_Mouth', 'Asian_06_Mouth',
    'Asian_07_Mouth', 'Asian_08_Mouth', 'Asian_09_Mouth', 'Asian_10_Mouth',
    'Asian_11_Mouth', 'Asian_12_Mouth', 'Asian_13_Mouth', 'Asian_14_Mouth',
    'Asian_15_Mouth', 'Asian_16_Mouth', 'Asian_17_Mouth', 'Asian_18_Mouth',
    'Asian_19_Mouth', 'Asian_20_Mouth', 'Asian_21_Mouth', 'Asian_22_Mouth',
    'Asian_23_Mouth', 'Asian_24_Mouth', 'Asian_25_Mouth', 'Asian_26_Mouth',
    'Asian_27_Mouth', 'Asian_28_Mouth', 'Asian_29_Mouth', 'Asian_30_Mouth',
    'Caucasian_01_Mouth', 'Caucasian_02_Mouth', 'Caucasian_03_Mouth', 'Caucasian_04_Mouth',
    'Caucasian_05_Mouth', 'Caucasian_06_Mouth', 'Caucasian_07_Mouth', 'Caucasian_08_Mouth',
    'Caucasian_09_Mouth', 'Caucasian_10_Mouth', 'Indian_01_Mouth', 'Indian_02_Mouth',
    'Indian_03_Mouth', 'Indigenous_01_Mouth', 'Latin_01_Mouth', 'Latin_02_Mouth',
    'Latin_03_Mouth', 'Latin_04_Mouth', 'Latin_05_Mouth', 'Latin_06_Mouth',
    'Latin_07_Mouth', 'Latin_08_Mouth', 'Latin_09_Mouth'
];

function randomizeMouth() {
    event.preventDefault();
    event.stopPropagation();

    const randomIndex = Math.floor(Math.random() * mouthAssets.length); // Get a random index
    const selectedMouth = mouthAssets[randomIndex]; // Pick a mouth asset from the array

    // Call a function to send the command with the selected mouth
    handleSendCommands({ assetname: selectedMouth });

    console.log("Randomized mouth command sent:", selectedMouth); // Optional: log the asset name
}







// Randomize Cheeks
let cheeksAssets = [
    'Afro_01_Cheeks', 'Afro_02_Cheeks', 'Afro_03_Cheeks', 'Arabic_01_Cheeks',
    'Arabic_02_Cheeks', 'Arabic_03_Cheeks', 'Asian_01_Cheeks', 'Asian_02_Cheeks',
    'Asian_03_Cheeks', 'Asian_04_Cheeks', 'Asian_05_Cheeks', 'Asian_06_Cheeks',
    'Asian_07_Cheeks', 'Asian_08_Cheeks', 'Asian_09_Cheeks', 'Asian_10_Cheeks',
    'Asian_11_Cheeks', 'Asian_12_Cheeks', 'Asian_13_Cheeks', 'Asian_14_Cheeks',
    'Asian_15_Cheeks', 'Asian_16_Cheeks', 'Asian_17_Cheeks', 'Asian_18_Cheeks',
    'Asian_19_Cheeks', 'Asian_20_Cheeks', 'Asian_21_Cheeks', 'Asian_22_Cheeks',
    'Asian_23_Cheeks', 'Asian_24_Cheeks', 'Asian_25_Cheeks', 'Asian_26_Cheeks',
    'Asian_27_Cheeks', 'Asian_28_Cheeks', 'Asian_29_Cheeks', 'Asian_30_Cheeks',
    'Caucasian_01_Cheeks', 'Caucasian_02_Cheeks', 'Caucasian_03_Cheeks', 'Caucasian_04_Cheeks',
    'Caucasian_05_Cheeks', 'Caucasian_06_Cheeks', 'Caucasian_07_Cheeks', 'Caucasian_08_Cheeks',
    'Caucasian_09_Cheeks', 'Caucasian_10_Cheeks', 'Indian_01_Cheeks', 'Indian_02_Cheeks',
    'Indian_03_Cheeks', 'Indigenous_01_Cheeks', 'Latin_01_Cheeks', 'Latin_02_Cheeks',
    'Latin_03_Cheeks', 'Latin_04_Cheeks', 'Latin_05_Cheeks', 'Latin_06_Cheeks',
    'Latin_07_Cheeks', 'Latin_08_Cheeks', 'Latin_09_Cheeks'
];

function randomizeCheeks() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * cheeksAssets.length); // Get a random index
    const selectedCheeks = cheeksAssets[randomIndex]; // Pick a cheeks asset from the array

    // Call a function to send the command with the selected cheeks
    handleSendCommands({ assetname: selectedCheeks });

    console.log("Randomized cheeks command sent:", selectedCheeks); // Optional: log the asset name
}





// Randomize Jaw Assets
let jawAssets = [
    'Afro_01_Jaw', 'Afro_02_Jaw', 'Afro_03_Jaw', 'Arabic_01_Jaw',
    'Arabic_02_Jaw', 'Arabic_03_Jaw', 'Asian_01_Jaw', 'Asian_02_Jaw',
    'Asian_03_Jaw', 'Asian_04_Jaw', 'Asian_05_Jaw', 'Asian_06_Jaw',
    'Asian_07_Jaw', 'Asian_08_Jaw', 'Asian_09_Jaw', 'Asian_10_Jaw',
    'Asian_11_Jaw', 'Asian_12_Jaw', 'Asian_13_Jaw', 'Asian_14_Jaw',
    'Asian_15_Jaw', 'Asian_16_Jaw', 'Asian_17_Jaw', 'Asian_18_Jaw',
    'Asian_19_Jaw', 'Asian_20_Jaw', 'Asian_21_Jaw', 'Asian_22_Jaw',
    'Asian_23_Jaw', 'Asian_24_Jaw', 'Asian_25_Jaw', 'Asian_26_Jaw',
    'Asian_27_Jaw', 'Asian_28_Jaw', 'Asian_29_Jaw', 'Asian_30_Jaw',
    'Caucasian_01_Jaw', 'Caucasian_02_Jaw', 'Caucasian_03_Jaw', 'Caucasian_04_Jaw',
    'Caucasian_05_Jaw', 'Caucasian_06_Jaw', 'Caucasian_07_Jaw', 'Caucasian_08_Jaw',
    'Caucasian_09_Jaw', 'Caucasian_10_Jaw', 'Indian_01_Jaw', 'Indian_02_Jaw',
    'Indian_03_Jaw', 'Indigenous_01_Jaw', 'Latin_01_Jaw', 'Latin_02_Jaw',
    'Latin_03_Jaw', 'Latin_04_Jaw', 'Latin_05_Jaw', 'Latin_06_Jaw',
    'Latin_07_Jaw', 'Latin_08_Jaw', 'Latin_09_Jaw'
];

function randomizeJaw() {
    event.preventDefault();
    event.stopPropagation();
    
    const randomIndex = Math.floor(Math.random() * jawAssets.length); // Get a random index
    const selectedJaw = jawAssets[randomIndex]; // Pick a jaw asset from the array

    // Call a function to send the command with the selected jaw
    handleSendCommands({ assetname: selectedJaw });

    console.log("Randomized jaw command sent:", selectedJaw); // Optional: log the asset name
}




document.addEventListener('DOMContentLoaded', function() {
    const randomizeButton = document.getElementById('introcontinue');
    const popupContainer = document.querySelector('.popup-container');

    randomizeButton.addEventListener('click', function() {
        popupContainer.style.display = 'none'; // This will hide the popup
    });
});
