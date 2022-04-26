<template>

  <div id="container">
    <div class="input">
      <input
        v-model="searchkey"
        type="search"
        id="search"
        placeholder="SEARCH..."
        autocomplete="off"
      />
    </div>
    <div class="UsersList">
      <div class="card-containers" v-for="(elem, i) in this.users" :key="i">
        <h1 id="name">{{ elem.name }}</h1>
        <h2 id="email">{{ elem.email }}</h2>
         <div className="footer">
            <button @click="delet(elem)"  id="btn">Remove</button>
          </div>
        <div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminView",
  mounted: function () {
    console.log("aaaaaaa");
    axios.get("http://localhost:3000/api/user/users").then((result) => {
      console.log(result.data);
      this.users = result.data;
    });

  },
  data: () => {
    return {
      searchkey: "",
      users: [],
    };
  },
  methods: {
     
     delet(event) {
      console.log(event);
      var id = event.id;
      axios
        .delete(`http://localhost:3000/api/user/delete/${id}`)
        .then((result) => {
          console.log(result);
          axios.get("http://localhost:3000/api/user/users").then((result) => {
            console.log(result.data);
            this.users = result.data;
          });
        });
    },
     

  }
};
</script>

<style>
#container {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 100px;
}
.input {
  display: flex;
  justify-content: center;
  align-items: center;
}
.UsersList {
  width: 85vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: 30px;
}
.card-containers {
  display: flex;
  flex-direction: column;
  background-color: #4dd1d1;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  cursor: pointer;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
  text-align: center;
}
.card-containers:hover {
  transform: scale(1.05);
}
.footer {
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  width: 100px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: aquamarine;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
}
#btn {
  background-color: crimson;
}
</style>
