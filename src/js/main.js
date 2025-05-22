import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents"); // JSON data
const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);

productList.init();
