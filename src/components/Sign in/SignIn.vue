<template>
  <div class="wrapper">
    <!-- alert modal  -->
    <Alert :visible="alert" :message="this.alertText" :close="closeAlert" />

    <div class="centeredDiv">
      <h2 class="title">Hi, Welcome back !</h2>
      <div class="element">
        <label>Email</label>
        <input type="email" name="emailInput" placeholder="email" @change="emailInput($event)" required />
      </div>
      <div class="element">
        <label>Password</label>
        <input type="password" name="passwordInput" placeholder="password" @change="passwordInput($event)" required />
      </div>
      <button class="loginBtn" @click="login">Login</button>
      <a href="/resetPassword" class="forget">Forget Password ?</a>
      <p>You don't have account ? <span class="register_btn" @click="navigateToRegister">Register Now!</span></p>
    </div>
  </div>
</template>
<script>

import axios from "axios";
import Alert from "../Alert/alertPopUp.vue";

export default {
  components: { Alert },
  data() {
    return {
      email: null,
      password: null,
      alert: false,
      alertText: null,
    };
  },

  methods: {
    emailInput(event) {
      this.email = event.target.value;
    },
    passwordInput(event) {
      this.password = event.target.value;
    },
    login() {
      if (!this.email || !this.password) {
        this.alert = true;
        this.alertText = 'Please fill in all required fields.';
        return;
      }

      if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.alert = true;
        this.alertText = 'Please enter a valid email address.';
        return;
      }

      if (this.password.length < 6) {
        this.alert = true;
        this.alertText = 'Password must be at least 6 characters long.';
        return;
      }
      axios.post("http://localhost:3000/api/user/signin", { email: this.email, password: this.password })
        .then((result) => {
          console.log(result.data)
          if (result.data === "Wrong Email or Password !") {
            this.alert = true;
            this.alertText = result.data;
          }
          if (result.data.msg == "This user is Banned !") {
            this.alert = true;
            this.alertText = result.data.msg;
          }
          if (result.data[0] == "yes") {
            localStorage.setItem("user", JSON.stringify(result.data[1]));
            location.href = "/";
          }
        })
        .catch((error) => {
          this.alert = true;
          this.alertText = JSON.stringify(error.response.data);
        });
    },
    // showAlert(text) {
    //   this.alertText = text;
    //   this.alert = true;
    // },
    closeAlert() {
      this.alert = false;
    },
    navigateToRegister() {
      location.href = '/signUp';
    }
  },
};
</script>



<style scoped>
* {
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
  height: calc(100vh - 80px);
  padding: 10px;
  background-image: url("../../img/realistic-neon-lights-circle-shape-background_52683-59461.avif");
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.centeredDiv {
  width: 40%;
  padding: 50px 20px;
  background-color: transparent;
  color: white;
  border-radius: 50px 0 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  backdrop-filter: blur(5px);
}

.title {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
}

.element {
  padding: 5px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 80%;
}

label {
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border: 2px solid #5A4AE4;
  border-radius: 10px !important;
}

input:focus {
  background-color: #e7e7e7;
}

.loginBtn {
  margin: 20px auto;
  width: 80%;
  text-align: center;
  background-color: #a58503;
  color: white;
  border: none;
  padding: 5px 0px;
  border-radius: 20px;
  transition: 0.2s ease;
  font-size: 20px;
  cursor: pointer;
  text-transform: uppercase;
}

.loginBtn:hover {
  background-color: #a58503ce;
  ;
}


.register_btn {
  text-decoration: underline;
  cursor: pointer;
  font-size: larger;
}

.forget {
  color: #e4944a;
  cursor: pointer;
}

.forget:hover {
  text-decoration: underline;
}

@media (max-width: 780px) {
  .centeredDiv {
    width: 100%;
  }
}
</style>
