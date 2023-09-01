<template>
    <div class="item-col">
        <ItemCount :icon="'dodopizza'" :dataPairs="stats.global.dodopizza" />
        <ItemCount :icon="'drinkit'" :dataPairs="stats.global.drinkit" />
        <ItemCount :icon="'doner42'" :dataPairs="stats.global.doner42" />
    </div>
    <div class="item-row">        
        <ItemCount :icon="'face'" :dataPairs="stats.global.people" />
        <ItemCount :icon="'location-pin'" :dataPairs="stats.global.units" />
        <ItemCount :icon="'flag'" :dataPairs="stats.global.countries" />
    </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { StatsStateSymbol } from '../StatsProvider.js'
import ItemCount from './ItemCount.vue'



export default defineComponent({
    components: {
        ItemCount,
    },
    setup() {
        const stats = inject(StatsStateSymbol);
        return { stats };
    }
});
</script>

<style>
.item-col > .item-count {
    margin-bottom: 150px;
}
</style>