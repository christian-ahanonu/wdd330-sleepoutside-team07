import { alertMessage, getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    // Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  // store items in local storage
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    
    updateCartCount(); // Update cart icon after adding
  }

  renderProductDetails() {
    document.querySelector(".divider-main").innerHTML = productDetailsTemplate(
      this.product,
    );
  }
}

function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
      <h2>${product.Brand.Name}</h2>
      <h3 class="divider">${product.NameWithoutBrand}</h3>
      
      <img class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      >

      <p class="product-card__price">$${product.FinalPrice} | <span class="discount">10% Off</span> </p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
         <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>

    </section>
  `;
}

// function productDetailsTemplate(product) {
//   document.querySelector("h2").textContent = product.Brand.Name;
//   document.querySelector("h3").textContent = product.NameWithoutBrand;

//   const productImage = document.getElementById("productImage");
//   productImage.src = product.Image;
//   productImage.alt = product.NameWithoutBrand;

//   document.getElementById("productPrice").textContent = product.FinalPrice;
//   document.getElementById("productColor").textContent = product.Colors[0].ColorName;
//   document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

//   document.getElementById("addToCart").dataset.id = product.Id;
// }
