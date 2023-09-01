import { EventEmitter } from 'events'
export const WebSocketEvents = new EventEmitter

export default {
    setup() {
        let ws = connectToWebSocket();
        function connectToWebSocket() {
            let wsClient;

            const reconnect = () => setTimeout(() => {
                console.info('Trying to reconnect....');
                ws = connectToWebSocket();
                if (!ws) reconnect();
            }, 2000);

            try {
                wsClient = new WebSocket('wss://realtime.dodobrands.io/ws');
            } catch (e) { return; }

            wsClient.onopen = function (e) {
                console.info('[WebSocket] OPENED');
                console.info(e);
            }
            wsClient.onmessage = function (e) {
                const { type, payload: payload } = JSON.parse(e.data);
                WebSocketEvents.emit(type, payload)
            }
            wsClient.onclose = function (e) {
                console.info('[WebSocket] CLOSED');
                console.info(e);
                ws = null;
                reconnect();
            }
            return wsClient;
        }
    },
    render() {
        return this.$slots.default();
    }
};