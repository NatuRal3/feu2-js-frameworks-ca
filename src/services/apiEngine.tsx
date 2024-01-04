//URL
// https://api.noroff.dev/api/v1/online-shop/

//Source
const apiSource = "https://api.noroff.dev/api/v1/online-shop/"

//VIEW ITEM
const itemPath = "product/"
const apiItemLink = `${apiSource}${itemPath}`


export async function listItems (): Promise<any>{
  const response = await apiEngine(`${apiSource}`,"GET");
  return response;
}

export async function getItem (itemId){
  const response = await apiEngine(
`${apiItemLink}${itemId}`,
"GET"
  )
  return response;
}




export async function apiEngine(URL, method, body = null) {
    const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
    //const token = userInfo().userAccessToken;
  
    if (!allowedMethods.includes(method)) {
      throw new Error("Method not allowed, Use GET, POST, PUT or DELETE");
    }
    const request = {
      method: method,
      headers: {
      //  ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };
  
    return new Promise((resolve, reject) => {
      fetch(URL, request)
        .then((response) => {
          if (response.ok) return response.json();
          else reject({ status: response.status, message: response.statusText });
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }