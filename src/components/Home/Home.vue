<template>
  <div>
    <div>
      <li v-for="(elem,i) in this.events " :key="i">
           <h1>{{ elem }}</h1>
      </li>
      <button v-on:click="postFavorite">slim</button>
    </div>
    <h1>Home Page</h1>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "HomeView",
  props: {
    
  },
  mounted: function() {
    axios.get('http://localhost:3000/api/event/selectAll')
    .then(result => {
      console.log (this.events)
      console.log (result.data)
      // this.events=result.data
      console.log (this.events)
})},
methods: {
  myMethod(a) { console.log(a); },
  postFavorite(){
    console.log('slim')
  }
},
//  this data for testing the map
  data(){
    return { 
      events:["j","k","k"]
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
