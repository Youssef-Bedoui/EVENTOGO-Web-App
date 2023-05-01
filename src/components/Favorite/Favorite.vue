<template>
  <div class="favorite">
    <div class="container">
      <h2 class="title d-flex justify-content-center align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar2-heart mr-2" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm2 .5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H3Zm5 4.493c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
  </svg>
        Favorite Events</h2>
      <!-- no items -->
      <div v-if="!favoriteData.length" class="noItems">
        <h2>No Items in Favorite !</h2>
        <button @click="goToMain" class="btn discover_btn">Discover Events</button>
      </div>
      <!-- loading spinner -->
      <div v-if="loading" class="loading">
        <div class="loading_content">
          <div class="spinner"></div>
        </div>
      </div>
      <!-- if there is items  -->
      <table v-if="favoriteData.length" class="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>City</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(elem, i) in this.favoriteData" :key="i">
            <td class="delete_fav">
              <div @click="deleteFavorite(elem.id_event)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-calendar-x"
                  viewBox="0 0 16 16">
                  <path
                    d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
              </div>
            </td>
            <td @click="showDetails(elem)">{{ elem.title }}</td>
            <td @click="showDetails(elem)">{{ elem.city }}</td>
            <td @click="showDetails(elem)"> {{ elem.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template >

<script>
import axios from "axios";
export default {
  name: "FavoriteView",
  mounted: function () {
    window.scrollTo(0, 0);

    this.user = JSON.parse(localStorage.getItem("user"))[0];
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 700);
    axios
      .get(`http://localhost:3000/api/favorite/getAll/${this.user.id}`)
      .then((result) => {
        this.favoriteData = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      user: "",
      favoriteData: {},
      loading: false,
    };
  },
  methods: {
    deleteFavorite(id_event) {
      const id_user = this.user.id;
      axios.delete(`http://localhost:3000/api/favorite/deleteFavorite/${id_event}`, { data: { id_user } })
        .then(() => {
          const index = this.favoriteData.findIndex(fav => fav.id === id_event);
          if (index !== -1) {
            this.favoriteData.splice(index, 1);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    showDetails(event) {
      localStorage.setItem("event", JSON.stringify(event));
      location.href = "/eventDetails";
    },
    goToMain() {
      location.href = "/";
    }
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Gilroy light";
  src: local("Gilroy-light"),
    url(../../assets/fonts/Gilroy-Light.otf) format("otf");
}
* {
  box-sizing: border-box;
}

.favorite {
  min-height: 100vh;
}

.loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
}

.loading_content {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  border-radius: 10px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 25px;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #a58503;
  border-top-color: rgb(0, 0, 0);
  animation: spin 1s ease-in-out infinite;
  position: relative;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.title {
  border: 2px solid lightgray;
  width: fit-content;
  padding: 5px 10px;
  margin-left: 5%;
  font-size: 25px;
}

.container {
  min-height: 100vh;
  padding: 10px;
  margin-top: 10px;
  background-color: white;
}

thead tr {
  text-transform: uppercase;
  font-size: 25px;
    color: #a58503;

}

tbody tr {
  cursor: pointer;
  transition: .2s ease;
  font-size: 20px;
  background-color: #fafafa;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

tbody tr:hover {
  transform: scale(1.01);
  font-weight: bold;
}

.noItems {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.discover_btn {
  color: white;
  background-color: #a58503;
  font-size: 25px;
  margin-top: 20px;
  transition: .2s ease;
}

@media (max-width:480px) {
  thead tr {
    font-size: 20px;
  }

  tbody tr {
    font-size: 15px;
  }
}

.discover_btn:hover {
  color: #a58503;
  background-color: white;
  border: 1px solid #a58503;
}
</style>
