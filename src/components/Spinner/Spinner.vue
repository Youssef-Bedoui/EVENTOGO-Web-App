<template>
    <!-- loading spinner -->
    <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: "SpinnerView"
}
</script>

<style scoped>
.lds-ring {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 10%;
    width: 100%;
    height: 100vh;
}

.lds-ring div {
    box-sizing: border-box;
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 8px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ff9900 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>