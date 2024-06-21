import $api, {API_URL} from "./HTTP";

class PersonalAccount {
  async getUser() {
    return await $api.get(
      API_URL + "/api/get-user/",
      {headers: {authorization: localStorage.getItem("token")}}
    );
  }

  async updateUser(data) {
    return await $api.put(
      API_URL + "/api/get-user/",
      data,
      {
        headers: {authorization: localStorage.getItem("token")},
      }
    );
  }

  async setUserForm(data) {
    return await $api.post(
      API_URL + "/api/info/",
      data,
      {
        headers: {authorization: localStorage.getItem("token")},
      }
    );
  }

  async updateUserFrom(data) {
    return await $api.put(
      API_URL + "/api/info/",
      data,
      {
        headers: {authorization: localStorage.getItem("token")},
      }
    );
  }
}

const AccountApi = new PersonalAccount();
export default AccountApi;
