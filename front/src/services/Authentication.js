import $api, {API_URL} from "./HTTP";
import {v4 as uuidv4} from "uuid";

class Authentication {
  checkUUID() {
    if (localStorage.getItem("uuid")) {
      return localStorage.getItem("uuid");
    }
    let userUUID = uuidv4();
    localStorage.setItem("uuid", userUUID);
    return userUUID;
  }

  async sendEmail(email, uuid) {
    return await $api.post(
      API_URL + "/api/send-mail/",
      {email: email},
      {headers: {"anonymous-uuid": uuid}}
    );
  }

  async sendCode(code, uuid) {
    return await $api.post(
      API_URL + "/api/registration/",
      {code: code},
      {headers: {"anonymous-uuid": uuid}}
    );
  }
}

const Auth = new Authentication();
export default Auth;
