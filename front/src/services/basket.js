import { GetAnonymous } from "./anonymous";
import { GetToken } from './token'

export async function LoadBasket() {
  let url = "/api/v1/basket"
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "anonymous-uuid": GetAnonymous(),
      "Authorization": GetToken(), 
    }
  });

  return response.json();
}
  
export async function AddToCart(id) {
    let url = "/api/v1/basket?dish_id=" + id
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anonymous-uuid": GetAnonymous(),
        "Authorization": GetToken()
      },
    });
      
    return response.json();
}

export async function RemoveFromCart(id) {
  let url = "/api/v1/basket?dish_id=" + id

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "anonymous-uuid": GetAnonymous(),
      "Authorization": GetToken()
    },
  });

  return response.json();
}