<template>
  <div class='item-money' :class='{ bad: revenue.percentIncrease < 0 }'>
      <div class='item-money-left'>
        <div class='title-badge' v-text="title"></div>
        <div class='main-value primary' v-text='moneyStr'></div>
        <div class='sub-value secondary' v-if="!isImbedded" v-text='subMoneyStr'></div>
      </div>
      <div class='item-money-right' v-if='revenue.percentIncrease' :class='{ bad: revenue.percentIncrease < 0 }'>
        <span v-text='percentageDeltaStr'></span>
        <svg v-if='revenue.percentIncrease < 0' width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.268 24C14.0378 25.3333 15.9622 25.3333 16.732 24L28.8564 3C29.6262 1.66666 28.664 0 27.1244 0H2.87564C1.33604 0 0.373793 1.66667 1.14359 3L13.268 24Z" fill="#FE6E42"/>
        </svg>
        <svg v-else width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.268 0.999998C14.0378 -0.333335 15.9622 -0.333333 16.732 1L28.8564 22C29.6262 23.3333 28.664 25 27.1244 25H2.87564C1.33604 25 0.373793 23.3333 1.14359 22L13.268 0.999998Z" fill="#B9FA00"/>
        </svg>
      </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    props: {
        title: String,
        revenue: {
            type: Object,
            default: () => ({}),
        },
        isImbedded: Boolean
    },
    setup(props) {
        const usdFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        const rubFormatter = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        });
        const moneyStr = computed(() => usdFormatter.format(props.revenue.revenueUsd || 0));
        const subMoneyStr = computed(() => {
            let value = Math.floor(props.revenue.revenueRub || 0) / 1000000;
            let unit = 'mln';
            if (value >= 1000) {
                value /= 1000;
                unit = 'bln';
            }
            const formatted = rubFormatter.format(value);
            const num = formatted.substring(0, formatted.length - 2);
            return `₽${num} ${unit}`;
        });
        const percentageDeltaStr = computed(() => {
            return (props.revenue.percentIncrease < 0 ? '' : '+')
                + parseInt(props.revenue.percentIncrease) + '%'; 
        })
        return { moneyStr, subMoneyStr, percentageDeltaStr };
    }
});
</script>

<style lang="scss">
@import "../../utilities/_mediaBreakpoints.scss";

.item-money {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    margin-right: 150px;

    .item-money-right {
        padding-left: 16px;
        padding-top: 96px;
        font-size: 40px;
        font-weight: 400;
        line-height: 45px;
        color: #B9FA00;
        &.bad { color: #FF6E42; }

        svg {
            margin-left: 12px;
        }
    }
    .title-badge {
        display: inline-block;
        font-weight: 500;
        font-size: 36px;
        letter-spacing: 1.5px;
        margin-bottom: 20px;

        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.3);
    }
    .main-value {
        margin-bottom: 24px;
    }
}

.embedded .item-money {
    margin-right: 1.17rem;

    @media (max-width: $mobile-width) {
        margin: .78rem;
    }   

    .title-badge {
        font-size: .28rem;
        letter-spacing: .5px;

        @media (max-width: $mobile-width) {
            font-size: 1rem;
        }
    }
    .title-badge {
        margin-bottom: .16rem;
    }
    .item-money-right {
        padding-left: .13rem;
        padding-top: .75rem;
        font-size: .31rem;
        line-height: .35rem;

        @media (max-width: $mobile-width) {
            font-size: .78rem;
            line-height: .86rem;
            display: flex;
            align-items: center;
        }

        svg {
            margin-left: .1rem;
            width: .3rem;
            height: .3rem;
            margin-bottom: 0.05rem;

            @media (max-width: $mobile-width) {
                height: .78rem;
                width: .78rem;
                margin-left: .23rem;
            }
        }
    }
}
</style>