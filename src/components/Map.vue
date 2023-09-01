<template>
  <div id="map-canvas">
    <div id="map"></div>
    <div id="map-points">
      <div
        class="point"
        v-for="p of mapPoints"
        :id="'point-' + p.id"
        :class="p.brand + (p.isBlink ? ' blink' : '')"
        :style="`top:${p.y}px;left:${p.x}px;`"
        :key="p.renderId"
      ></div>
    </div>
  </div>
</template>

<script>
import { PointsStateSymbol } from "./PointsProvider";
import { defineComponent, ref, onMounted, computed, inject, watch } from "vue";
import { mobileWidth } from '../utilities/_mediaBreakpoints.scss';


export default defineComponent({
  props: {
    isImbedded: Boolean
  },
  setup(props) {
    const state = inject(PointsStateSymbol);
    const mapViewRefreshId = ref(0);
    const MAP = ref(null);
    let focusParams = { scale: 1, x: 0.95, y: 0.5 };
    let initIntervalId;

    onMounted(() => {
      initIntervalId = setInterval(() => {
        if (MAP.value || !document.body.style.zoom) return;
        MAP.value = new window.jvm.Map({
          container: window.$("#map"),
          map: "world_mill_en",
          backgroundColor: "transparent",
          zoomMin: 1.2,
          focusOn: focusParams,
          regionStyle: {
            initial: {
              fill: "rgba(21, 25, 40, 1)",
              "fill-opacity": 1,
              stroke: "rgba(21, 25, 40, 1)",
              "stroke-width": 0.4,
              "stroke-opacity": 0.8,
              cursor: "default",
            },
            hover: {
              "fill-opacity": 0.85,
              cursor: "default",
            },
          },
          onViewportChange() {
            mapViewRefreshId.value++;
          },
        });
        initIntervalId = clearInterval(initIntervalId);
      }, 100);
    });

    watch(props, () => {
        if (props.isImbedded) {
            const cssMobileWidth = parseInt(mobileWidth.slice(0, -2));
            if (window.innerWidth <= cssMobileWidth) {
                focusParams = { scale: 5.8, x: 0.54, y: 0.42 };
            }
        }
    });

    const mapPoints = computed(() => {
      if (!MAP.value) return [];
      const points = [];
      const now = +new Date;
      for (const id in state.points) {
        const p = state.points[id];
        const renderId =
          mapViewRefreshId.value +
          p.brand +
          "_" +
          p.coordinates.latitude +
          "_" +
          p.coordinates.longitude;
        const point = MAP.value.latLngToPoint(
          p.coordinates.latitude,
          p.coordinates.longitude
        );
        points.push({
          id, renderId,
          brand: p.brand.toLowerCase(),
          isBlink: p.lastOrder && (+p.lastOrder + 2000) > now,
          ...point,
        });
      }
      return points;
    });

    return { mapPoints };
  },
});
</script>

<style lang='scss'>
@import "../utilities/_mediaBreakpoints.scss";
@keyframes pulse-ring {
  0% {
    transform: scale(0.33);
    opacity: .7;
  }
  80%,
  100% {
    opacity: 0;
  }
}
@keyframes pulse-dot {
  0% { transform: scale(1) }
  50% { transform: scale(1.7) }
  100% { transform: scale(1) }
}
.point {
  --pointSize: 8px;
  --pointSpread: .023rem;
}
.embedded {
  .point{
    --pointSize: .06rem;
    @media (max-width: $mobile-width) {
      --pointSize: .35rem;
      --pointSpread: .04rem;
    }
  }
  #map-canvas {
    top: .16rem;
  }
  #map-canvas::after {
    @media (max-width: $mobile-width) {
      background: none;
    }
  }
  #map-points {
    margin-top: -0.04rem;
    margin-left: -0.04rem;
  }
}
#map-canvas {
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
#map-canvas::after {
  content: " ";
  background: linear-gradient(90deg, #07070A 0%, rgba(7, 7, 10, 0) 30%);
  position: relative;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
}
#map,
#map-points {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#map {
  .jvectormap-container {
    opacity: 0.9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    > div {
      display: none;
    }
  }
}
#map-points {
  pointer-events: none;
  margin-top: -5px;
  margin-left: -5px;

  .point {
    position: absolute;
    width: var(--pointSize);
    height: var(--pointSize);
    border-radius: 50%;
    z-index: 999;

    &.dodopizza {
      z-index: 1;
      &:after {
        background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 19.59%, #FF6900 84.63%);
        box-shadow: 0px 0px var(--pointSize) var(--pointSpread) rgba(255, 105, 0, 0.5); }
    }
    &.drinkit {
      z-index: 2;
      &:after {
        background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 19.59%, #3B8EDE 84.63%);
        box-shadow: 0px 0px var(--pointSize) var(--pointSpread) rgba(59, 142, 222, 0.5); }
    }
    &.doner42 {
      z-index: 3;
      &:after {
        background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 19.59%, #FFDA00 84.63%);
        box-shadow: 0px 0px var(--pointSize) var(--pointSpread) rgba(255, 218, 0, 0.5); }
    }

    &:after {
      content: "";
      position: absolute;
      display: block;
      top: 0; left: 0; width: 100%; height: 100%;
      opacity: .7;
      border-radius: 100px;
      transition: opacity .2s ease;
    }
    &.blink:after {
      opacity: 1;
      animation: pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s forwards;
    }

    &.blink.dodopizza:before { background: #FF6900; }
    &.blink.drinkit:before { background: #3B8EDE; }
    &.blink.doner42:before { background: #FFDA00; }
    &.blink:before {
      content: "";
      position: relative;
      display: block;
      width: 700%;
      height: 700%;
      box-sizing: border-box;
      margin-left: -300%;
      margin-top: -300%;
      border-radius: 50%;
      animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
    }
  }
}
</style>