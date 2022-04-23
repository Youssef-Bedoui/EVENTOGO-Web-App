<script>
import axios from "axios"
export default {
  data() {
    return {
      name:"",
      email:"",
      password:""
      
    };
  },
  mounted(){

  },
  methods:{
     nameInput(event) {
      this.name= event.target.value;
    },
     emailInput(event) {
      this.email= event.target.value;
    },
     passwordInput(event) {
      this.password= event.target.value;
      console.log(this.password);
    },
    post(){
      var person={}
        person["password"]=this.password
        person["email"]=this.email
        person["name"]=this.name
        person["role"]="user"
      
      axios.post('http://localhost:3000/api/user/signup',
      person
      )
      .then(result=>{
        console.log(result.data);
if(result.data[0]==='yes'){location.href = 'signin'}
else {alert("user already exist")}
      })
    }
  }
};
</script>
<template>
    <div class="vue-tempalte">
        <div class="form">
            <h3>Sign Up</h3>
            <div class="form-group">
                <h4>Full Name</h4>
                <input type="text" name="nameInput" @change="nameInput($event)"/>
            </div>
            <div class="form-group">
                <h4>Email address</h4>
                <input type="email" name="emailInput" @change="emailInput($event)" required>
            </div>
            <div class="form-group">
                <h4>Password</h4>
                <input type="password" name="passwordInput" @change="passwordInput($event)" required>
            </div>
            <button class="btn" @click="post()" >
                
          Sign Up
        </button>
            <p class="text-right">
                Already registered 
                <router-link :to="{name: 'signin'}">sign in?</router-link>
            </p>
        </div>
    </div>
</template>
<style>
.vue-tempalte {
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 300px;
  height: 300px;
  position: relative;
  left: 37%;
}

input {
  height: 40px;
  width: 150px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 10px;
  
}
.h4{
    margin-right: 30px;
    
}
h6{
    margin-bottom: 20px;
}
h3{
    text-align: center;
}
.form-group {
  display: flex;
  flex-direction: row;
}

.btn {
  height: 40px;
  width: 150px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 10px;
  background-color: rgba(2, 107, 245, 0.733);
  color: #f5f5f5;
}
</style>
