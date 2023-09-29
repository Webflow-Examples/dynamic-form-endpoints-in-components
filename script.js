window.addEventListener("load", () => {
  // Get all instances of the form component
  const formComponents = document.querySelectorAll(".form-component");

  // For each instance of the component
  formComponents.forEach((component) => {
    // Get the element with a class of .endpoint inside the component
    const endpointElement = component.querySelector(".endpoint");

    // If the .endpoint element exists and its text is not empty
    if (endpointElement && endpointElement.innerText.trim() !== "") {
      // Get the text inside the .endpoint element
      const formEndpoint = endpointElement.innerText;
      // Get the form element inside the component
      const formElement = component.querySelector(".form");

      // Update the form endpoint to what is added to the component prop
      formElement.action = formEndpoint;
    } else {
      // If the .endpoint element does not exist or its text is empty
      console.warn("No endpoint provided for a form component or it's empty.");
    }
  });
});
