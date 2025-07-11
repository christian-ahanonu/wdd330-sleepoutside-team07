const baseURL = import.meta.env.VITE_SERVER_URL;

// Convert JSON and throw error if retrieval fails
async function convertToJson(res) {
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw { name: "serviceError", message: data };
  }
  
}

// Retrieve JSON data 
export default class ExternalServices {
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

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }

} 
