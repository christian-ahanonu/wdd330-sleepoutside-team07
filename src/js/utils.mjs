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

  // if clear is true, clear out the contents of the parent.
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
}


// export function cartTotal() {
//   const localStorage = getLocalStorage("so-cart") || [];
//   const cartTotalParent = document.querySelector(".cart-footer.hide");
//   const cartTotalEle = document.querySelector(".cart-total");

//   if (localStorage.length == 0) {
//     cartTotalParent.style.display = "none";
//   } else {

//     // Calculate total price
//     let total = 0;
//     localStorage.forEach((item) => total += Number(item.FinalPrice));
  
//     // Display total in two decimal places
//     if (cartTotalEle) {
//       cartTotalEle.textContent += `$${total.toFixed(2)}`;
//     }
//   }

// }

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p> <span>X</span>`;
  alert.style.display = "flex";
  alert.style.alignItems = "center";
  alert.style.justifyContent = "space-between";


  // remove alert when span is clicked
  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  // setTimeout(() => {
  // }, 3000)
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

