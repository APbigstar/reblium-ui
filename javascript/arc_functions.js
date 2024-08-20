  function showLoader() {
    const loaderOverlay = document.querySelector(".loader-overlay");
    loaderOverlay.style.display = "flex";
  }

  function hideLoader() {
    const loaderOverlay = document.querySelector(".loader-overlay");
    loaderOverlay.style.display = "none";
  }

  function handleApplicationResponse(response) {
    const responseContainer = document.createElement("div");
    responseContainer.classList.add("response-container");
    responseContainer.innerText = response;
    document.body.appendChild(responseContainer);
  }

