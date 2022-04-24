<template>
  <div id="container">
    <div id="centeredDiv">
      <h2 id="title">Profile</h2>


      <div id="element">
        <h2>Name : {{this.user.name}}</h2>
      </div>
      <div id="element">
        <h2>Email : {{this.user.email}}</h2>
      </div>
      <div id="element">
        <h2>Role : {{this.user.role}}</h2>
      </div>
      <!--  -->
      <!--  -->
 

    </div>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: "ProfileView",
  mounted: function () {
    // this.email= localStorage.getItem("email");
    // console.log("emailOfTheLoggedUser", this.email);
    // axios
    //   .get(`http://localhost:3000/api/user/connected/${this.email}`)
    //   .then((result) => {
    //     console.log(result.data);
    //     this.name = result.data[0].name;
    //     this.email = result.data[0].email;
    //     this.role = result.data[0].role;
    //    localStorage.setItem("logged", result.data[0].role);
      
    //    console.log("our local storage", localStorage.getItem("logged"))
        
    //   });
  },
  data() {
    return {

      user : JSON.parse(window.localStorage.getItem("userProfile")),
      // id: "",
      // name: "",
      // email: "",
      // role: "",
    };
  },
  methods: {
    getUser(){
      console.log("jaaabha", this.email);
    }
  },
};
</script>

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
#modifBtn {
  margin-top: 20px;
  background-color: rgb(67, 83, 88);
  color: white;
  border: 3px solid #e7e7e7;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px white;
  transition: all 0.3s ease 0s;
  font-weight: bold;
  font-size: 20px;
}
#modifBtn:hover {
  border: 3px solid #000000;
  box-shadow: 0px 2px 5px white;
  background-color: rgba(1, 149, 53, 0.984);
}
</style>
