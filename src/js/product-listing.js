import { loadHeaderFooter, getParam, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(() => {
  updateCartCount();
});

const category = getParam("category");
const element = document.querySelector(".product-list");

const dataSource = new ProductData(); // JSON data from API

const productList = new ProductList(category, dataSource, element);

productList.init();
