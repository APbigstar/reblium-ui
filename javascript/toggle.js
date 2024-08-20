document.addEventListener('DOMContentLoaded', function() {
    const newButton = document.getElementById('newButton');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const sideMenu = document.getElementById('sideMenu');
    const avatarSection = document.querySelector('.avatar-section');
    const avatarContainer = document.querySelector('.avatar-container');
    const overlayMenu = document.querySelector('.overlay-menu');
  
    const bottomMenu = document.getElementById('bottomMenu');
    const editButton = document.getElementById('editButton');
    const saveExitButton = document.getElementById('saveexitButton');
    const backGround = document.querySelector('.background');
  
  
    // Event listener to handle the double-click on the avatarContainer
    avatarContainer.addEventListener('dblclick', function() {
      toggleUIVisibility();
    });
  
    // Keep track of whether the UI is currently hidden or shown
    let isUIHidden = false;
    const showShortcuts = document.getElementById('shortcutsTable');
  
    // Event listener to handle the Tab key press
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Tab') {
        // Toggle the UI visibility
        isUIHidden = !isUIHidden;
        
        overlayMenu.style.display = isUIHidden ? 'none' : 'block';
        sideMenu.style.display = isUIHidden ? 'none' : 'block';
        showShortcuts.style.display = showShortcuts.style.display === 'none' ? 'block' : 'none'; 
  
      }
    });
  
  
    
  // Event listener for the showShortcutsBtn button
  const iconContainer = document.querySelector('.icon-container'); // Corrected the selector
  
  showShortcutsBtn.addEventListener('click', function() {
    // Toggle the UI visibility
    isUIHidden = !isUIHidden;
    overlayMenu.style.display = isUIHidden ? 'none' : 'block';
    sideMenu.style.display = isUIHidden ? 'none' : 'block';
    
    // Toggle the display of the icon-container
    iconContainer.style.display = iconContainer.style.display === 'none' ? 'block' : 'none';  
  });
  
  
  
    // Event listener for the Save & Exit button
    saveExitButton.addEventListener('click', function() {
      toggleExitSaveUIVisibility();
    });
  
    // Event listener for the submenu button
    const submenuButton = document.getElementById('submenuButton');
    const customSubmenu = document.getElementById('customSubmenu');
    
    submenuButton.addEventListener('click', () => {
      customSubmenu.classList.toggle('active');
    });
  });