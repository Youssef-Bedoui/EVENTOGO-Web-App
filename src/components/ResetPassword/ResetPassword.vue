<template>
    <div class="reset_container">
        <div class="container">
            <!-- loading spinner  -->
            <div v-if="isLoading">
                <Spinner />
            </div>

            <div v-if="isLoading === false" class="reset_div">
                <div class="mx-auto">
                    <img class="reset_logo"
                        :src="require('../../img/password-reset-icon-flat-vector-design_116137-4571.avif')" />
                    <h3 class="title">Reset Password</h3>
                </div>

                <h6>Enter your Email address</h6>
                <input v-model="this.email" class="email_inp" type="email" placeholder="email..." />
                <p v-if="this.isError" class="errMsg d-flex justify-content-center align-items-center">{{ this.errMessage }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-exclamation-circle ml-2" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg>
                </p>
                <a @click="sendResetEmail" class="btn submit_btn d-flex justify-content-center">SUBMIT</a>
            </div>


            <!-- code alert popUp  -->
            <div v-if="this.showCodeAlert" class="alert text-center">
                <h5 class="text-uppercase py-3">Code Verification</h5>
                <h6>A code has been sent to your email...</h6>
                <input v-model="this.validationCode" class="code_inp" type="text" placeholder="Verification Code..." />
                <a @click="checkValidation" class="btn reset_btn d-flex justify-content-center">RESET</a>
                <p v-if="this.isCodeError" class="errCodeMsg">{{ this.errCodeMessage }}</p>

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Spinner from "../Spinner/Spinner.vue";

export default {
    name: "ResetPassView",
    components: { Spinner },
    data() {
        return {
            isLoading: false,
            showCodeAlert: false,
            email: "",
            code: "",
            isError: false,
            isCodeError: false,
            errMessage: "",
            errCodeMessage: "",
            verificationCode: "",
            validationCode: "",

        }
    },
    mounted() {
        this.isLoading = true,
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
    }, methods: {
        //generate verification code
        generateCode() {
            let code = "";
            const numbers = "0123456789";
            for (let i = 0; i < 6; i++) {
                code += numbers[Math.floor(Math.random() * 10)];
            }
            this.verificationCode = code;
            return code;
        },
        async sendResetEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isError = false;

            if (emailRegex.test(this.email)) {
                console.log('Valid email address');
                const code = this.generateCode();

                await axios.post(`http://localhost:3000/api/sendEmail/resetPassword`, {
                    receiver: this.email,
                    emailMessage:
                        `<div style={{ padding:5px"}}>
                        <img style={{"width:60%;height:150px;object-fit:contain";background:#fff"}} src="https://res.cloudinary.com/diyuy6jxe/image/upload/v1682528239/278719454_518845159791717_4455080078741522629_n_oxzucs.png")/>
                    <p>Dear Costumer,
<br/>
We received a request to reset your password. To proceed with resetting your password, please use the following verification code:
<br/>
<h2>Verification Code: <span style="font-weight:bold;font-size:larger">${code}</span></h2>
<br/>
Please follow these instructions to reset your password:
<ul>
<li>Go back to reset Password page.</li>
<li>Enter the verification code provided in this email.</li>
<li>Create a new password for your account.</li>
<li>Save the new password and use it to log in to your account.</li>
</ul>
If you did not initiate this password reset request, please contact our support team immediately at "EventogoSupport@gmail.com".

Thank you for your cooperation.
<br/>
Best regards,
<h4 style={{"font-weight:bold"}}>EVENTOGO TEAM</h4>
</p>
</div>`,

                    code: this.verificationCode
                })
                    .then((result) => {
                        console.log(result);
                        if (result.data.msg === "Email doesn't exist in our plateform !") {
                            this.isError = true;
                            this.errMessage = JSON.stringify(result.data.msg);
                        }
                        else if (result.data.msg === "Unexpected Error, please retry later!") {
                            this.isError = true;
                            this.errMessage = JSON.stringify(result.data.msg);
                        } else {
                            this.showCodeAlert = true;
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                this.isError = true;
                this.errMessage = 'Invalid email address';
            }
        },
        async checkValidation() {
            const result = await axios.get(`http://localhost:3000/api/user/getUser/${this.email}`);
            if (result.data.length > 0) {
                localStorage.setItem("id", JSON.stringify(result.data[0].id));
                console.log(result.data)
                if (result.data[0].verificationCode === this.verificationCode) {
                    location.href = `/changePassword`;
                } else {
                    this.isCodeError = true;
                    this.errCodeMessage = "Wrong verification code , please recheck !"
                }
            }
        }
    }
}
</script>

<style scoped>
.reset_container {
    height: calc(100vh - 75px);
}

.reset_div {
    width: 500px;
    max-width: 100%;
    text-align: center;
    margin: 20px auto;
    border: 2px solid #FDC006;
    border-radius: 10px;
    padding: 20px 5px;
    box-shadow: 0 0 10px #FDC006;
}

.reset_logo {
    width: 150px;
    height: 150px;
}

.title {
    font-size: 25px;
}

.email_inp {
    width: 70%;
    padding: 5px;
    margin-top: 20px;
    border: 2px solid black;
    font-size: 20px;
}

.submit_btn {
    width: 100px;
    background: #FDC006;
    border: none;
    margin: 10px auto;
    font-size: 18px;
    font-weight: bold;
}

.alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(243, 241, 241);
    box-shadow: 0 0 5px gray;
    min-width: 30%;
    min-height: 40%;
    animation: fadeIn .3s ease-in-out;
}

.errCodeMsg {
    color: red;
    font-size: 20px;
    text-align: center;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translate(-50%, -100%);
    }

    100% {
        opacity: 1;
        transform: translateY(-50%, -50%);
    }
}

.code_inp {
    min-width: 70%;
    padding: 5px;
    margin-top: 20px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 18px;
}

.reset_btn {
    width: 100px;
    background: orangered;
    color: white !important;
    border: none;
    margin: 10px auto;
    font-size: 18px;
    letter-spacing: 1px;
}

.errMsg {
    color: red;
    font-weight: bold;
    font-size: 20px;
}
</style>