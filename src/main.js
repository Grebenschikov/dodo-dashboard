import App from './App.vue'
import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: App,
        },
    ],
});

const app = createApp(App).use(router).mount('#app')

window.onload = () => {
    if (app.isImbedded)
        return;

    const zoomFactor = window.innerWidth / 3840;
    console.log( { zoomFactor } );
    if (zoomFactor < .9 || zoomFactor > 1.1) {
        document.body.style.zoom = zoomFactor;
        document.body.onclick = toggleFullsreenMode;
    }
}

function fullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
    }
}

function fullScreenExit () {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}

function toggleFullsreenMode() {
    if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
    ) {
        fullScreen()
    } else {
        fullScreenExit()
    }
}