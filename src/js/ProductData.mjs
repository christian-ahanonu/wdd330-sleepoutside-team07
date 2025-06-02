const baseURL = import.meta.env.VITE_SERVER_URL;

// Convert JSON and throw error if retrieval fails
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// Retrieve JSON data 
export default class ProductData {
  // constructor(category) {
  //   this.category = category;
  //   this.path = `../json/${this.category}.json`;
  // }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response)
    return data.Result;
  }
  
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response)
    // console.log(data.Result)
    return data.Result;
  }
} 
