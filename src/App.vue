<template>
    <div>
      <!-- loading spinner -->
      <div v-if="loading" class="loading">
        <div class="loading_content">
          <div class="spinner"></div>
          <p>Logging out...</p>
        </div>
      </div>
      <!--nav for admin  -->
      <nav v-if="logged && logged === 'admin'">
        <div class="container-fluid">
          <div class="row m-0">
            <img class="col-md-3 col-8 mx-auto logo" src="./img/278719454_518845159791717_4455080078741522629_n.png" />
            <div class="nav col-md-8 col-12 py-2">
              <router-link class="nav-link d-flex justify-content-center align-items-center" to="/"
                style=" text-transform: uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                  class="bi bi-card-list mr-2" viewBox="0 0 16 16">
                  <path
                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                  <path
                    d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg>
                Dashboard</router-link>

              <router-link class="nav-link d-flex align-items-center" to="/add">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  class="bi bi-plus-square mr-2" viewBox="0 0 16 16">
                  <path
                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Add Event</router-link>
              <router-link class="nav-link d-flex align-items-center" to="/users">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people mr-2"
                  viewBox="0 0 16 16">
                  <path
                    d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                </svg>
                Users List</router-link>
              <router-link to="/" class="nav-link logout ml-auto" @click="logOut()">Logout</router-link>
            </div>
          </div>
        </div>
      </nav>
      <!-- nav for user  -->
      <nav class="navbar pt-0 navbar-expand-lg" v-else-if="logged && logged === 'user'">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3 col-lg-4 col-sm-12">
              <img class="logo" src="./img/278719454_518845159791717_4455080078741522629_n.png" />
            </div>
            <div class="links col-md-9 col-lg-8 col">
              <router-link class="d-flex align-items-center" to="/" style="text-transform: uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  class="bi bi-house-door mx-1 d-none d-md-flex d-lg-flex" viewBox="0 0 16 16">
                  <path
                    d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                </svg>
                Home</router-link>
              <router-link class="d-flex align-items-center" to="/calendar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  class="bi bi-calendar-check mr-1 d-none d-md-flex d-lg-flex" viewBox="0 0 16 16">
                  <path
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                Calendar</router-link>
              <router-link class="d-flex align-items-center" to="/favorite">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  class="bi bi-star mr-1 d-none d-md-flex d-lg-flexd-none d-md-flex d-lg-flex" viewBox="0 0 16 16">
                  <path
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
                Favorites</router-link>
              <router-link class="d-flex align-items-center" to="/about">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  class="bi bi-info-circle mr-1 d-none d-md-flex d-lg-flex" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path
                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                About</router-link>

              <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-toggle="dropdown"
                  aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-person mr-1 d-none d-md-flex d-lg-flex" viewBox="0 0 16 16">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                  Profile
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item d-flex align-items-center" href="/profile">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-person-fill-gear mr-2" viewBox="0 0 16 16">
                        <path
                          d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                      Account info</a></li>
                  <li><a class="dropdown-item d-flex align-items-center" href="/notifications">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-bell-fill mr-2" viewBox="0 0 16 16">
                        <path
                          d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                      </svg>
                      Notifications
                    </a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item d-flex justify-content-start align-items-center" @click="logOut">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-box-arrow-right mr-2 d-none d-md-flex d-lg-flex" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fill-rule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                      </svg>
                      Logout
                    </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!--nav for users not connected  -->
      <nav class="pt-0" v-else>
        <div class="container-fluid">
          <div class="row">
            <img class="col-md-3 col-lg-3 col-10 mx-auto p-md-1 logo"
              src="./img/278719454_518845159791717_4455080078741522629_n.png" />
            <div class="nav col-md-4 col-lg-4 col-4 mx-auto text-uppercase d-flex justify-content-center align-items-center">
              <router-link to="/">Home</router-link>
              <router-link to="/about">About</router-link>
            </div>
            <div
              class="search col-lg-3 col-md-3 col-sm-10 mx-auto d-flex align-items-center my-2 order-3 order-lg-2 order-md-2">
              <input @blur="showSearchResults = false" class="search-bar" type="search" @input="search"
                placeholder="Search for event...">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            <div
              class="navright col-2 col-md-2 col-lg-2 d-flex justify-content-center align-items-center order-2 order-lg-3 order-md-2">
              <router-link class="d-flex align-items-center" to="/signin">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  class="bi bi-box-arrow-in-right mr-2" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                  <path fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>Sign in</router-link>
            </div>
          </div>
        </div>
      </nav>
      <!-- search popup  -->
      <div v-if="showSearchResults" class="searchContainer">
        <div class="searchBar">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search"
            viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <h3 class="d-inline ml-2 mb-0">Search...</h3>
        </div>
        <div class="searchResult">
          <div v-for="(event, index) in searchResult" v-bind:key="index" class="searchItem">
            <h6 class="py-1 title">{{ event.title }}</h6>
            <hr />
          </div>
        </div>
      </div>

      <div id="app">
        <router-view class="transition-fade" />
      </div>
      <div class="subscribe py-2">
        <div class="container">
          <div class="row d-flex align-items-center">
            <div class="col-md-1 d-flex justify-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="dark" class="bi bi-bell"
                viewBox="0 0 16 16">
                <path
                  d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
            </div>
            <div class="col-md-4 col-12 mx-auto">
              <h4 class="text-black">Subscribe to get notifications about latest events:</h4>
            </div>
            <div class="col-md-4 col-12 mx-auto">
              <select class="mr-lg-2 p-2 col-12" v-model="selectedCountry">
                <option disabled selected>Please select a country</option>
                <option v-for="country in countryList" v-bind:key="country">{{ country }}
                  <svg v-if="selectedCountry === country" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    fill="currentColor" class="bi bi-globe-americas float-end me-3" viewBox="0 0 16 16">
                    <path
                      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                  </svg>
                </option>
              </select>
              <div class="col-12 position-relative p-0">
                <input type="email" placeholder="Your email" required />
                <div class="subscribe_icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#a58503" class="bi bi-envelope"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                </div>
              </div>
            </div>
            <button class="col-md-2 col-6 mx-auto btn subscribe-btn ml-lg-2 p-2 font-weight-bold my-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-envelope-check mt-1" viewBox="0 0 16 16">
                <path
                  d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                <path
                  d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
              </svg>
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div class="footer">
        <h4>&copy; EVENTOGO TUNISIA , All rights Reserved 2022-2023</h4>
        <p class="m-0 pb-2">Thank you for visiting our website</p>
      </div>
  </div>
</template>


<script>

import axios from "axios";
import countryList from "./store/countryList";

export default {
  data() {
    return {
      loading: false,
      logged: null,
      name: null,
      email: null,
      role: null,
      id: null,
      user: null,
      searchInput: "",
      searchResult: [],
      showSearchResults: false,
      selectedCountry: "Please select a country",
      countryList: countryList.country,
    };
  },

  mounted() {
    window.scrollTo(0, 0);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.id = user[0].id;
      this.logged = user[0].role;
    }
  },
  methods: {
    logOut() {
      if (this.logged) {
        this.loading = true;
        setTimeout(() => {
          localStorage.clear();
          location.href = "/";
          this.loading = false;
        }, 3000);
      }
    },
    async search(event) {
      this.searchInput = event.target.value.toLowerCase();
      console.log(this.searchInput);

      if (this.searchInput === "") {
        this.showSearchResults = false;
        return;
      }

      this.showSearchResults = true;

      await axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
        this.searchResult = result.data.filter((event) => {
          return event.title.toLowerCase().includes(this.searchInput);
        });
      });
    }
  }
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed&display=swap');

#app {
  font-family: 'Barlow Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  min-height: calc(100vh - 75px);
}

.transition-fade {
  animation: fadeIn .5s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

html.is-animating .transition-fade {
  opacity: 0;
  transform: translateX(100%);
}

.logo {
  height: 100%;
  max-height: 75px;
  width: 100%;
  /* mix-blend-mode: multiply;
  filter: contrast(1); */
}

nav {
  width: 100%;
  height: 75px;
  margin: auto;
  background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%);
  background-blend-mode: normal, color-burn;
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  font-family: 'Josefin Sans', sans-serif;
}

.navbar .links {
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
  text-transform: uppercase;
}

.navleft {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  padding: 8px;
  width: 100%;
  position: relative;
  padding-right: 10px;
}

.search .bi-search {
  position: absolute;
  top: 25%;
  right: 20px;
}

.searchContainer {
  position: fixed;
  top: 20%;
  right: 30%;
  left: 30%;
  z-index: 999;
  animation: fadeIn .3s ease;
}

.footer {
  width: 100%;
  padding: 10px 0 !important;
  margin-top: 0;
  text-align: center;
  background-color: black;
  color: #e2b607;
}

.subscribe-btn {
  color: #a58503;
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.searchBar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 10px;
  border-radius: 20px 20px 0 0;
  background-color: #f5f5f5;

}

.searchResult {
  max-height: 50vh;
  background-color: white;
  padding: 20px;
  border-radius: 0 0 30px 30px;
  overflow-y: auto;
  scrollbar-width: 5px;
  background-color: #f5f5f5;
  color: #3929b1;
}

.title {
  font-weight: bold !important;
  transition: .2s ease;
}

.title:hover {
  cursor: pointer;
  color: #ee7300;
}

::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}

.logout {
  transition: .3s ease;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  align-items: center;
  align-items: center;
  color: white !important;
  background: red !important;
  margin: 10px;
}


.logout:hover {
  background: rgba(255, 0, 0, 0.658) !important;
}

.title {
  font-weight: bold !important;
}


nav a,
nav .links a .dropdown {
  font-weight: bold;
  font-size: 17px;
  color: black;
  text-decoration: none;
  padding: 5px 10px;
  transition: all 0.3s ease-in-out;
  transition: .3s ease;
  border-radius: 5px;
  text-shadow: 1px 1px rgba(255, 252, 252, 0.678);

}

.navbar .links a:hover {
  text-decoration: none;
  transform: scale(1.02);
}

nav a.router-link-active:not(.navright a) {
  text-shadow: 0 0 1px #000000c0;
  transform: scale(1.03);
}

.navright {
  padding: 0;
}

.navright a {
  color: white !important;
  background-color: #a58503;
  font-weight: normal !important;
  border-radius: 0px;
  text-transform: uppercase;
}

.navright a:last-child {
  margin-left: 5px;
}

.navbar .links a,
.navbar .links a .dropdown {
  margin: 2px !important;
  white-space: nowrap;
}

nav a svg,
nav .dropdown a {
  margin-bottom: 5px;
}

.navbar .dropdown .dropdown-menu {
  position: absolute;
  right: 0 !important;
  left: unset !important;
}

.navbar .dropdown .dropdown-menu .dropdown-item {
  font-size: smaller;
}

.subscribe {
  background-image: linear-gradient(to right, #f9d423 0%, #ff4e50 100%);
}

.subscribe input {
  width: 100%;
  padding: 8px;
}

.subscribe_icon {
  position: absolute;
  right: 10px;
  top: 30%;
}

.loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 999;
}

.loading_content {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  border-radius: 10px;
  background-color: #a58503;
  box-shadow: 2px 2px 10px #a58503c9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 25px;
  padding: 10px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgb(255, 255, 255);
  animation: spin 1s ease-in-out infinite;
  position: relative;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


@media(max-width :768px) {
  nav {
    height: auto;
    background-color: #ffffff;
  }

  nav .logo {
    object-fit: contain;
  }

  nav a,
  nav .dropdown a {
    font-size: 13px !important;
    padding: 0 5px !important;
    margin: 0 !important;
  }

  nav a svg,
  nav .dropdown a {
    width: 15px;
  }

  .navbar .links {
    padding: 5px !important;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .search-bar {
    padding: 3px 5px;
  }

  .navbar .links a {
    font-weight: bold !important;
  }

  .searchContainer {
    position: fixed;
    top: 20%;
    right: 10%;
    left: 10%;
    z-index: 999;
  }

  .subscribe {
    font-size: small !important;
  }

  .subscribe h4 {
    font-size: 15px;
  }

  .footer {
    font-size: small !important;
  }

  .footer h4 {
    font-size: 17px;
  }

  @media(max-width :460px) {
    svg {
      display: none !important;
    }
  }


}
</style>
