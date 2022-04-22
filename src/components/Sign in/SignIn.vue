<script>
import axios from "axios"
export default {
  data() {
    return {
    email:"",
    password:""
    };
  },
  mounted(){

  },
  methods:{
     emailInput(event) {
      this.email= event.target.value; 
      console.log(this.email);
    },
     passwordInput(event) {
      this.password= event.target.value; 
      
      console.log(this.password)
    },
    post(){
      console.log(this.email);
      var person={}
        person["password"]=this.password
        person["email"]=this.email
    
      axios.post('http://localhost:3000/api/user/signin',person)
      .then(result=>{
        console.log(result.data)
        if(result.data[0]==='succesfully connected'){location.href = '/'}
      })

    }
  }
};
</script>
<template>
  <div class="signin">
    <div class="form">
      <h3>Sign In</h3>
      <form method="post">
      <div class="form-group">
        <div class="h4">
          <h4>Email </h4>
          <h4>Password</h4>
        </div>
        <div class="input">
          <input type="email" name="emailInput" placeholder="email" @change="emailInput($event)" required>
          <input type="password" name="passwordInput" placeholder="password" @change="passwordInput($event)" required>
        </div>
      </div>

      
        <button class="btn" @click="post" >
          Sign In
        </button>
      
      </form>
    </div>
  </div>
</template>
<style>
.signin {
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
