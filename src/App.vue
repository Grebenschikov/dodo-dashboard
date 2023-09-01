<template>
    <WebSocketProvider>
        <PointsProvider>
            <Map :isImbedded="isImbedded"/>
            <Head v-if="!isImbedded" />
            <StatsProvider>
                <StatsContainer :isImbedded="isImbedded"/>
            </StatsProvider>
        </PointsProvider>
        <VersionProvider />
    </WebSocketProvider>
</template>

<script>
import WebSocketProvider from './components/WebSocketProvider.js';
import VersionProvider from './components/VersionProvider.js';
import Head from './components/Head.vue';
import Map from './components/Map.vue';
import PointsProvider from './components/PointsProvider.js';
import StatsProvider from './components/StatsProvider.js';
import StatsContainer from './components/StatsContainer.vue';

export default {
  name: 'App',
  components: {
    WebSocketProvider,
    VersionProvider,
    Head,
    Map,
    PointsProvider,
    StatsProvider,
    StatsContainer,
  },
  computed: {
    isImbedded() {
      return this.$route.query.imbedded === 'true';
    }
  },
  watch: {
    isImbedded() {
      if (this.isImbedded) {
        document.body.style.zoom = 1;
        document.documentElement.style.fontSize = '3.3vw';
        this.$el.parentElement.classList.add("embedded");
      }
    }
  }
}
</script>

<style lang="scss">
@import "./utilities/_mediaBreakpoints.scss";
// @font-face {
//     font-family: 'Helvetica Neue';
//     font-weight: 500;
//     src: url('./fonts/Helvetica-Neue/HelveticaNeueCyr-Medium.eot');
//     src: local('Helvetica Neue Medium'), url('./fonts/Helvetica-Neue/HelveticaNeueCyr-Medium.eot') format('embedded-opentype'),
//          url('./fonts/Helvetica-Neue/HelveticaNeueCyr-Medium.woff2') format('woff2'),
//          url('./fonts/Helvetica-Neue/HelveticaNeueCyr-Medium.woff') format('woff'),
//          url('./fonts/Helvetica-Neue/HelveticaNeueCyr-Medium.ttf') format('truetype');
// }
// @font-face {
//     font-family: 'PT Mono';
//     font-weight: 400;
//     src: url('./fonts/PT-Mono/PTMonoRegular.eot');
//     src: local('PT Mono'), url('./fonts/PT-Mono/PTMonoRegular.eot') format('embedded-opentype'),
//          url('./fonts/PT-Mono/PTMonoRegular.woff2') format('woff2'),
//          url('./fonts/PT-Mono/PTMonoRegular.woff') format('woff'),
//          url('./fonts/PT-Mono/PTMonoRegular.ttf') format('truetype'),
//          url('./fonts/PT-Mono/PTMonoRegular.svg#PTMonoRegular') format('svg');
// }
// @font-face {
//     font-family: 'PT Mono';
//     font-weight: 700;
//     src: url('./fonts/PT-Mono/PTMonoBold.eot');
//     src: local('PT Mono Bold'), url('./fonts/PT-Mono/PTMonoBold.eot') format('embedded-opentype'),
//          url('./fonts/PT-Mono/PTMonoBold.woff2') format('woff2'),
//          url('./fonts/PT-Mono/PTMonoBold.woff') format('woff'),
//          url('./fonts/PT-Mono/PTMonoBold.ttf') format('truetype'),
//          url('./fonts/PT-Mono/PTMonoBold.svg#PTMonoBold') format('svg');
// }
* {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
  background: rgba(7, 7, 10, 1);
  overflow: hidden;
}
.spacer {
  flex-grow: 1;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  min-height: 100vh;
  padding: 128px 128px 256px;
  position: fixed;
  inset: 0;
}
.primary {
    font-weight: 500;
    font-size: 100px;
    line-height: 128px;
    letter-spacing: 2px;
    margin-bottom: 24px;
    text-transform: uppercase;
}
.secondary {
    font-style: normal;
    font-weight: normal;
    font-size: 56px;
    color: rgba(255, 255, 255, 0.3);
}
.embedded {
    &#app {
        padding: 1rem 1rem 2rem;

        @media (max-width: $mobile-width) {
            padding: .78rem;
        }
    }
    .primary {
        font-size: .78rem;
        line-height: 1rem;
        margin-bottom: .19rem;

        @media (max-width: $mobile-width) {
            font-size: 2.34rem;
            line-height: 3.13rem;
        }
    }
    @media (max-width: $mobile-width) {
        .hide-in-mobile {
            display: none;
        }
    }
}
</style>