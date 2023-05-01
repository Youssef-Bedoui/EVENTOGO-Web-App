<template>
  <div>
    <!-- for user only  -->
    <div id="home" v-if="user && user.role === 'user'">
      <div id="carouselExampleSlidesOnly" class="carousel slide position-relative" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../../img/pexels-wolfgang-2747449.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../../img/Streaming-Saint-2-scaled.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../../img/most-famous-festivals-in-tunisia-826231.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../../img/_72A3578.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../../img/annexe-camping-2022.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
        <div class="carousel-caption">
          <h1>EVENTOGO | DISCOVER YOUR NEXT ADVENTURE !</h1>
          <p>"Discover Nearby Events, Explore New Adventures: Eventogo helps you find the perfect destination to go and
            have fun. Start your next adventure today!"</p>
          <button @click="scrollToCards" class="btn btn-large font-weight-bold discover_btn mx-auto">DISCOVER NOW
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
              class="bi bi-arrow-down-circle-fill ml-3" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
            </svg>
          </button>
        </div>
      </div>
      <!-- navbar search filter -->
      <nav class="navbar filter-nav">
        <form class="container-fluid justify-content-around align-items-center">
          <div class="search mx-auto d-flex align-items-center">
            <input @input="handleSearch($event)" class="search-bar" type="search" placeholder="Search by name or city...">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search"
              viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>

          <button class="btn category_btn" @click="getEvents()">
            All
          </button>
          <button class="btn category_btn" @click="handleType($event, 'Cultural')">
            Cultural
          </button>
          <button class="btn btn-sm category_btn" type="button" @click="handleType($event, 'Entertainment')">
            Entertainment
          </button>
          <button class="btn btn-sm category_btn" type="button" @click="handleType($event, 'Social')">
            Social
          </button>
          <button class="btn btn-sm category_btn" type="button" @click="handleType($event, 'Religious')">
            Religious
          </button>
        </form>
      </nav>
      <!-- card -->
      <div ref="cards" class="container-fluid" v-if="this.user.role == 'user'">
        <div v-if="favoriteClicked"
          class="alert alert-success favorite-alert w-25 font-weight-bold d-flex align-items-center" role="alert">
          Event added to Favorites <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            class="bi bi-check-circle ml-2" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="card col-lg-3 col-md-4 col-12 text-dark position-relative" v-for="(elem, i) in this.currentEvents"
            :key="i">
            <div @click="showDetails(elem)" class="img-container">
              <img v-bind:src="elem.image" class="card-img" alt="..." />
            </div>
            <div class="top-card">
              <h2 class="card-favorite" v-if="this.user.id" :value="elem.id" @click="postFavorite(elem)">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  class="bi bi-calendar-heart" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Zm7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                </svg>
              </h2>
            </div>
            <div @click="showDetails(elem)" class="card-body">
              <h5 class="card-title" id="title">{{ elem.title }}</h5>
              <p class="city">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt"
                  viewBox="0 0 16 16">
                  <path
                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                {{ elem.city }}
              </p>

              <p class="card-date" id="date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-calendar-check" viewBox="0 0 16 16">
                  <path
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                {{ elem.date }}
              </p>
            </div>
          </div>
          <div v-if="displayMoreButton" @click="showMore"
            class="d-flex justify-content-center align-items-center py-0 py-md-2 px-2 mt-1 mb-3 more">
            <h6>Show more
            </h6>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
              class="bi bi-arrow-down-short d-flex align-items-center text-light" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>


    <!-- for admin only  -->
    <div class="dashboard-main" v-else-if="user && user.role == 'admin'">
      <!-- search   -->
      <div class="search">
        <input type="search" @input="handleSearch" placeholder="Search for event" />
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search"
            viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <!-- dashboard table  -->
          <thead class="thead-dark">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Title</th>
              <th scope="col">Controls</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(elem, i) in this.events" :key="i">
              <td><img v-bind:src="elem.image" class="card-img-admin" alt="..." /></td>
              <td>{{ elem.type }}</td>
              <td>{{ elem.date }}</td>
              <td>{{ elem.title }}</td>
              <td>
                <button class="btn p-0 btn-primary" v-if="this.user.id" :value="elem.id" @click="edit($event)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
                </button>
                <button class="btn p-0 btn-danger" @click="delet($event, elem.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3"
                    viewBox="0 0 16 16">
                    <path
                      d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- for user not connected  -->
    <div id="home" v-else>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../../img/pexels-wolfgang-2747449.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../../img/Streaming-Saint-2-scaled.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../../img/most-famous-festivals-in-tunisia-826231.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../../img/_72A3578.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../../img/annexe-camping-2022.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <div class="carousel-caption">
            <h1>EVENTOGO | DISCOVER YOUR NEXT ADVENTURE !</h1>
            <p>"Discover Nearby Events, Explore New Adventures: Eventogo helps you find the perfect destination to go and
              have fun. Start your next adventure today!"</p>
            <div class="home_btns">
              <button @click="scrollToCards" class="btn font-weight-bold discover_btn">
                DISCOVER NOW
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  class="bi bi-arrow-down-circle-fill ml-3" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                </svg>
              </button>
              <button v-if="!user.length" @click="navigateToSignIn" class="btn font-weight-bold signIn_btn">
                SIGN IN
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  class="bi bi-box-arrow-in-right ml-3" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                  <path fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- navbar search filter -->
      <nav class="navbar filter-nav">
        <form class="container-fluid justify-content-around align-items-center">
          <div class="search mx-auto d-flex align-items-center">
            <input @input="handleSearch($event)" class="search-bar" type="search" placeholder="Search by name or city...">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search"
              viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>

          <button class="btn category_btn" @click="getEvents()">
            All
          </button>
          <button class="btn category_btn" @click="handleType($event, 'Cultural')">
            Cultural
          </button>
          <button class="btn btn-sm category_btn" type="button" @click="handleType($event, 'Entertainment')">
            Entertainment
          </button>
          <button class="btn btn-sm category_btn" type="button" @click="handleType($event, 'Social')">
            Social
          </button>
          <button class="btn btn-sm category_btn" type="button" @click="handleType($event, 'Religious')">
            Religious
          </button>
        </form>
      </nav>
      <!-- card -->
      <div ref="cards" class="container-fluid">
        <div v-if="favoriteClicked"
          class="alert alert-success favorite-alert w-25 font-weight-bold d-flex align-items-center" role="alert">
          Event added to Favorites <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            class="bi bi-check-circle ml-2" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="card col-lg-3 col-md-4 col-12 text-dark position-relative" v-for="(elem, i) in this.currentEvents"
            :key="i">
            <div @click="showDetails(elem)" class="img-container">
              <img v-bind:src="elem.image" @load="onImageLoad" class="card-img" alt="..." />
            </div>
            <div class="top-card">
              <h2 class="card-favorite" v-if="this.user.id" :value="elem.id" @click="postFavorite(elem)">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  class="bi bi-calendar-heart" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Zm7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                </svg>
              </h2>
            </div>
            <div @click="showDetails(elem)" class="card-body">
              <h5 class="card-title" id="title">{{ elem.title }}</h5>
              <p class="city">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt"
                  viewBox="0 0 16 16">
                  <path
                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                {{ elem.city }}
              </p>

              <p class="card-date" id="date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-calendar-check" viewBox="0 0 16 16">
                  <path
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                {{ elem.date }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="displayMoreButton" @click="showMore"
          class="d-flex justify-content-center align-items-center py-0 py-md-2 px-2 mt-1 mb-3 more">
          <h6>Show more
          </h6>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-arrow-down-short d-flex align-items-center text-light" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      events: [],
      currentEvents: [],
      user: {},
      searchInput: "",
      favoriteClicked: false,
      firstItemIndex: 0,
      lastItemIndex: 18,
      displayMoreButton: false,
      imageLoaded: false,
    };
  },
  props: {},
  mounted: function () {
    // get user info 
    const userString = localStorage.getItem("user");
    if (userString) {
      const userArray = JSON.parse(userString);
      this.user = userArray[0];
    }
    //get events
    axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
      this.events = result.data;
      this.currentEvents = result.data.slice(0, 18);
      this.displayMoreButton = this.events.length > 18 && this.currentEvents.length < this.events.length;
    });
  },
  methods: {
    getEvents() {
      axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
        this.events = result.data.slice(this.firstItemIndex, this.lastItemIndex);
      });
    },
    scrollToCards() {
      this.$refs.cards.scrollIntoView({ behavior: "smooth" });
    },
    navigateToSignIn(e) {
      e.preventDefault();
      location.href = "/signIn";
    },
    postFavorite(event) {
      this.favoriteClicked = true;
      setTimeout(() => {
        this.favoriteClicked = false;
      }, 3000);
      const id_user = this.user.id;
      const id_event = event.id;
      axios.post(`http://localhost:3000/api/favorite/addfavorite`, { id_user, id_event })
        .then(res => console.log("favorit-result", res))
        .catch(err => {
          console.log(err)
        })
    },
    edit(event) {
      console.log(event.target.value);
      localStorage.setItem("id", event.target.value);
      location.href = "/modif";
    },
    delet(event, id) {
      axios
        .delete(`http://localhost:3000/api/event/delete/${id}`)
        .then((result) => {
          console.log(result);
          this.events.splice(id - 1, 1);
          localStorage.setItem("id", event.target.value);
          location.href = "/";
        });
    },
    handleSearch(event) {
      this.searchInput = event.target.value.toLowerCase();
      axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
        this.currentEvents = result.data.filter((event) => {
          return event.title.toLowerCase().includes(this.searchInput) || event.city.toLowerCase().includes(this.searchInput);
        });
      });
    },
    showDetails(event) {
      localStorage.setItem("event", JSON.stringify(event));
      location.href = "/eventDetails";
    },
    // handle search
    handleType(event, value) {
      event.preventDefault();
      axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
        this.currentEvents = result.data.filter((event) => {
          return event.type == value;
        });
      });
    },
    showMore(e) {
      e.preventDefault();
      const nextEvents = this.events.slice(this.lastItemIndex, this.lastItemIndex + 18);
      this.currentEvents.push(...nextEvents);
      this.lastItemIndex += 18;
      this.displayMoreButton = this.lastItemIndex < this.events.length;
    },
    onImageLoad() {
      this.imageLoaded = true;
    },
  },

};
</script>

<style scoped>
#home {
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: rgb(199, 197, 197); */
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 20px;
}

.search {
  position: relative;
  width: 30%;
  margin: 10px auto;
  padding-top: 10px;
}

.search input {
  min-width: 100%;
  padding: 5px 10px;
  border: 2px solid #a58503;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.icon {
  position: absolute;
  top: 40%;
  right: 10px;
}

.icon svg {
  width: 20px;
  height: 20px;
}

tbody {
  font-weight: bold;
}

.card {
  height: 250px;
  padding: 0;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.664);
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 5px black;
  border: none !important;
  transition: .2s ease;
}

.card:hover {
  transform: scale(1.01);
}

.carousel-inner {
  height: calc(100vh - 80px);
  position: relative;
}

.carousel-item {
  height: calc(100vh - 80px);
}

#carouselExampleSlidesOnly .carousel-inner .carousel-item img {
  width: 100%;
  height: calc(100vh - 80px);
}

#carouselExampleSlidesOnly .carousel-inner .carousel-item img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimizeQuality !important;
  -ms-interpolation-mode: bicubic;
}

.carousel-caption {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #3246973b;
  padding-top: 15%;
}

.carousel-caption h1 {
  font-size: 60px;
  font-weight: bold;
}

.carousel-caption p {
  font-size: 25px;
  width: 70%;
  margin: 10px auto;
}

.carousel-caption h1,
.carousel-caption p {
  background-color: rgba(0, 0, 0, 0.534);
  padding: 10px;
}

.discover_btn,
.signIn_btn {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  align-items: center;
  margin: 20px 10px;
  width: 200px;
  font-size: 20px;
  border-radius: 30px;
}

.discover_btn {
  box-shadow: 0 0 10px rgb(255, 255, 255);
  background-color: white;
}

.signIn_btn {
  box-shadow: 0 0 10px #ffcd05;
  background-color: #ffcd05;

}

.home_btns {
  width: 100%;
  display: flex;
  justify-content: center !important;
  align-items: center;
}

.top-card {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.card-title {
  text-transform: capitalize;
  text-align: left;
  font-size: 18px;
  padding: 5px;
  color: white;
}


.card-img {
  width: 100% !important;
  height: 100%;
  border-radius: 10px 10px 0 0;
  border: none;
  object-fit: cover;
}

.img-container {
  position: relative;
  width: 100% !important;
  height: 68%;
  margin: 0;
  padding: 0;
  border-radius: 10px 10px 0 0;
  border: none;
}

.img-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 75%, rgb(0, 0, 0));
}

div .card-body {
  position: relative;
  padding: 5px !important;
  padding-bottom: 0 !important;
  color: white;
  background: rgb(0, 0, 0);
  border-radius: 0 0 10px 10px;
}

.dashboard-main {
  background-color: #f5f5f5;
}

.city {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5px;
  left: 10px;
  margin: 0 !important;
}

thead tr,
tbody tr {
  text-align: center;
  overflow: hidden;
}

tbody td {
  height: 50px;
  padding: 0 5px !important;

}

tbody td img {
  height: 100px !important;
  padding: 0 !important;
}

tbody td {
  vertical-align: middle;
}


.btn-primary,
.btn-danger {
  padding: 10px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.btn-primary {
  margin-bottom: 5px;
}

.btn-outline-secondary {
  margin: 0 20px;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  color: rgb(43, 74, 248);
  font-weight: bold;
  transition: .2s ease;
  border-radius: 30px !important;

}

.btn-outline-secondary:hover {
  background-color: rgb(241, 239, 239);
}

.card-favorite {
  color: black;
  background-color: #f2f2f2c7 !important;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 10px 0 10px;
}


.bi-calendar-heart {
  transition: .3s ease;
}

.favorite-alert {
  position: fixed;
  top: 15%;
  left: 10%;
  z-index: 999;
}



.bi-calendar-heart:hover {
  color: red;
  transform: scale(1.1);
}

.search .bi-search {
  position: absolute;
  top: 35%;
  right: 10px;
}

.card-date {
  position: absolute;
  bottom: 0px;
  right: 5px;
  font-size: 15px;
  padding: 2px 5px;
  margin: 5px 0 !important;
  background-color: rgb(0, 0, 0);
  border-radius: 5px;
  border: 1px solid #ffcd05;
  color: #ffcd05;
  display: flex;
  align-items: center;
}

.card-date svg {
  margin-right: 5px;
}

path {
  font-size: 50px;
}

button {
  cursor: pointer;
}

.card-img-admin {
  width: 200px;
  height: 100%;
}

.category_btn {
  margin: 0 5px;
  padding: 5px;
  width: 150px;
  text-align: center;
  font-size: larger;
  font-weight: bold;
  color: #a58503;
  border: 2px solid #a58503;
  border-radius: 30px;
}

.search-bar {
  width: 100%;
  padding: 5px 15px;
}

.filter-nav {
  background-color: transparent;
  margin-bottom: 20px;
}

.more {
  background-image: linear-gradient(-225deg, #025a68 0%, #1D8FE1 48%, #625EB1 100%);
  background-blend-mode: normal, color-burn;
  box-shadow: 0 0 5px #025a68;
  width: 35%;
  margin: 0 auto;
  border-radius: 0 30px;
  cursor: pointer;
}

.more>h6 {
  color: white;
  font-size: 20px;
  white-space: nowrap;
}

@media(max-width : 768px) {
  .card-img-admin {
    width: 50px;
    height: 50px;
  }

  .filter-nav form {
    display: inline;
    padding: 0;
  }

  .search {
    width: 80% !important;
    margin: 0 auto;
    padding: 10px;
  }

  .search-bar input {
    font-size: medium;
  }

  .category_btn {
    width: 100px;
    padding: 5px !important;
    font-size: medium;
  }

  .carousel-item {
    height: 100%;
  }

  .carousel-item img {
    height: 100%;
  }

  .carousel-caption {
    padding-top: 20px !important;
  }

  .carousel-caption h1 {
    font-size: 35px;
  }

  .carousel-caption p {
    font-size: 20px;
    width: 85%;
  }

  .filter-nav form button {
    margin: 5px;
  }

  tbody td img {
    height: 50px !important;
    width: 100%;
    padding: 0 !important;
  }

  tbody td {
    height: 30px !important;
    padding: 5px;
  }

  button {
    width: 30px;
    height: 40px;
    padding: 5px !important;
  }

  * {
    font-size: medium;
  }
}
</style>
