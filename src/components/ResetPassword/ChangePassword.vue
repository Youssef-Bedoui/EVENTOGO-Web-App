<template>
  <div class="container">
    <!-- loading spinner  -->
    <div v-if="isLoading">
      <Spinner/>
    </div>

    <div v-if="this.isLoading===false" class="updatePass_container">
      <h1 class="text-center my-5">Update Password</h1>
      <form>
        <h6 class="font-weight-bold text-right">Password length should but al least 6 *</h6>
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input type="password" class="form-control" id="newPassword" v-model="newPassword">
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
        </div>
        <button class="btn btn-primary submit_btn" @click.prevent="updatePassword()">
          Update Password
        </button>
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
  components:{Spinner},
  data() {
    return {
      isLoading:false,  
      newPassword: "",
      confirmPassword: "",
      userId: null,
      showModal: false,
      modalText: "",
      alertStyle: ""
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("id"));
    this.isLoading=true;
    setTimeout(() => {
      this.isLoading=false;
    }, 1000);

  },
  methods: {
    async updatePassword() {
      if (this.newPassword === this.confirmPassword && this.newPassword.length >= 6 && this.confirmPassword.length >= 6) {
        try {
          await axios.patch(`http://localhost:3000/api/user/update/${this.userId}`, { password: this.newPassword });
          this.alertStyle = "success";
          this.showModal = true;
          this.modalText = "Password updated successfully!";
          setTimeout(() => {
            this.showModal = false;
            location.href = "/signIn";
            localStorage.clear();
          }, 3000);
        } catch (error) {
          this.alertStyle = "fail";
          this.showModal = true;
          this.modalText = "An error occurred, please retry!";
          setTimeout(() => {
            this.showModal = false;
            location.href = "/resetPassword";
            localStorage.clear();
          }, 3000);
        }
      } else {
        this.alertStyle = "warn";
        this.modalText = "Passwords do not match or are less than 6 characters long!";
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.updatePass_container {
  width: 40%;
  margin: 40px auto;
  height: calc(100vh - 75px);
}

.submit_btn {
  width: 100%;
  margin: 10px auto;
}

.modal_back {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.267);
  backdrop-filter: blur(2px);
}

.success_alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 30%;
  height: fit-content;
  padding: 30px 10px;
  text-align: center;
  border-radius: 10px;
  animation: fadeIn .3s ease-in-out;
}

.success {
  background: rgb(243, 241, 241);
  box-shadow: 0 0 5px gray;
}

.fail {
  background: rgba(219, 41, 41, 0.774);
  box-shadow: 0 0 5px rgb(255, 0, 0);
  color: white;
}

.warn {
  background: rgba(255, 169, 9, 0.795);
  box-shadow: 0 0 5px rgb(255, 196, 0);
  color: white;
}

.success_alert h1 {
  font-size: 25px;
  font-weight: bold;
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


@media (max-width: 460px) {
  .updatePass_container {
    width: 100%;
  }
}
</style>
