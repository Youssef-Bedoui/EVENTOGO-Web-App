<template>
    <div class="container-fluid details-container pb-5" :style="{ backgroundImage: `url(${this.event.image})` }">
        <div v-if="favoriteClicked"
            class="alert alert-success favorite-alert w-25 font-weight-bold d-flex align-items-center" role="alert">
            Event added to Favorites <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-check-circle ml-2" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
        </div>
        <div class="row">
            <div class="col-md-10 col-lg-10 col mx-auto ">
                <h1 class="text-black my-2 event_title">{{ event.title }}</h1>
                <img class="col-md-12 p-0 event_image" v-bind:src="event.image" />
            </div>
            <div class="col-md-10 col-lg-10 col-12 mx-auto d-flex flex-column justify-content-center">
                <div>
                    <div class="details-header d-flex justify-content-between align-items-center p-2">
                        <h5 class="date font-weight-bold d-flex align-items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-calendar-check mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                            </svg>
                            Date Event : {{ event.date }}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-globe-americas mx-2" viewBox="0 0 16 16">
                                <path
                                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                            </svg>
                            {{ event.city }}
                        </h5>
                        <div class="d-flex align-items-center">
                            <button @click="modifInterested(event.id)" class="mr-2 btn interestedBtn">
                                Interested {{ currCount }}
                            </button>
                            <div v-if="this.user" class="favorite_icon" @click="postFavorite">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                    class="bi bi-calendar-heart" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Zm7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="divider"></div>
                </div>
                <p class="description">
                    {{ event.info }}
                </p>
                <hr class="text-dark" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    name: "EventDetailsView",
    data() {
        return {
            event: {},
            user: JSON.parse(localStorage.getItem("user")),
            isFavoritePressed: false,
            favoriteClicked: false,
            currCount: 0,
            togglePress: false,
        };
    },
    mounted: function () {
        window.scrollTo(0, 0);

        console.log(this.event, this.user, this.isFavoritePressed, this.favoriteClicked, this.currCount, this.togglePress);
        this.event = JSON.parse(localStorage.getItem("event"));
        axios.get(`http://localhost:3000/api/interested/getNumber/${this.event.id}`)
            .then((result) => {
                // console.log(result.data[0]?.interested_count );  //1
                this.currCount = result.data[0].interested_count;
                console.log(this.currCount)

            })
    },
    watch: {
        event: {
            handler: function (newEvent) {
                axios.get(`http://localhost:3000/api/interested/getNumber/${newEvent.id}`)
                    .then((result) => {
                        console.log(result.data[0].interested_count);
                        this.currCount = result.data[0].interested_count;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deep: true,
            immediate: true // update currCount immediately when component is mounted or event is changed
        }
    },
    props: "",


    methods: {

        postFavorite() {
            this.isFavoritePressed = true;
            this.favoriteClicked = true;
            setTimeout(() => {
                this.favoriteClicked = false;
            }, 3000);
            const id_user = this.user.id;
            const id_event = this.event.id;
            if (this.user && !this.isFavoritePressed) {
                axios.post(`http://localhost:3000/api/favorite/addfavorite`, { id_user, id_event })
                    .then(result => console.log(result))
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        async modifInterested(eventID) {
            this.togglePress = !this.togglePress;
            const interestedCount = this.togglePress ? this.currCount + 1 : this.currCount - 1;
            const newCount = interestedCount;

            await axios.get(`http://localhost:3000/api/interested/getNumber/${eventID}`)
                .then(async (result) => {
                    console.log(result)
                    if (result.data[0]) {
                        await axios.put(`http://localhost:3000/api/interested/modifNum/${eventID}`, { interested_count: newCount })
                            .then(() => {
                                this.currCount = newCount;
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        await axios.post(`http://localhost:3000/api/interested/addFirstNum/${eventID}`, { interested_count: 1 })
                            .then(() => {
                                this.currCount = 1;
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }
};
</script>

<style scoped>
.details-container {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.details-container::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.486);
    backdrop-filter: blur(5px);
    pointer-events: none;
}

.details-header {
    background: rgba(238, 237, 236, 0.534);
}

.event_title {
    width: 100%;
    background-color: #2a3158;
    color: white;
    padding: 10px;
    border-radius: 5px 5px 0 0;
    font-size: 30px;
    text-align: center;
    margin-bottom: 0 !important;
}

.divider {
    width: 100%;
    height: 5px;
    background-color: black;
    box-shadow: 0 5px 5px black;
}

.event_image {
    max-height: 400px !important;
    object-fit: cover;
}

.favorite_icon {
    cursor: pointer;
    transition: .2s ease;
}

.favorite_icon:hover {
    color: #ffcc00;
    transform: scale(1.2);
}

.description {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    background: rgba(238, 237, 236, 0.534);
    padding: 30px 10px;
    filter: drop-shadow(0 0 15px rgb(104, 104, 104));

}

.favorite-alert {
    position: fixed;
    top: 15%;
    left: 10%;
    z-index: 999;
}

.interestedBtn {
    border: 1px solid #a58503;
    border-radius: 30px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.interestedBtn:hover {
    background-color: #a58503;
    color: white;
}

@media(max-width: 780px) {
    .event_image {
        height: auto;
    }

    .date {
        font-size: 15px !important;
    }

    .interestedBtn {
        font-size: 15px;
        margin-left: 20px;
    }

}
</style>
