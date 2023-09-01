<template>
    <ItemMoney title='sales this year' :revenue='money.thisYear' :isImbedded='isImbedded' :class="'big-number'"/>
    <div class="item-row">        
        <ItemMoney title='this month' :revenue='money.thisMonth' :isImbedded='isImbedded' :class="'hide-in-mobile'" />
        <ItemMoney title='today' :revenue='money.today' :isImbedded='isImbedded' :class="'money-day'"/>
        <ItemOrdersPerMinute :ordersPerMinute='money.ordersPerMinute' />
    </div>
</template>

<script>
import { defineComponent, computed, inject } from 'vue'
import { StatsStateSymbol } from '../StatsProvider.js'
import ItemMoney from './ItemMoney.vue'
import ItemOrdersPerMinute from './ItemOrdersPerMinute.vue'

export default defineComponent({
    components: {
        ItemMoney,
        ItemOrdersPerMinute,
    },
    props: {
      isImbedded: Boolean
    },
    setup() {
        const stats = inject(StatsStateSymbol);
        const money = computed(() => stats.moneyOrders || {});
        return { money };
    }
});
</script>

<style lang="scss">
@import "../../utilities/_mediaBreakpoints.scss";

.item-row {
    display: flex;
    flex-direction: row;
}

.big-number{
    
    &>div>.primary {
        font-size: 190px;
        line-height: 234px;
        letter-spacing: 2px;
    }

    &>div>.secondary {
        font-size: 72px;
        line-height: 86px;
    }

    &>.item-money-right {
        padding-top: 145px;
    }

    &>div>.title-badge {
        font-size: 56px;
        line-height: 68px;
        letter-spacing: 1.5px;
    }

}

.embedded {
    .item-row {
        @media (max-width: $mobile-width) {
            width: 100%;
            justify-content: space-around;
        }
    }
    .big-number {
        .title-badge {
            font-size: .44rem;
            line-height: .53rem;

            @media (max-width: $mobile-width) {
                font-size: 1.17rem;
                line-height: 1.33rem;
            }
        }
        .primary {
            font-size: 1.48rem;
            line-height: 1.83rem;
            
            @media (max-width: $mobile-width) {
                font-size: 3.13rem;
                line-height: 3.9rem;
            }
        }

        &>.item-money-right {
            padding-top: 0;
            padding-bottom: 1.2rem;
            display: flex;
            align-items: flex-end;

            @media (max-width: $mobile-width) {
                padding-bottom: 2.25rem;
            }
        }
    }
    .money-day {
        @media (max-width: $mobile-width) {
            width: 50%;
        }
    }
}
</style>