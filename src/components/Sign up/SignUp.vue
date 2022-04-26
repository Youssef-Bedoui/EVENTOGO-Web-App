<script>
import axios from "axios";

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  mounted() {},
  methods: {
    nameInput(event) {
      this.name = event.target.value;
    },
    emailInput(event) {
      this.email = event.target.value;
    },
    passwordInput(event) {
      this.password = event.target.value;
      console.log(this.password);
    },

    post() {
      var person = {};
      person["password"] = this.password;
      person["email"] = this.email;
      person["name"] = this.name;
      person["role"] = "user";
      if (person.password && person.email && person.name) {
        axios
          .post("http://localhost:3000/api/user/signup", person)
          .then((result) => {
            console.log(result.data);
            if (result.data[0] === "yes") {
              location.href = "signin";
            } else {
              alert("user already exist ");
            }
          });
      } else {
        {
          alert("champ empty please fill it with your informations");
        }
      }
    },
  },

};
</script>


<template>

    <div id="container">
    <div id="centeredDiv">
      <h2 id="title">Sign Up</h2>
  
      <div id="element">
        <label>Name :</label>
        <input type="email" name="nameInput" placeholder="name" @change="nameInput($event)" required>
      </div>
      <div id="element">
        <label>Email :</label>
        <input type="email" name="emailInput" placeholder="email" @change="emailInput($event)" required>
      </div>
      <div id="element">
        <label>Password :</label>
        <input type="password" name="passwordInput" placeholder="password" @change="passwordInput($event)" required>
      </div>

      <div>
        <button id="addBtn" @click="post">Send</button>
           <p class="text-right">
                Already registered 
                <router-link :to="{name: 'signin'}" style="color: red">sign in?</router-link>
            </p>
      </div>

    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
#title {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
#container {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 80px;
  background-image: url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700432285.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
#centeredDiv {
  width: 40%;
  padding: 25px 20px;
  background-color: rgb(0, 104, 95);
  color: white;
  border-radius: 50px 0 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

}
#element {
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
#addBtn {
  margin-top: 20px;
  background-color: rgb(81, 80, 80);
  color: white;
  border: 3px solid #e7e7e7;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px white;
  transition: all 0.3s ease 0s;
  font-weight: bold;
  font-size: 20px;
}
#addBtn:hover {
  border: 3px solid #000000;
  box-shadow: 0px 2px 5px white;
  background-color: rgba(1, 149, 53, 0.984);
}
</style>