import { SetToken } from "./token"

export async function SendAnketa() {
    let data = { 
        "gender": "М", 
        "age": "30", 
        "weight": "70", 
        "des_weight":"80", 
        "height": "180", 
        "activity": "1" 
    };

    let url = "/api/anon-info/"

    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anonymous-uuid": GetAnonymous()
        },
        body: JSON.stringify(data),
      });
      return response.json();
}

export async function RequestCodeEmail(email) {
  let data = { "email": email };
  let url = "/api/send-mail/"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anonymous-uuid": GetAnonymous()
    },
    body: JSON.stringify(data),
  });
  
  return response.json();
}

export async function FetchToken(code) {
  let data = { "code": code };

  let url = "/api/registration/"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anonymous-uuid": GetAnonymous()
    },
    body: JSON.stringify(data),
  });

  
  
  return response.json();
}

export async function GetToken(code) {  
  return await FetchToken(code).then((response) => {
    console.log("response is", response.token)
    if (response.token) {
      SetToken(response.token);
      console.log(response.token)
      return response.token
    }
  })
}