//Source
const apiSource = "https://api.noroff.dev/api/v1/online-shop/"




//VIEW ITEM
const apiItemLink = `${apiSource}`

// LI
export async function listItems (): Promise<any>{
  const response = await apiEngine(`${apiSource}`,"GET");
  return response;
}

export async function getItem (itemId:string){
  const response = await apiEngine(
`${apiItemLink}${itemId}`,
"GET"
  )
  return response;
}


export async function apiEngine(URL:string, method:string, body:any = null): Promise<any> {
    const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
 
  
    if (!allowedMethods.includes(method)) {
      throw new Error("Method not allowed, Use GET, POST, PUT or DELETE");
    }
    const request = {
      method: method,
      headers: {
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