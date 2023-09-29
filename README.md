# Dynamic form endpoints in dynamic-form-endpoints-in-components

## Get the cloneable

We have a project that you can clone from Made in Webflow to see how this works:

https://webflow.com/made-in-webflow/website/form-action-component-props

## What is it?

In this repo, we highlight how you can you make the action for your form inside a component dynamic. If you have your own service you're using to process forms, then this can be useful to help route forms to different folks or platforms depending on a forms instance

# How does it work

### Webflow component setup

Create a component with a form, and also add a text element to the canvas and remove the default text and leave it empty.
For your form, give the form element a class name we can reference (I used `.form`) and in the form settings, make sure and switch the method to what your endpoint needs (should be `GET`). Then add an endpoint as a fallback in case someone who adds the component to a page doesn't specify a new endpoint.

**IMPORTANT:** You need an endpoint added inside Webflow, or adding an action to the form on page load with JavaScript won't work. The form will still be processed by Webflow.

Select your section, container, wrapper (whatever your prefer) and create a component and give it a name. Double click to edit it, select your empty text element and crate a prop for it. I gave mine the name `.endpoint`.
Then I wrapped that text element in a div with the class of hidden and set it to `.display:none`.

### Custom code

To tie all of this together we're using a small amount of JavaScript to get each instance of the component (technically a div inside the component with the class "form-component"). Then we're using that as a selector to get the props passed through the component and then attaching that to the form as the action.

Let's review the code that you would place in the before body custom code in page settings:

```javascript
// when the page loads
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
```

If a prop isn't added, we'll use the default endpoint and console warn on page load.
