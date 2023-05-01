<template>
  <div id="container">
    <div class="totalUsers">
      <p>Total Users : {{ this.users.length }} </p>
    </div>

    <div class="search">
      <input @input="handleSearch" type="search" id="search" placeholder="Search..." />
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search"
          viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table mt-3">
        <thead class="thead-dark">
          <tr class="text-uppercase">
            <th scope="col">Role</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
            <th scope="col">Banned</th>
            <th scope="col" class="text-center">Controls</th>
          </tr>
        </thead>
        <tbody class="text-light">
          <tr v-for="(elem, i) in users" :key="i">
            <td>{{ elem.role }}</td>
            <td>{{ elem.name }}</td>
            <td>{{ elem.email }}</td>
            <td>{{ elem.country }}</td>
            <td>{{ elem.isBanned }}</td>
            <td class="d-flex justify-content-center">
              <button @click="deleteUser(elem.id)" :disabled="elem.role == 'admin'"
                class="btn btn-sm btn-danger p-2 mr-2">Remove</button>
              <button @click="blockUser(elem.id, elem.isBanned)" :disabled="elem.role == 'admin'" class="btn btn-sm p-2"
                :class="{ 'btn-warning': elem.isBanned == 'false', 'btn-success': elem.isBanned == 'true' }">
                {{ elem.isBanned == 'true' ? 'Give Access' : 'Block' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UsersListView",
  mounted: function () {
    window.scrollTo(0, 0);

    axios.get("http://localhost:3000/api/user/users").then((result) => {
      this.users = result.data;
    });
  },
  data: () => {
    return {
      searchInput: "",
      users: [],
      role: JSON.parse(localStorage.getItem("user"))[0].role
    };
  },
  methods: {
    async deleteUser(id) {
      await axios
        .delete(`http://localhost:3000/api/user/delete/${id}`)
        .then(() => {
          axios.get("http://localhost:3000/api/user/users").then((result) => {
            console.log(result.data);
            this.users = result.data;
          });
          alert("User deleted successfully")
        });
    },
    async blockUser(id, banned) {
      const newIsBanned = banned === "true" ? "false" : "true";
      console.log(newIsBanned);
      await axios
        .patch(`http://localhost:3000/api/user/update/${id}`, { isBanned: newIsBanned })
        .then(() => {
          axios.get("http://localhost:3000/api/user/users").then((result) => {
            this.users = result.data;
          });
          alert(banned ? "User Account activated" : "User Banned successfully")
        });
    },
    handleSearch(event) {
      this.searchInput = event.target.value.toLowerCase();
      axios.get("http://localhost:3000/api/user/users").then((result) => {
        this.users = result.data.filter((user) => {
          return user.name.toLowerCase().includes(this.searchInput) || user.email.toLowerCase().includes(this.searchInput);
        });
      });
    }
  }
};
</script>

<style>
#container {
  width: 100%;
  height: 100vh;
  padding: 10px;
  background: url("https://wallpapercave.com/wp/wp2508376.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.totalUsers {
  position: absolute;
  top: 10px;
  left: 20px;
  font-weight: bold;
  background-color: white;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  letter-spacing: 2px;
}

.search {
  position: relative;
  width: 30%;
  margin: auto;
}

#search {
  padding-right: 40px;
}

.icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}


.search input {
  min-width: 100%;
  padding: 5px 10px;
  border: 2px solid gray;
  border-radius: 5px;
  background-color: #f5f5f5f5;
}

tbody {
  background-color: rgba(0, 0, 0, 0.267);
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
  transition: 0.25s ease-out;
  text-align: center;
}

.card-containers:hover {
  transform: scale(1.05);
}

button {
  text-transform: uppercase;
  font-weight: bold !important;
  letter-spacing: 2px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media(max-width: 768px) {
  #container {
    padding: 0 !important;
  }

  #element {
    width: 100%;
  }

  .search {
    padding-top: 10px;
    width: 60%;
    float: right;
    margin-right: 5px;
  }

  .search svg {
    position: absolute;
    top: 40%;
    right: 10%;
  }

  .icon {
    padding-top: 50px;
  }

  *:not(#title) {
    font-size: 12px !important;
  }
}
</style>
