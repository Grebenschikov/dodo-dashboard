<template>
  <div class='item-orders'>
    <div class='title-badge'><span>orders per min</span><span class='hide-in-mobile'>ute</span></div>
    <div class='orders-details'>
        <div class='orders-per-minute primary' v-text='ordersPerMinute'></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        ordersPerMinute: Number,
    },
});
</script>

<style lang="scss">
@import "../../utilities/_mediaBreakpoints.scss";

.item-orders {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #FFF;

    .title-badge {
        display: inline-block;
        font-weight: 500;
        font-size: 36px;
        letter-spacing: 1.5px;
        margin-bottom: 20px;
        text-transform: uppercase;
        color: hsla(0,0%,100%,.3);
    }
    .orders-details {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        > .orders-per-minute {
            margin-right: 32px;
        }
    }
}
.embedded .item-orders {
    justify-content: flex-end;

    @media (max-width: $mobile-width) {
        width: 50%;
        margin: .78rem;
    }
    
    .title-badge {
        font-size: .28rem;
        margin-bottom: .16rem;
        letter-spacing: .5px;

        @media (max-width: $mobile-width) {
            font-size: 1rem;
        }
    }
}
</style>