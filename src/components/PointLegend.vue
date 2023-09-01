<template>
    <div class="point-legend-container">
        <div class='point-legend'></div>
        <span>orders in real-time</span>
    </div>
</template>

<style lang="scss" scoped>
@keyframes pulse-ring {
  0% {
    transform: scale(0.33);
    opacity: .7;
  }
  40%, 50%, 100% {
    opacity: 0;
  }
}

@keyframes pulse-dot {
  0% { transform: scale(1); }
  25% { transform: scale(1.7); }
  50% { transform: scale(1); }
  100% { transform: scale(1); }
}
.point-legend-container {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
}
.point-legend-container {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(166, 164, 255, 0.1);
    backdrop-filter: blur(8px);
    padding: 25px 56px;
    border-radius: 32px;

    > span {
        position: relative;
        top: 0px;
        display: inline-block;
        position: relative;
        top: 1px;
        margin-left: 48px;
        font-weight: 500;
        font-size: 36px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        opacity: 0.5;
    }
}
.point-legend {
    width: 8px;
    height: 8px;
    border-radius: 100px;
    z-index: 999;
    transform: scale(2, 2);

    &:after {
        content: "";
        position: absolute;
        display: block;
        top: 0; left: 0;
        width: 100%; height: 100%;
        opacity: .7;
        border-radius: 100px;
        transition: opacity .2s ease;
        background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 19.59%, #FFFFFF 84.63%);
        box-shadow: 0px 0px 8px 3px rgba(255, 255, 255, 0.5);
        opacity: 1;
        animation: pulse-dot 4s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
    }

    &:before {
        content: "";
        position: relative;
        display: block;
        width: 700%;
        height: 700%;
        box-sizing: border-box;
        margin-left: -300%;
        margin-top: -300%;
        border-radius: 100px;
        background: #FFFFFF;
        animation: pulse-ring 4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
}
</style>