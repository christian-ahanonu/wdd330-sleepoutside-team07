import { loadHeaderFooter, getParam, updateCartCount } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(() => {
  updateCartCount();
});

const category = getParam("category");
const element = document.querySelector(".product-list");

const dataSource = new ExternalServices(); // JSON data from API

const productList = new ProductList(category, dataSource, element);

productList.init();
