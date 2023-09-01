<template>
    <div class='item-count'>
        <div class="icon-bg" :class='icon'>
            <IconDodopizza v-if="icon === 'dodopizza'" />
            <IconDrinkit v-if="icon === 'drinkit'" />
            <IconDoner42 v-if="icon === 'doner42'" />
            <IconFace v-if="icon === 'face'" />
            <IconLocationPin v-if="icon === 'location-pin'" />
            <IconFlag v-if="icon === 'flag'" />
        </div>
        <div class='item-data-pair' v-for="(pair, i) of dataPairs" :key="icon + '_' + i">
            <div class='data-value' v-text='pair.value'></div>
            <div class='data-title' v-text='pair.title'></div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import IconDodopizza from '../../svg/dodopizza.vue'
import IconDrinkit from '../../svg/drinkit.vue'
import IconDoner42 from '../../svg/doner42.vue'
import IconFace from '../../svg/face.vue'
import IconLocationPin from '../../svg/location-pin.vue'
import IconFlag from '../../svg/flag.vue'

export default defineComponent({
    components: {
        IconDodopizza,
        IconDrinkit,
        IconDoner42,
        IconFace,
        IconLocationPin,
        IconFlag,
    },
    props: {
        icon: String,
        dataPairs: Array, // [{ title: 'countries', value: 15 }]
    },
    setup() {},
})
</script>

<style lang="scss" scoped>
.item-count {
    display: flex;
    align-items: center;
    margin-right: 150px;

    &:first-child {
        margin-left: 0px;
    }

    .item-data-pair {
        margin-right: 64px;
        &:last-child {
            margin-right: 0;
        }
    }
    .icon-bg {
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 40px;
        margin-right: 48px;
        overflow: hidden;

        &.dodopizza {
            background: linear-gradient(180deg, #FF9417 0%, #FF6900 100%);
        }
        &.drinkit {
            background: #0779FF;
        }
        &.doner42 {
            background: #FFDA00;
        }
    }
    .data {
        &-value {
            font-style: normal;
            font-weight: 500;
            letter-spacing: 2px;
            font-size: 100px;
            margin-bottom: 8px;
        }
        &-title {
            font-style: normal;
            font-weight: 500;
            font-size: 36px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, .3);
        }
    }
}
</style>