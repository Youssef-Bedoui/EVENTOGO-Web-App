<template>

  <nav v-if="logged  && logged === 'admin'">
    <img
      id="logo"
      src="./img/278719454_518845159791717_4455080078741522629_n.png"
    />
    <div class="navleft">
      <router-link
        to="/"
        style="
          color: orange;
          text-transform: uppercase;
          border-bottom: 3px solid;
        "
        >Dashboard</router-link
      >|
      <router-link to="/add">Add Event</router-link>
    </div>
       <div class="navright">
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/" @click="logOut()">Logout</router-link>
    </div>
  </nav>
<!--  -->
<!--  -->
  <nav v-else-if="logged  && logged === 'user'">
    <img
      id="logo"
      src="./img/278719454_518845159791717_4455080078741522629_n.png"
    />
    <div class="navleft">
      <router-link
        to="/"
        style="
          color: orange;
          text-transform: uppercase;
          border-bottom: 3px solid;
        "
        >Home</router-link
      >|
    </div>
    <div class="navright">
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/" @click="logOut()">Logout</router-link>
    </div>
  </nav>
<!--  -->
<!--  -->
  <nav v-else>
    <img
      id="logo"
      src="./img/278719454_518845159791717_4455080078741522629_n.png"
    />
    <div class="navleft">
      <router-link
        to="/"
        style="
          color: orange;
          text-transform: uppercase;
          border-bottom: 3px solid;
        "
        >Home</router-link
      >|
    </div>

    <div class="navright">
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/signin">Sign in</router-link> |
    </div>
  </nav>

  <div id="app">
    <router-view />
  </div>
</template>


<script>
import axios from "axios";
export default {

  data() {
    return {
      logged: null,
      name: "",
      email: "",
      role: "",
      
    };
  },
  mounted(){


    if(localStorage.getItem('email')){


    this.email= localStorage.getItem("email");
    console.log("emailOfTheLoggedUser", this.email);
    axios
      .get(`http://localhost:3000/api/user/connected/${this.email}`)
      .then((result) => {
        console.log(result.data);


        this.name = result.data[0].name;
        this.email = result.data[0].email;
        this.role = result.data[0].role;

        const profile = {
          name :this.name,
          email :this.email,
          role :this.role,
        }

       const userProfile = JSON.stringify(profile);
       localStorage.setItem("userProfile", userProfile);
       localStorage.setItem("logged", result.data[0].role);
      
       this.logged = localStorage.getItem("logged")
       console.log("our local storage", localStorage.getItem("logged"))
        
      });
    }else{
      this.logged = null;
    }
  },
  methods:{
    logOut(){
      if(localStorage.getItem('logged')){
         localStorage.removeItem('logged');
         localStorage.removeItem('email');
         location.href = '/';
         console.log("our local storage", this.logged)
      }
    },
  },

}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
#logo {
  position: relative;
  left: 45%;
  font-size: 30px;
  float: right;
  height: 60px;
}
nav {
  width: 80%;
  margin: auto;
  background-color: white;
  /* background-image: url(""); */
  background-size: cover;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.navleft {
  position: relative;
  right: 15%;
}
.navright {
  position: relative;
  left: 28%;
}

nav a {
  font-weight: bold;
  font-size: 18px;
  color: black;
  text-decoration: none;
  padding: 15px 10px;
  transition: all 0.3s ease-in-out;
  border-bottom: 3px solid orangered;
}
nav a:hover {
  font-weight: bold;
  color: white;
  border-radius: 5px;
  background-color: rgba(21, 21, 38, 0.797);
}

nav a.router-link-active {
  color: #eb8190;
}
</style>
