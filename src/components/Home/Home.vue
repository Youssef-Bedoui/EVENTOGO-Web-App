<template>
  <div>
    <div class="card" v-for="(elem, i) in this.events" :key="i">
      <h1>title: {{ elem.title }}</h1>
      <h1>date: {{ elem.date }}</h1>
      <h1>description: {{ elem.description }}</h1>
      <img :src="elem.image" />
      <h1>{{ elem.type }}</h1>

      <button v-on:click="postFavorite">favorite</button>
      <button :value="elem.id" @click="edit($event)" >edit</button>
      <button>delete</button>
    </div>

    <h1>Home Page</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  props: {},
  mounted: function () {
    axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
      this.events = result.data;
      // console.log(this.events);
    });
  },
  methods: {
    myMethod(a) {
      console.log(a);
    },
    postFavorite() {
      console.log("slim");
    },
    edit(event){
    //  console.log(event.target.value);
      console.log("our event", event);
      localStorage.setItem("id", event.target.value)
      location.href = "/modif"
    }
  },
  //  this data for testing the map
  data() {
    return {
      events: ["j", "k", "k"],
    };
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: #f5f5f5;
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
img {
  width: 300px;
}
</style>
