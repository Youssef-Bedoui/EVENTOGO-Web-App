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
      axios.post('http://localhost:3000/api/user/signin',{password:"123",email:"'admin@mail.com'"})
      .then(result=>{
        console.log(result.data)
      })

    }
  }
};
</script>
<template>
  <div class="signin">
    <div class="form">
      <h3>Sign In</h3>
      <div class="form-group">
        <div class="h4">
          <h4>Email </h4>
          <h4>Password</h4>
        </div>
        <div class="input">
          <input type="email"  />
          <input type="password"  />
        </div>
      </div>

      <div class="btn" >
        <button class="btn" @click="post()" >
          Sign In
        </button>
      </div>
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
