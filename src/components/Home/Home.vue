<template>
  <div id="home">
    <div class="wrapper">
      <img
        class="search-icon"
        src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
      />
      <input
        class="search"
        placeholder="Search"
        type="text"
        @change="inputData($event)"
        @keypress.enter="handleSearch(this.searchInput)"
      />
    </div>
    <div id="container">
      <div class="card" v-for="(elem, i) in this.events" :key="i">
        <h2 id="title">{{ elem.title }}</h2>
        <div id="image">
          <img id="img" :src="elem.image" />
        </div>
        <div id="text-right">
          <p id="date">Date: {{ elem.date }}</p>
          <p id="category">{{ elem.type }} Event</p>
          <p id="description">About Event: {{ elem.description }}</p>
        </div>

        <div id="buttons">
          <!-- <button id="favoriteBtn" v-on:click="postFavorite">Favorite</button> -->
          <button v-if="logged && logged=='admin'" id="editBtn" :value="elem.id" @click="edit($event)">
            Edit
          </button>
          <button v-if="logged" id="deleteBtn">Delete</button>
        </div>
      </div>
    </div>
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
      this.logged = localStorage.getItem("logged")
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
    edit(event) {
      console.log(event.target.value);
      localStorage.setItem("id", event.target.value);
      location.href = "/modif";
    },
    inputData(event) {
      this.searchInput = event.target.value;
      console.log(this.searchInput);
    },
    filterFunction(val) {
      // this.events.filter((event) => {
      //   event.type === this.searchInput;
      // });
      console.log(val, "filter");
    },
    handleSearch() {
      this.filterFunction();
      // location.href=("/");
      console.log(this.searchInput, "clicked");
    },
  },
  //  this data for testing the map
  data() {
    return {
      searchInput: "",
      events: null,
      logged: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
  background-repeat: no-repeat;
  background-size: cover;
  /* width: 100%; */
  background-color: #eba2a3;
  height: 1200px;
  /* overflow-y: scroll; */
  /* display: flex;
  justify-content: space-between;
  flex-direction: row; */
  margin-top: 80px !important;
}
.wrapper {
  display: flex;
  justify-content: right;
  min-width: 100px;
}
.search {
  position: relative;
  border: 1px solid grey;
  border-radius: 5px;
  height: 30px;
  width: 40%;
  display: block;
  float: right;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
  font-size: 18px;
}
.search-icon {
  position: relative;
  width: 17px;
  left: 25px;
  z-index: 1;
}
.search:hover,
.search:focus {
  border: 1.5px solid #009688;
  background-color: white;
}
#container {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
.card {
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.072),
    0 22.3px 17.9px rgba(0, 0, 0, 0.145), 0 41.8px 33.4px rgba(0, 0, 0, 0.122),
    0 100px 80px rgba(0, 0, 0, 0.12);

  min-height: 200px;
  width: 50vw;
  margin: 100px auto;
  background: white;
  border-radius: 5px;
  background-color: white;
  width: 40%;
  height: 300px;
  border: 1px solid black;
  margin: 30px 0;
  position: relative;
}

#image {
  width: 40%;
  height: 60%;
  display: block;
  float: left;
}


#img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
  margin-left: 20px;
  display: block;
}
#text-right {
  width: 50%;
  display: block;
  float: right;
  position: relative;
  bottom: 30px;
}
#title {
  text-transform: capitalize;
  text-align: center;
  width: 100%;
  background-color: #eb8190;
  color: black;
  bottom: 20px;
  padding: 5px 0;
  position: relative;
  bottom: 20px;
}
#date {
  text-decoration: underline;
  font-weight: bold;
  font-size: 15px;
}
#description {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  overflow-y: scroll;
}
#category {
  color: white;
  font-weight: bold;
  background-color: red;
  padding: 10px;
  width: 70%;
  animation: category 1s infinite;
  border-radius: 10px;
}
@keyframes category {
  0% {
    background-color: rgb(233, 64, 208);
  }
  50% {
    background-color: rgb(61, 61, 225);
  }
  100% {
    background-color: rgb(233, 64, 208);
  }
}
#buttons {
  width: 200px;
  position: relative;
  bottom: 20px;
  left: 50%;
}
button {
  padding: 10px 15px;
  border-radius: 10px;
  margin: 5px;
}
#editBtn {
  background-color: #fef5ee;
  color: #b94e58;
  font-weight: bold;
  font-size: 17px;
  padding: 10px 25px;
}
#editBtn:hover {
  color: #fef5ee;
  background-color: #b94e58;
}
#deleteBtn {
  background-color: #b94e58;
  color: white;
  font-weight: bold;
  font-size: 17px;
}
#deleteBtn:hover {
  color: #b94e58;
  background-color: white;
}
</style>
