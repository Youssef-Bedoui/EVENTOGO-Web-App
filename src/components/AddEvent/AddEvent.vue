<template>
  <div id="container">
    <div id="centeredDiv">
      <h2 id="title">Add new Event</h2>
      <div id="element">
        <label>Event Title :</label>
        <input
          type="text"
          placeholder="Tap Event Title..."
          @change="titleInput($event)"
        />
      </div>
      <div id="element">
        <label>Event Description :</label>
        <input
          type="text"
          placeholder="Tap Event Description..."
          @change="descriptionInput($event)"
        />
      </div>
      <div id="element">
        <label>Event Type :</label>
        <select name="types" id="types" @change="switchSelect($event)">
          <option hidden selected>Event Type</option>
          <option value="Cultural">Cultural</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Social">Social</option>
          <option value="Religious">Religious</option>
        </select>
      </div>
      <div id="element">
        <label>Event Date :</label>
        <input type="datetime-local" @change="inputDate($event)" />
      </div>
      <div id="element">
        <label>Event Image :</label>
        <input type="text" @change="onUpload" />
      </div>
      <div>
        <button id="addBtn" @click="handleSubmit()">Publish Your Event</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddEventView",
  data() {
    return {
      title: "ggggggg",
      description: "",
      type: "",
      image: null,
      date: "",
    };
  },
  methods: {
    descriptionInput(event) {
      this.description = event.target.value;
    },
    switchSelect(event) {
      this.type = event.target.value;
    },
    titleInput(event) {
      this.title = event.target.value;
    },
    inputDate(event) {
      this.date = event.target.value;
    },
    onUpload(e) {
      this.image = e.target.value;
    },
    handleSubmit() {
      axios
        .post("http://localhost:3000/api/event/add", {
          title: this.title,
          description: this.description,
          date: this.date,
          image: this.image,
          type: this.type,
        })
        .then((response) => {
          location.href = "/";
          setTimeout(() => {
            alert("Added Successfully :)");
            console.log(response);
          }, 0.5);
        })
        .catch((error) => {
          alert("Error Occured!! Please retry");
          console.log(error);
        });
    },
    getSuccessMsg() {
      setTimeout(function () {
        alert("Event Added Successfully !");
      }, 0.5);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
#title {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
#container {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0;
  background-image: url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700432285.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
#centeredDiv {
  width: 40%;
  padding: 25px 20px;
  background-color: rgb(0, 104, 95);
  color: white;
  border-radius: 50px 0 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}
#element {
  padding: 5px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 80%;
}
label {
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
input:focus {
  background-color: #e7e7e7;
}
#types {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
select {
  border-radius: 5px;
}
select option {
  background-color: rgb(226, 223, 210);
}
#addBtn {
  margin-top: 20px;
  background-color: rgb(81, 80, 80);
  color: white;
  border: 3px solid #e7e7e7;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px white;
  transition: all 0.3s ease 0s;
  font-weight: bold;
  font-size: 20px;
}
#addBtn:hover {
  border: 3px solid #000000;
  box-shadow: 0px 2px 5px white;
  background-color: rgba(1, 149, 53, 0.984);
}
</style>
