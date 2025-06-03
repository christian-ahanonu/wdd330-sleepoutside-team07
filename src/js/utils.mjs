// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
} 

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get product string 
export function getParam(param) {
  const queryString = window.location.search; // search query string
  const urlParams = new URLSearchParams(queryString); // passed into the new URLSearchParams
  const product = urlParams.get(param) // the search keyword from the query string is retrieved
  return product;
}

// template for products
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template); //list represent json file which is mapped over the template

  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}


// Load header and footer to the DOM
export async function loadHeaderFooter(callback) {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.getElementById("headerData");
  const footerElement = document.getElementById("footerData");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // callback fn is called after the header & footer is loaded into the DOM. 
  if (typeof callback === "function") {
    callback();
  }
}

// Render header and footer using template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}


// fetch content based on the path
export async function loadTemplate(path) {
  const res = await fetch(path)
  const template = await res.text()
  return template;
}


export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const storeElem = document.querySelector("#cart-no")
  
  if (cart.length != 0) {
    const count = cart.length;
    storeElem.textContent = count;
  }
  // else {
  //   storeElem.textContent = "2"
  // }

  // if (storeElem) {
  // }
    
}


