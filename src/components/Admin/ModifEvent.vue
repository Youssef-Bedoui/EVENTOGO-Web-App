<template>
  <div id="container">
    <div id="centeredDiv">
      <h2 id="title">Modif Event</h2>
      <div id="element">
        <label>Event Title :</label>
              <input type="text" placeholder="Tap Event Title..." @change="titleInput($event)"
                v-bind:defaultValue="this.title" />
            </div>
            <div id="element">
              <fieldset>
                <legend>Event Description:</legend>
                <textarea rows="3" placeholder="Tap Event Description..." @change="descriptionInput($event)"
                  v-bind:defaultValue="this.description"></textarea>
              </fieldset>
            </div>
            <div id="element">
              <label>Event Type :</label>
              <select name="types" id="types" @change="switchSelect($event)">
                <option hidden selected>{{ this.type }}</option>
                <option value="Cultural">Cultural</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Social">Social</option>
                <option value="Religious">Religious</option>
              </select>
            </div>
            <div id="element">
              <label>Event Date :</label>
              <input type="datetime-local" @change="inputDate($event)" :defaultValue="this.date" />
            </div>
            <div id="element" class="d-flex flex-row justify-content-around align-items-center">
              <label>Event Image :</label>
              <input class="w-50" type="file" accept="image/*" v-on:change="onUpload" />
              <img v-if="image !== null" class="rounded-img" v-bind:src="image" alt="new image" />
              </div>
            <div>
              <button id="modifBtn" @click="handleSubmit()">Submit Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModifView",
  mounted: function () {
    this.id = localStorage.getItem("id");
    axios
      .get(`http://localhost:3000/api/event/selectOne/${this.id}`)
      .then((result) => {
        console.log(result);
        this.title = result.data[0].title;
        this.description = result.data[0].description;
        this.type = result.data[0].type;
        this.image = result.data[0].image;
        this.date = result.data[0].date;
      });
  },
  data() {
    return {
      id: "",
      title: "",
      description: "",
      type: "",
      image: null,
      date: "",
    };
  },
  methods: {
    descriptionInput(event) {
      this.description = event.target.value;
      console.log(this.description);
    },
    switchSelect(event) {
      this.type = event.target.value;
      console.log(this.type);
    },
    titleInput(event) {
      this.title = event.target.value;
      console.log(this.title);
    },
    inputDate(event) {
      this.date = event.target.value;
    },
    async onUpload(event) {
      const file = event.target.files[0];
      const form = new FormData()
      form.append("file", file);
      form.append("upload_preset", "JozefBed");
      await axios.post("http://api.cloudinary.com/v1_1/diyuy6jxe/upload", form)
        .then(result => { this.image = result.data.secure_url; this.image = result.data.secure_url });
    },
    handleSubmit() {
      axios
        .put(`http://localhost:3000/api/event/modif/${this.id}`, {
          title: this.title,
          description: this.description,
          date: this.date,
          image: this.image,
          type: this.type,
        })
        .then((response) => {
          location.href = "/";
          setTimeout(() => {
            alert("Modified Successfully :)");
            console.log(response);
          }, 0.5);
        })
        .catch((error) => {
          alert("Error Occured!! Please retry");
          console.log(error);
        });
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
  height: 100vh;
  padding: 10px;
  background-image: linear-gradient(45deg, #5B49E1, #74c0ff, #5B49E1)
}

#centeredDiv {
  width: 40%;
  padding: 15px 10px;
  background-color: transparent;
  color: white;
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
  width: 90%;
}

label,
fieldset legend {
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: bold;
}

textarea {
  width: 100%;
  font-weight: bold;
}

input,
select,
fieldset textarea {
  border: 2px solid #5B49E1;
  border-radius: 10px !important;

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

.rounded-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 5px;
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

#modifBtn {
  margin-top: 20px;
  background-color: #3b21ff;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease 0s;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}

#modifBtn:hover {
  background-color: #4f38fd;
}
@media(max-width: 768px) {
  #centeredDiv{
    margin-top: 50px;
    width: 100%;
  }
  #element{
    width: 100%;
  }
  *:not(#title){
    font-size: 10px !important;
  }
}
</style>
