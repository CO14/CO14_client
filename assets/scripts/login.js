document.addEventListener("DOMContentLoaded", function(event) {
  redirectIfLoggedIn();
  const LOGIN_URL = BASE_URL + `/auth/login`;

  function getUserLoginInfo() {
    return {
      email: document.getElementById('login-email').value.toLowerCase(),
      password: document.getElementById('login-password').value
    }
  }

  function submitLoginForm() {
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', event => {
      event.preventDefault();
      const userInfo = getUserLoginInfo();
      console.log(userInfo);
      if (validPassword(userInfo.password) === true && validEmailAddress(userInfo.email) === true) {
        const request = postRequest(LOGIN_URL, userInfo, "include");
        fetchRequest(request, setJWTLogin)
      } else {
        alert("Invalid Email and/or Password")
      }
    });
  }

  function setJWTLogin(response) {
    localStorage.token = response.token;
    localStorage.account_id = response.id;
    setIdRedirect(response);
  }

  submitLoginForm();

});
