import axios from 'axios';
import { provide, reactive, ref, onMounted, readonly } from 'vue';
import { WebSocketEvents } from './WebSocketProvider';

export const pointIdOf =
    ({ brand, coordinates: { latitude, longitude } }) => `${latitude};${longitude};${brand}`;

export const PointsStateSymbol = Symbol('Points provider state key');

export default {
    setup() {
        const blinkInt = ref(0);
        const state = reactive({
            points: {
                '53.144074;29.230685;Dodopizza': {
                    "brand": "Dodopizza",
                    "coordinates": {
                        "latitude": 53.144074,
                        "longitude": 29.230685
                    },
                    "lastOrder": new Date(),
                },
            },
        });

        WebSocketEvents.on('NewOrder', (payload) => {
            const id = pointIdOf(payload);
            state.points[id] = state.points[id] || { ...payload };
            state.points[id].lastOrder = new Date();
        })

        async function update() {
            const response = await axios.get('https://notnet.package.su/api/Localities');
            if (response.status !== 200) {
                console.error(response);
                return;
            }
            for (const p of response.data) {
                const id = pointIdOf(p);
                state.points[id] = p;
            }
            blinkInt.value++;
        }

        onMounted(async () => {
            await update();
        });

        provide(PointsStateSymbol, readonly(state));
    },
    render() {
        return this.$slots.default();
    },
};