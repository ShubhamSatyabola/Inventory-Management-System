// A mock function to mimic making an async request for data
export function generateQr(productData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/component/create", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: { "content-type": "application/json" },
      });

      const data = await response.json();
      resolve({ data });
      
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/component/fetch");

      const data = await response.json();
      console.log(data);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function scanQr(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/component/dispatch/" + productData.id, {
      method: "PATCH",
      body: JSON.stringify(productData),
      headers: { "content-type": "application/json" },
    });
    // console.log(response);
    const data = await response.json();

    resolve({ data });
  });
}

export function deleteProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:5000/component/delete/" + id,
      { method: "DELETE", headers: { "content-type": "application/json" } }
    );
    // console.log(response);
    const data = await response.json();

    resolve({ data });
  });
}




