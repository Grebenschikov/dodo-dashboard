import { WebSocketEvents } from './WebSocketProvider';

export default {
    setup() {
        WebSocketEvents.on('Version', (payload) => {
            const versionKey = 'version';

            let savedVersion = localStorage.getItem(versionKey);
            let serverVersion = payload;

            localStorage.setItem(versionKey, serverVersion);

            if (!savedVersion) {
                return;
            }

            if (savedVersion !== serverVersion) {
                document.location.reload();
            }
        })
    },
};