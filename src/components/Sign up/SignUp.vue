<script>
import axios from "axios"
export default {
  data() {
    return {
      user:{},
      
    };
  },
  mounted(){

  },
  methods:{
    post:()=>{
      console.log('khal');
      const person={
        name:"admin",
        role:"admin",
        password:"123",
        email:"admin@mail.com"
        }
      axios.post('http://localhost:3000/api/user/signup',person)
      .then(result=>{
        console.log(result.data)
      })

    }
  }
};
</script>
<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign Up</h3>
            <div class="form-group">
                <h4>Full Name</h4>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <h4>Email address</h4>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <h4>Password</h4>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button class="btn" @click="post" >
          Sign Up
        </button>
            <p class="text-right">
                Already registered 
                <router-link :to="{name: 'signin'}">sign in?</router-link>
            </p>
        </form>
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
