<template>
    <div class="container">
        <!-- loading spinner  -->
        <div v-if="isLoading">
            <Spinner />
        </div>

        <div v-if="this.isLoading === false" class="verifEmail_container">

            <img v-if="this.verifStatus === 'success'" class="verifLogo" :src="require('../../img/verifEmail.png')" />
            <img v-if="this.verifStatus === 'fail'" class="verifLogo" :src="require('../../img/verifEmailError.png')" />
            <h1 class="text-center mt-0 mb-5 text-uppercase">Email Verification</h1>


            <form>
                <div v-if="this.verifStatus === 'success'">
                    <h6 class="font-weight-bold text-center text-success">Your Email has verified successfully</h6>
                    <h6 class="font-weight-bold text-center text-success">Welcome to EVENTOGO Community !</h6>
                    <a class="btn btn-lg loginBtn" href="/signin">GO TO LOGIN</a>
                </div>
                <div v-if="this.verifStatus === 'fail'">
                    <h6 class="font-weight-bold text-center text-danger">An Error occured during verification process !</h6>
                    <h6 class="font-weight-bold text-center text-danger">Please retry</h6>
                    <a class="btn btn-lg registerBtn" href="/signin">SIGN UP</a>
                </div>
                <!-- if error  -->
                <div v-if="this.err">
                    <h6 class="font-weight-bold text-center text-danger">{{ this.errorMessage }}</h6>
                    <a class="btn btn-lg registerBtn" href="/signin">SIGN UP</a>

                </div>
            </form>

            <!-- alert modal popup  -->

            <div v-if="showModal" class="modal_back">
                <div :class="['success_alert', alertStyle]">
                    <div class="container-fluid">
                        <h1>{{ this.modalText }}</h1>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import Spinner from '../Spinner/Spinner.vue';

export default {
    components: { Spinner },
    data() {
        return {
            isLoading: false,
            userToken: null,
            userEmail: null,
            verifStatus: null,
            err: false,
            errorMessage: null,
        };
    },
    mounted() {
        this.isLoading = true;
        this.userToken = this.$route.params.token;
        this.userEmail = this.$route.params.email;
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
        this.verifyEmail();
    },
    methods: {
        async verifyEmail() {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/user/getUser/${this.userEmail}`
                );
                if (response.data.length > 0) {
                    if (response.data[0].activationToken === this.userToken) {
                        this.verifStatus = "success";
                        console.log(this.verifStatus);
                    } else {
                        this.verifStatus = "fail";
                    }
                } else {
                    this.err = true;
                    this.errorMessage = "Email verification Failed , email not verified !";
                }
            } catch (error) {
                this.verifStatus = "fail";
                console.log("catch")
            }
        },
    },
};
</script>

<style scoped>
.verifEmail_container {
    width: 40%;
    margin: 40px auto;
    height: calc(100vh - 75px);
}

.verifEmail_container h6 {
    font-size: 20px;
    letter-spacing: 1px;
    padding: 5px;
}

.verifLogo {
    width: 150px;
    height: 150px;
    margin: 10px auto;
    display: flex;
    justify-content: center;
}

.submit_btn {
    width: 100%;
    margin: 10px auto;
}

.loginBtn {
    text-decoration: none;
    color: black;
    margin: 20px auto;
    width: 100%;
    background: linear-gradient(to right, #379fd7e3, #379fd79a, #b8e2f89a);
    border-radius: 30px;
    border: 2px solid #379fd7a8;
    box-shadow: 0 0 5px #37A0D7;
    font-weight: bold;
}
.registerBtn{
    text-decoration: none;
    color: black;
    margin: 20px auto;
    width: 100%;
    background: linear-gradient(to right, #d73737e3, #d737379a, #f8b8b89a);
    border-radius: 30px;
    border: 2px solid #d73737a8;
    box-shadow: 0 0 5px #d73737;
    font-weight: bold;
}


@media (max-width: 460px) {
    .verifEmail_container {
        width: 100%;
    }
}
</style>
