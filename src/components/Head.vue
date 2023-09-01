<template>
    <div id='head-container'>
        <span id='current-timestamp' v-text='nowStr'></span>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const nowStr = ref('')
        const dateOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }
        setInterval(() => {
            nowStr.value = new Date().toLocaleString('en-GB', dateOptions)
        }, 1000)
        return { nowStr }
    },
})
</script>

<style lang="scss" scoped>
    #head-container {
        position: fixed;
        right: 128px;
        display: flex;
        align-items: flex-end;
        justify-content: end;
        z-index: 1;
        pointer-events: none;

        svg {
            z-index: 1;
        }
    }
    #current-timestamp {
        font-size: 48px;
        font-weight: 500;
        letter-spacing: 1.5px;
        opacity: 0.3;
    }
</style>