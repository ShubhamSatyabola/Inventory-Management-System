// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      //  console.log(response);
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } 
    } catch (error) {
      reject(error);
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        resolve({ data });
      } else {
        const error = await response.text();
        console.log(error);
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}



export function logoutUser(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
