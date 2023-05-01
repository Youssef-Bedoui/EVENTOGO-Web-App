<template>
  <div id="container">
    <div class="account-header">
      <h3 class="d-flex align-items-center my-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person mr-2"
          viewBox="0 0 16 16">
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>
        Account Information
      </h3>
    </div>
    <hr />
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-7 col-md-7 col-10 border p-4 mx-2 info-container">
          <div class="info-item">
            <h6>UserName</h6>
            <h6>{{ this.user.name }}</h6>
          </div>
          <div class="info-item">
            <h6>Email address</h6>
            <h6>{{ this.user.email }}</h6>
          </div>
          <div class="info-item">
            <h6>Password</h6>
            <input disabled type="password" value={{this.user.password}} />
          </div>
          <button class="editBtn" @click="openEdit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
            Edit profile</button>
        </div>

        <div
          class="info-container col-lg-3 col-md-3 col-10 mx-2 border d-flex flex-column justify-content-around align-items-start">
          <div class="info-item">
            <h6>Country</h6>
            <h6>{{ this.user.country }}</h6>
          </div>
          <div class="info-item">
            <h6>City/town</h6>
            <h6>{{ this.user.city }}</h6>
          </div>
          <button @click="openCountryEdit" class="editBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
            Edit </button>
        </div>
      </div>
    </div>
    <!-- profile edit modal  -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <form>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="this.editedUsername">
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="this.editedEmail">
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="this.editedPassword">
          </div>
          <div class="modal-buttons">
            <button type="button" class="cancel-button" @click="cancel">Cancel</button>
            <button type="button" class="save-button" @click="save">Save</button>
          </div>
        </form>
      </div>
    </div>
    <!-- country edit modal  -->
    <div v-if="isCountryEditing" class="modal">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <form>
          <div>
            <label for="country">Country:</label>
            <input type="text" id="country" v-model="this.editedCountry">
          </div>
          <div>
            <label for="city">City/town:</label>
            <input type="city" id="city" v-model="this.editedCity">
          </div>
          <div class="modal-buttons">
            <button type="button" class="cancel-button" @click="cancel">Cancel</button>
            <button type="button" class="save-button" @click="saveCountry">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  name: "ProfileView",
  mounted: function () {
    window.scrollTo(0, 0);
  },

  data() {
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    const user = storedUser && Array.isArray(storedUser) && storedUser.length > 0 ? storedUser[0] : null;
    return {
      user: user,
      userID: user.id,
      isEditing: false,
      isCountryEditing: false,
      editedUsername: user ? user.name : '',
      editedEmail: user ? user.email : '',
      editedPassword: '',
      editedCountry: user ? user.country : '',
      editedCity: user ? user.city : '',
    };
  },

  methods: {
    openEdit() {
      this.isEditing = true;
    },
    openCountryEdit() {
      this.isCountryEditing = true;
    },
    cancel() {
      this.isEditing = false;
      this.isCountryEditing = false;
    },
    save() {
      const updatedUser = { ...this.user };
      updatedUser.name = this.editedUsername || updatedUser.name;
      updatedUser.email = this.editedEmail || updatedUser.email;
      updatedUser.password = this.editedPassword || updatedUser.password;
      console.log(updatedUser)
      axios.patch(`http://localhost:3000/api/user/update/${this.userID}`, updatedUser)
        .then(() => {
          localStorage.setItem("user", JSON.stringify([updatedUser]));
          this.user = updatedUser;
          this.isEditing = false;
        }).catch((err) => {
          console.log(err)
        })
    },
    saveCountry() {
      const updatedUser = { ...this.user };
      updatedUser.country = this.editedCountry || updatedUser.country;
      updatedUser.city = this.editedCity || updatedUser.city;
      axios.patch(`http://localhost:3000/api/user/update/${this.userID}`, updatedUser)
        .then(() => {
          localStorage.setItem("user", JSON.stringify([updatedUser]));
          this.user = updatedUser;
          this.isCountryEditing = false;
        }).catch((err) => {
          console.log(err)
        })
    },

  }

};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#container {
  width: 100%;
  height: calc(100vh - 75px);
  padding: 10px;
  background: white;
}

.account-header {
  height: 50px;
}

.info-container {
  position: relative;
}

.info-item {
  margin: 20px 0;
}

.info-item h6:first-child {
  color: #c4a115;
  font-weight: bold;
  margin-bottom: 0;
  letter-spacing: 1px;
}

.info-item>input {
  border: none;
}

.account-header>h3 {
  border: 2px solid lightgray;
  width: fit-content;
  padding: 5px 10px;
  margin-left: 5%;
  font-size: 25px;
}

.editBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: #c4a115;
  border: none;
  letter-spacing: 1px;
  transition: .2s ease;
  display: flex;
  align-items: center;
}

.editBtn:hover {
  cursor: pointer;
  transform: scale(1.02);
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 100%;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content label {
  margin-bottom: 5px;
  font-weight: bold;
}

.modal-content form input {
  width: 70%;
  float: right;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.cancel-button {
  margin-right: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.save-button {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
