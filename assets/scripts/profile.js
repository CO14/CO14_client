document.addEventListener("DOMContentLoaded", function(event) {
  const hrefLocation = window.location.href;
  const userID = parseQueryString(hrefLocation);
  const PROFILE_URL = BASE_URL + `/api/v1/users/${userID}`;
  const PROFILE_PAGE =`/account/profile.html?id=${userID}`;

  const profileRequest = getRequest(PROFILE_URL);

  fetchRequest(profileRequest, showProfile);

  function showProfile(profile) {
    console.log(profile);
    const source = document.querySelector('#profile-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(profile[0]);
    const getProfile = document.querySelector('.profile');
    const userDiv = document.createElement('div');
    userDiv.innerHTML = html;
    getProfile.appendChild(userDiv);
    profileClickHandlers()
  }

  function profileClickHandlers() {
    const editProfile = document.querySelector('#edit-profile-btn');
    editProfile.addEventListener("click", event => {
      event.preventDefault();
      $('#edit-profile').modal();
    });
    const saveChanges = document.querySelector('#save-profile');
    saveChanges.addEventListener("click", event => {
      updateUserProfile();
    });
    const deleteProfile = document.querySelector('#delete-profile');
    deleteProfile.addEventListener("click", event => {
      deleteUserProfile();
    });
  }

  function getUpdatedProfileData() {
    return {
      id: userID,
      first_name: document.getElementById('update-first-name').value,
      last_name: document.getElementById('update-last-name').value,
      password: document.getElementById('update-password').value,
      image: document.getElementById('update-image').value,
      facebook_url: document.getElementById('update-facebook').value,
      instagram_url: document.getElementById('update-instagram').value,
      twitter_url: document.getElementById('update-twitter').value,
    }
  }

  function updateUserProfile() {
    const updatedProfile = getUpdatedProfileData();
    const request = putRequest(PROFILE_URL, updatedProfile , "omit");
    fetchRequest(request, profileRedirect)
  }

  function deleteUserProfile() {
    const deleteProfileById = {
      id: userID
    }
    console.log(deleteProfileById);
    const request = deleteRequest(PROFILE_URL, deleteProfileById);
    fetchRequest(request, logout);
  }

  function profileRedirect() {
    return window.location = PROFILE_PAGE;
  }
});
