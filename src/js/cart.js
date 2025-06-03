import {
  loadHeaderFooter,
  getLocalStorage,
  updateCartCount,
} from "./utils.mjs";

import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter(() => {
  updateCartCount();
});

const localStorage = getLocalStorage("so-cart") || [];
const cartEle = document.querySelector(".product-list-cart");

const cart = new ShoppingCart(localStorage, cartEle);
cart.initCart();

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart") || []; // all items in local storage is retrieved and stored in a variable.
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item)); //
//   document.querySelector(".product-list-cart").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `
//   <li class="cart-card divider">
//     <a href="#" class="cart-card__image">
//       <img src="${item.Image}" alt="${item.Name}">
//     </a>

//     <a href="#">
//       <h2 class="card__name">${item.Name}</h2>
//     </a>

//     <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//     <p class="cart-card__quantity">qty: 1</p>
//     <p class="cart-card__price">$${item.FinalPrice}</p>
//   </li>`;

//   return newItem;
// }

// renderCartContents();
