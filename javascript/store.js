// Function to fetch group data and create dropdown
async function fetchGroupsAndCreateDropdown() {
    const projectId = '218213';
    const query = new URLSearchParams({}).toString(); // Add any required query parameters

    const resp = await fetch(`https://store.xsolla.com/api/v2/project/${projectId}/items/groups?${query}`, {method: 'GET'});

    if (!resp.ok) {
        console.error('Failed to fetch group data');
        return;
    }

    const data = await resp.json(); // Assuming the response is in JSON format
    console.log("All data received:", data);  // Log the entire response data

    // Create dropdown element
    const dropdown = document.createElement('select');
    dropdown.className = 'block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50';

    // Populate dropdown with group options
    data.groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.external_id; // Assuming 'external_id' is the identifier for a group
        option.textContent = group.name; // Assuming 'name' is the display name for a group
        dropdown.appendChild(option);
    });

    // Append dropdown to the DOM
    const container = document.getElementById('dropdown-container'); // Make sure this ID matches your container's ID
    container.appendChild(dropdown);

    // Event listener for when a group is selected in the dropdown
    dropdown.addEventListener('change', (event) => {
        const selectedGroup = event.target.value; // Get the selected group value
        fetchItemsByGroup(selectedGroup); // Call the function with the selected group
    });

    // Pre-select a group (for example, the first group in the list)
    if (data.groups.length > 0) {
        dropdown.selectedIndex = 0; // Set the selected index to 0 to select the first group
        const selectedGroup = data.groups[0].external_id; // Get the selected group value
        fetchItemsByGroup(selectedGroup); // Call the function with the selected group
    }
}

// Function to fetch user's export credits
async function fetchExportCredits(userToken) {
    const query = new URLSearchParams({ platform: 'xsolla' }).toString();
    const projectId = '218213';
  
    try {
      const resp = await fetch(
        `https://store.xsolla.com/api/v2/project/${projectId}/user/virtual_currency_balance?${query}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );
  
  
      if (resp.ok) {
        const data = await resp.json();
        if (data.items && data.items.length > 0) {
          const exportCredits = data.items[0].amount;
          document.getElementById('exportCredits').textContent = exportCredits; // Display credits in the HTML element
        }
      } else {
        console.error('Failed to fetch export credits data');
      }
    } catch (error) {
      console.error('Error fetching export credits data:', error);
    }
  }

// Function to fetch virtual items from the selected group
async function fetchItemsByGroup(selectedGroup) {
    const projectId = '218213';
    
    const query = new URLSearchParams({
        limit: '50',
        offset: '0',
        locale: 'en',
       
    }).toString();
    
    const resp = await fetch(
        `https://store.xsolla.com/api/v2/project/${projectId}/items/virtual_items/group/${selectedGroup}?${query}`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eop57k1boA7nnYPtewZ6KEXJyJADEwRT' // Replace with your Bearer token
            }
        }
    );
    
    if (resp.ok) {
        const data = await resp.json();
        const itemListContainer = document.getElementById('itemList');
        console.log("data store:", data);  // Log the entire response data

    
        // Clear the itemListContainer before adding new items
        itemListContainer.innerHTML = '';
    
        if (data.items && data.items.length > 0) {
            data.items.forEach((item) => {
                // Create card container
                const card = document.createElement('div');
                card.className = 'w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden m-3';
                
                // Create image container
                const imageContainer = document.createElement('div');
                imageContainer.className = 'h-60 w-60 bg-cover bg-center';
                imageContainer.style.backgroundImage = `url('${item.image_url}')`;
        
                // Create info container
                const infoContainer = document.createElement('div');
                infoContainer.className = 'px-5 py-3';
                infoContainer.style.backgroundColor = '#1e1e1e79';
                
                // Item title
                const title = document.createElement('h3');
                title.className = 'text-slate-50 uppercase';
                title.textContent = item.name;
                
                // Price container with credit image, price text, and buy button
                const priceContainer = document.createElement('div');
                priceContainer.className = 'flex items-center justify-between mt-2'; 
        
                // Credit image
                if (item.virtual_prices.length > 0 && item.virtual_prices[0].image_url) {
                    const creditImage = document.createElement('img');
                    creditImage.src = item.virtual_prices[0].image_url;
                    creditImage.alt = "Credit";
                    creditImage.className = 'w-5 h-5';
                    priceContainer.appendChild(creditImage);
                }
        
                // Price text
                const priceText = document.createElement('span');
                priceText.className = 'text-slate-200';
                priceText.textContent = item.virtual_prices.length > 0 ? item.virtual_prices[0].calculated_price.amount : 'Free';
                priceContainer.appendChild(priceText);
        
                // Buy button
                const buyButton = document.createElement('button');
                buyButton.textContent = item.is_free ? 'Claim' : 'Buy'; 
                buyButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
                buyButton.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent the card's click event
                    // Decide the function based on whether the item is free or not
                    if (item.is_free) {
                        purchaseFreeItem(projectId, item.sku, userToken); // Assuming you have a separate function for free items
                    } else {
                        purchaseItemWithCredits(projectId, item.sku, virtualCurrencySku, userToken);
                    }
                });
                priceContainer.appendChild(buyButton);

                // Append elements to info container and then to card
                infoContainer.appendChild(title);
                infoContainer.appendChild(priceContainer); 
                card.appendChild(imageContainer);
                card.appendChild(infoContainer);
                itemListContainer.appendChild(card);

               
            });
        } else {
            itemListContainer.textContent = 'No items available for this group.';
        }
        
        
    } else {
        console.error('Failed to fetch virtual items data');
    }
}

// Call the function to fetch data and create dropdown
fetchGroupsAndCreateDropdown();

async function purchaseFreeItem(projectId, itemSku, userToken) {
    try {
        const response = await fetch(
            `https://store.xsolla.com/api/v2/project/${projectId}/free/item/${itemSku}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to claim free item');
        }

        const data = await response.json();
        console.log('Free item claimed successfully:', data);
        alert('Free item added to your inventory!');
        fetchUserInventory(userToken); // Optionally refresh inventory
    } catch (error) {
        console.error('Error during claiming free item:', error);
        alert('Failed to claim free item: ' + error.message);
    }
}


// Function to handle the purchase
async function purchaseItemWithCredits(projectId, itemSku, virtualCurrencySku, userToken) {
    const query = new URLSearchParams({
        platform: 'xsolla' // Ensure this is correctly set as per the item's requirements
    }).toString();

    try {
        const response = await fetch(
            `https://store.xsolla.com/api/v2/project/${projectId}/payment/item/${itemSku}/virtual/${virtualCurrencySku}?${query}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to complete purchase');
        }

        const data = await response.json();
        fetchUserInventory(userToken);
        // alert('item added to your inventory!');
        await window.fetchExportCredits(userToken); 
    } catch (error) {
        console.error('Error during purchase:', error);
        alert('Purchase failed: ' + error.message);
    }
}

// Retrieve user token from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const userToken = urlParams.get('token');

// Static values for project_id and virtual_currency_sku
const projectId = '218213';
const virtualCurrencySku = 'Reb-credit-01';



// Function to fetch user inventory
async function fetchUserInventory(userToken) {
    const projectId = '218213';
    const platform = 'xsolla'; // Adjust based on your requirements
    const limit = 50;  // Default limit
    const offset = 0;  // Start from the beginning

    try {
        const url = `https://store.xsolla.com/api/v2/project/${projectId}/user/inventory/items`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`, // Ensure the token is passed correctly
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User inventory:', data);
        displayInventory(data); // Function to handle the display of inventory items on the UI
    } catch (error) {
        console.error('Error fetching user inventory:', error);
    }
}

function displayInventory(data) {
    const inventoryContainer = document.getElementById('inventory-container'); // Ensure you have this in your HTML
    inventoryContainer.innerHTML = ''; // Clear previous entries
  
    data.items.forEach(item => {
        // Skip displaying Reblium export credit
        if (item.name === "Reblium export credit" || item.sku === "Reb-credit-01") {
            return; // Continue to the next iteration, skipping this item
        }
  
        // Create the card container
        const card = document.createElement('div');
        card.className = 'w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden m-3';
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'h-60 w-full bg-cover bg-center';
        imageContainer.style.backgroundImage = `url('${item.image_url}')`;
  
        // Create info container
        const infoContainer = document.createElement('div');
        infoContainer.className = 'px-5 py-3 bg-slate-900 text-white';  // Adjusted for dark theme with white text
  
        // Item title
        const title = document.createElement('h3');
        title.className = 'text-lg font-bold uppercase';
        title.textContent = item.name;
  
        // Append title to info container
        infoContainer.appendChild(title);
  
        // Optional: Show quantity if relevant
        if (item.quantity > 0) {
            const quantityText = document.createElement('span');
            quantityText.className = 'block text-sm mt-1';
            quantityText.textContent = `Quantity: ${item.quantity}`;
            infoContainer.appendChild(quantityText);
        }
  
        
  
        // Append image and info containers to the card
        card.appendChild(imageContainer);
        card.appendChild(infoContainer);
  
        // Append the card to the inventory container
        inventoryContainer.appendChild(card);
    });
  
    // Check if inventory is empty and display a message if so
    if (data.items.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your inventory is empty.';
        emptyMessage.className = 'text-center text-gray-500';
        inventoryContainer.appendChild(emptyMessage);
    }
  }




// Example usage
fetchUserInventory(userToken);
