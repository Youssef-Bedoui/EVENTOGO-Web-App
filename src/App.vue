<template>
  <div id="app">
    <nav>
      <div class="navleft">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/add">Add Event</router-link> |
      </div>
      <div class="navright">
        <router-link to="/sign up">Sign Up</router-link> |
        <router-link to="/sign in">Sign in</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/">Logout</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #f5f5f5;
  padding: 30px;
  display: flex;
  flex-direction:row;
}
.navright{
  position: relative;
  left:65%
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
