// import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  // login(email: string, password: string) {
  //   return axios
  //     .post(API_URL + "signin", {
  //       email,
  //       password
  //     })
  //     .then(response => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem("cryptoUser", JSON.stringify(response.data));
  //       }

  //       return response.data;
  //     });
  // }

  login() {
      localStorage.setItem("cryptoUser", JSON.stringify({username:'test', email:'test@gmail.com'}));
    }

  logout() {
    localStorage.removeItem("cryptoUser");
  }

  register(username, email, password) {
    // return axios.post(API_URL + "signup", {
    //   username,
    //   email,
    //   password
    // });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("cryptoUser");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
