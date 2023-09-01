<template>
    <div class='stats-container' :class='mode'>
        <div class='stats-row stats-row-global'>
        <StatsRowGlobal />
        </div>
        <div class='stats-row stats-row-money'>
        <StatsRowMoneyOrders :isImbedded='isImbedded' />
        </div>
        <PointLegend v-if="!isImbedded" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, inject, watch } from 'vue'
import { StatsUpdateSymbol } from './StatsProvider.js'
import StatsRowMoneyOrders from './Stats/RowMoneyOrders.vue'
import StatsRowGlobal from './Stats/RowGlobal.vue'
import PointLegend from './PointLegend.vue'

export default defineComponent({
    components: {
        StatsRowMoneyOrders,
        StatsRowGlobal,
        PointLegend,
    },
    props: {
        isImbedded: Boolean
    },
    setup(props) {
        const mode = ref('A');
        const updateStats = inject(StatsUpdateSymbol);

        let t;        
        onMounted(() => {
            t = setInterval(() => {
                mode.value = mode.value === 'A' ? 'B' : 'A';
            }, 10000);
            updateStats();
        });

        

        onUnmounted(() => clearInterval(t));

        watch(props, () => {
            if (props.isImbedded) {
                mode.value = 'A';
                clearInterval(t);
            }
        });

        return { mode };
    }
});
</script>

<style lang="scss">
@import "../utilities/_mediaBreakpoints.scss";
.stats-container {
    position: relative;
    display: flex;
    flex: 1;

    &.A .stats-row.stats-row-global,
    &.B .stats-row.stats-row-money {
        filter: blur(10px);
        transform: translateX(-500px);
        opacity: 0;
    }
}
.stats-row {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0; left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    transform: translateX(0);
    opacity: 1;
    z-index: 999;

    transition: filter .7s ease, transform .8s ease .1s, opacity 1s ease;
}
.embedded {
    .stats-row {
        @media (max-width: $mobile-width) {
            justify-content: flex-end;
        }
    }
}
</style>