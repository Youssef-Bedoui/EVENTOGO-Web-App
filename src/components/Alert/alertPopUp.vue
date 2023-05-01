<template>
    <div v-if="visible" class="alert-modal">
        <div class="alert-modal-content">
            <span class="close" @click="close">&times;</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="orangered" class="bi bi-exclamation-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            <p class="text-dark font-weight-bold pt-4 pb-2">{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "alertView",
    props: {
        visible: {
            default: false
        },
        message: {
            required: true
        },
        close: {
            required: true
        }
    },
    data() {
        return {
            alertVisible: this.visible
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.modal_back {}

.alert-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.384);
    background-color: rgba(0, 0, 0, 0.267);
    backdrop-filter: blur(2px);
}

.alert-modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    max-width: 300px;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    animation: fade .3s ease-in-out;
}

@keyframes fade {
    0% {
        opacity: 0;
        transform: translate(-50%, -100%);
    }

    100% {
        opacity: 1;
        transform: translateY(-50%, -50%);
    }
}


.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
</style>