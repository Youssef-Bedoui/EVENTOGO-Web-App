<template>
  <div id="home">
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="http://www.tourismsaskatchewan.com/-/media/things-to-do/events/sasktel-centre-concert-events.ashx"
            class="d-block w-100"
            alt=""
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://i.pinimg.com/originals/82/de/58/82de585c4523567d9797322d6fe3981d.jpg"
            class="d-block w-100"
            alt=""
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://circulareconomy.europa.eu/sites/all/themes/cecon_theme/images/events.jpg"
            class="d-block w-100"
            alt=""
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://www.durstonefarm.co.uk/wp-content/uploads/sites/21/2017/11/a1-2.jpg"
            class="d-block w-100"
            alt=""
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://res.infoq.com/articles/navigating-cultural-differences/en/headerimage/navigating-cultural-differences-1566840346418.jpg"
            class="d-block w-100"
            alt=""
          />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <!-- navbar search -->
    <nav class="navbar navbar-light bg-dark">
      <form class="container-fluid justify-content-center">
        <p id="secondary-nav-text">SELECT BY TYPE :</p>
        <button
          class="btn btn-outline-secondary"
          @click="handleType($event,'Cultural')"
        >
          Cultural
        </button>
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="handleType($event,'Entertainment')"
        >
          Entertainment
        </button>
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="handleType($event,'Social')"
        >
          Social
        </button>
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="handleType($event,'Religious')"
        >
          Religious
        </button>
      </form>
    </nav>
    <!-- card -->
    <div id="container">


      <div class="card bg-dark text-white" v-for="(elem, i) in this.events"
        :key="i">
        <img v-bind:src="elem.image" class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-favorite" 
          v-if="this.user.id"
          :value="elem.id"
          @click="postFavorite($event)" > <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg></h5>
          <h5 class="card-title" id="title">*{{ elem.title }}*</h5>
          <p class="card-category" id="category"> {{ elem.type }}</p>
          <p class="card-date" id="date">{{ elem.date }}</p>
          <p class="card-description"> {{ elem.description }}</p>
          <button
            href="#"
            class="btn btn-primary"
            v-if="this.user.role== 'admin'"
            :value="elem.id"
            @click="edit($event)"
          >
            Edit
          </button>
          <button
            href="#"
            class="btn btn-danger"
            v-if="this.user.role== 'admin'"
            :value="elem.id"
            @click="delet($event)"

          >
            Delete
          
        </button>
      </div>
      </div>
    </div>
  </div>

  <div id="footer">
    <h4>&copy; EVENTOGO TUNISIA , All rights Reserved 2022-2023</h4>
    <p>Thank you for visiting our website</p>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  props: {},
  mounted: function () {
    var use = JSON.parse(localStorage.getItem("user"));
    if (use) {
      this.user = use[0];
      // console.log(this.user);
    }
    axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
      this.events = result.data;
      // console.log(this.events);
    });
  },
  methods: {
    myMethod(a) {
      console.log(a);
    },
    postFavorite(event) {
      console.log('slim');
      console.log(event.target.value);
      const fav={
        id_event:event.target.value,
        id_user:this.user.id
      }
      axios.post(`http://localhost:3000/api/favorite/addfav/`,fav)
      .then(res=>console.log(res))
    },
    edit(event) {
      console.log(event.target.value);
      localStorage.setItem("id", event.target.value);
      location.href = "/modif";
    },
    delet(event) {
      console.log(event.target.value);
      var id = event.target.value;
      axios
        .delete(`http://localhost:3000/api/event/delete/${id}`)
        .then((result) => {
          console.log(result);
          this.events.splice(id - 1, 1);
          localStorage.setItem("id", event.target.value);
          location.href = "/";
        });
    },

    // handle search
    handleType(event,value) {
      event.preventDefault()
      axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
        this.events =  result.data.filter((event) => {
         return event.type == value;
        });
          console.log(this.events)
      });
    },
  
  },
  //  this data for testing the map
  data() {
    return {
      events: null,
      user: {},
    };
  },
};
</script>

<style scoped>
#home {
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #000000;
  height: auto;
  margin-top: 80px !important;
}
nav {
  width: 100%;
  border-radius: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-shrink: 2;
  align-items: center;
  justify-content: space-between;
  z-index: auto;
}
.navbar {
  background-color: #eb8190;
}

#container {
  background-color: rgba(0, 0, 0, 0.158);
  width: 50%;
  margin: 10px auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
}
.card {
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.072),
    0 22.3px 17.9px rgba(0, 0, 0, 0.145), 0 41.8px 33.4px rgba(0, 0, 0, 0.122),
    0 100px 80px rgba(0, 0, 0, 0.12);

  min-height: 200px;
  border: 1px solid black;
  margin: 30px 0;
}
.card-img-overlay{
  width:70% !important;
  margin: 10px auto;
  background-color: rgba(0, 0, 0, 0.58);
  padding: 20px;
  

}
.card bg-dark text-white{
  width:50%;
}
.carousel-inner {
  height: 400px;
}
#title {
  text-transform: capitalize;
  text-align: center;
  font-size: 30px;
}
#date {
  text-decoration: underline;
  font-weight: bold;
  font-size: 15px;
}
#description {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* overflow-y: scroll; */
  height: 30%;
  background-color: rgb(217, 217, 217);
  border-radius: 10px;
}
#category {
  text-transform: uppercase;
  text-decoration: underline;
  color: white;
  font-weight: bold;
  font-size: 25px;
  padding: 3px;
  width: auto;
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
}
div .card-body {
  height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.card-img {
  height: 400px;

}
.btn-primary {
  margin: 2px;
  width: 30%;
  margin: auto;
  position: absolute;
  bottom: 5px;
  right: 50%;
}
.btn-danger {
  margin: 2px;
  width: 30%;
  margin: auto;
  position: absolute;
  bottom: 5px;
  left: 50%;
  right: 50%;
}
#footer {
  width: 100%;
  padding: 5px auto;
  margin-top: 0;
  text-align: center;
  background-color: rgb(79, 78, 78);
  color: white;
}
.btn-outline-secondary {
  margin: 0 20px;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  color :rgb(0, 38, 255);
  font-weight: bold;
  transform: 1s ;
}
.btn-outline-secondary:hover{
  background-color: rgb(78, 77, 77);
  color:white
}
.card-favorite {
  text-align: center;
  cursor: pointer;
  color: red;
  width: 30%;
  display: block;
  margin: 5px auto;
}
path{
  font-size: 50px;
}
.card-favorite:hover {
  color: rgb(83, 83, 83);
}

button {
  cursor: pointer;
}
#secondary-nav-text{
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
