// generate a list of product cards in HTML from an array.
import { renderListWithTemplate } from "./utils.mjs"; 

function productCardTemplate(product) {
    // const pCategory = document.querySelector(".breadcrumbs")
    // pCategory.innerHTML += `${product.Id}`

    return `
        <li class="product-card">
            <a href="../product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">

                <h3 class="card__brand">${product.Brand.Name}</h3>
                <p class="card__name">${product.NameWithoutBrand}</p>
                <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>
    `;
}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category
        this.dataSource = dataSource
        this.listElement = listElement
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list); // list is the json file

        document.querySelector("#product-category").textContent =
            this.category.charAt(0).toUpperCase() + this.category.slice(1);
        
        document.querySelector(".pCategory").textContent =
            `[${this.category.charAt(0).toUpperCase()}${this.category.slice(1)}]`;
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""))

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}