import { getLocalStorage } from "./utils.mjs";


export default class ShoppingCart {
  constructor(key, cartElement) {
    this.key = key;
    this.cartElement = cartElement;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key); // all items in local storage is retrieved and stored in a variable.
    this.calculateListTotal(list)
    this.renderCartContents(list)
  }

  calculateListTotal(list) {
    if (list) {
      const amounts = list.map((item) => item.FinalPrice);
      this.total = amounts.reduce((sum, item) => sum + item); 
    }
  }

  renderCartContents() {
    // renderWithTemplate(cartItemTemplate, this.cartElement);
    const cartItems = getLocalStorage(this.key) || [];
    if (cartItems.length === 0) {
      const hide = document.querySelector(".cart-footer");
      if (hide) hide.style.display = "none";
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item))

    document.querySelector(this.cartElement).innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").innerText += `$${this.total.toFixed(2)}`;
    
  }
}


function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}">
    </a>

    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
  
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

