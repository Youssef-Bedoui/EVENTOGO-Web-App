<template>
  <div class="wrapper">
    <!-- alert  -->
    <Alert :visible="alert" :message="alertText" :close="closeAlert" />

    <div class="centeredDiv">
      <h2 class="title">Welcome to EvenToGo</h2>

      <div class="element">
        <label>Name*</label>
        <input type="email" name="nameInput" placeholder="name" @change="nameInput($event)" required>
      </div>
      <div class="element">
        <label>Email*</label>
        <input type="email" name="emailInput" placeholder="email" @change="emailInput($event)" required>
      </div>
      <div class="element">
        <label>Password*</label>
        <input type="password" minlength="6" name="passwordInput" placeholder="password" @change="passwordInput($event)"
          required>
      </div>

      <div class="element">
        <label>Country*</label>
        <select v-model="selectedCountry">
          <option class="select_placeholder" disabled selected>Please select a country</option>
          <option v-for="country in countryList" v-bind:key="country">{{ country }}
            <svg v-if="selectedCountry === country" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              fill="currentColor" class="bi bi-globe-americas float-end me-3" viewBox="0 0 16 16">
              <path
                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
            </svg>
          </option>
        </select>
      </div>
      <div>
        <button class="registerBtn" @click="register">Register</button>
        <p class="">
          Already registered ?
          <router-link :to="{ name: 'signin' }" class="text-light ml-2 text-uppercase">Sign in</router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import countryList from '../../store/countryList';
import Alert from "../Alert/alertPopUp.vue";
import { v4 as uuidv4 } from 'uuid';

export default {
  components: { Alert },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      selectedCountry: null,
      countryList: countryList.country,
      alert: false,
      alertText: null,
    };
  },
  methods: {
    nameInput(event) {
      this.name = event.target.value;
    },
    emailInput(event) {
      this.email = event.target.value;
    },
    passwordInput(event) {
      this.password = event.target.value;
    },
    register() {
      if (!this.name || !this.email || !this.password || !this.selectedCountry) {
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
      // generate user token 
      const userToken = uuidv4();
      //save data in database
      axios.post("http://localhost:3000/api/user/signup", {
        name: this.name,
        email: this.email,
        password: this.password,
        country: this.selectedCountry,
        activationToken: userToken,
      })
        .then(response => {
          console.log(response);

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          this.isError = false;

          if (emailRegex.test(this.email)) {
            if (response.data === "user already exist") {
              this.alert = true;
              this.alertText = "User already exist";
              return;
            }
            // send verifucation email 
            axios.post(`http://localhost:3000/api/sendEmail/verifEmail`, {
              receiver: this.email,
              emailMessage:
                `<div style={{"padding:5px"}}>
                <img style={{"width:60%;height:150px;object-fit:contain";background:#fff"}} src="https://res.cloudinary.com/diyuy6jxe/image/upload/v1682528239/278719454_518845159791717_4455080078741522629_n_oxzucs.png")/>
                Dear ${this.name},

<p>Thank you for signing up on EVENTOGO website ! To ensure that you receive important notifications and to protect your account security, we need to verify your email address.

Please click the following link to verify your email address:

<h2 style={{"text-decoration: underline"}}>${`http://localhost:8080/verifEmail/${this.email}/${userToken}`}</h2>

If you didn't sign up for our service or believe this email was sent to you in error, please disregard this message.

Thank you for your cooperation!
<br/>
Best regards,</p>

<h4 style={{"font-weight:bold"}}>EVENTOGO TEAM</h4>
</div>`,
            })
              .then((result) => {
                console.log(result);
                if (result.data.msg === "Email sent") {
                  this.alert = true;
                  this.alertText = "An Email has been sent to you to activate your account !";
                  setTimeout(() => {
                    location.href = "/signin";
                  }, 4000);
                } else {
                  this.alert = true;
                  this.alertText = "Unexpected Error, please retry later!";
                }
              })
              .catch((err) => {
                console.log(err);
                this.alert = true;
                this.alertText = "Unexpected Error, please retry later!";
              })
          } else {
            this.alert = true;
            this.alertText = 'Invalid email address';
          }
        })
        .catch(error => {
          console.log(error);
          this.alert = true;
          this.alertText = "Unexpected Error, please retry later!";
        });
    },
    closeAlert() {
      this.alert = false;
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
  background-image: url("../../img/lovepik-stage-lighting-effect-diagram-picture_500092854.jpg");
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.centeredDiv {
  width: 40%;
  padding: 25px 20px;
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
}

input:focus {
  background-color: #e7e7e7;
}

select {
  padding: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  color: #000000;
}

input,
select {
  border: 2px solid #5A4AE4;
  border-radius: 10px !important;
}

.select_placeholder {
  font-weight: bold !important;
}

#types {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

select {
  border-radius: 5px;
}

select option {
  background-color: rgb(226, 223, 210);
}

.registerBtn {
  margin: 5px auto;
  width: 100%;
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

.registerBtn:hover {
  background-color: #a58503ce;
}

.alert-modal {
  position: fixed;
  z-index: 111;
  padding-top: 100px;
  left: 0;
  top: "40%";
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.384);
}

.alert-modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .centeredDiv {
    width: 100%;
  }
}
</style>