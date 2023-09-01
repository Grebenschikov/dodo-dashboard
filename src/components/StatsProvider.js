import axios from 'axios';
import { provide, reactive, readonly } from 'vue';
import statisticsToDataPairs from '../mappers/statisticsToDataPairs'
import { WebSocketEvents } from './WebSocketProvider';

export const StatsStateSymbol = Symbol('Stats provider state key');
export const StatsUpdateSymbol = Symbol('Stats provider update key');

export default {
    setup() {
        const state = reactive({
            global: {},
            moneyOrders: {},
        });
        const update = async () => {
            const response = await axios.get('https://notnet.package.su/api/Statistics');
            if (response.status !== 200) {
                console.error(response);
                return;
            }
            const { global, moneyOrders } = statisticsToDataPairs(response.data);
            state.global = global;
            state.moneyOrders = moneyOrders;

            WebSocketEvents.on('Statistics', (payload) => {
                const { global, moneyOrders } = statisticsToDataPairs(payload);
                state.global = global;
                state.moneyOrders = moneyOrders;
            })
        };
    provide(StatsUpdateSymbol, update);
    provide(StatsStateSymbol, readonly(state));
  },
  render() {
    return this.$slots.default();
  },
};