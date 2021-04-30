<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <b-button @click="login">Login</b-button>
    <b-button @click="logout">Logout</b-button>
    <b-button @click="ws_send">Send Message</b-button>
    <b-button @click="init_websocket">Start WebSocket</b-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SocketConnection',
    data() {
        return {
            isConnected: false,
            socketMessage: 'nothing to display',
            amount:0,
            ws: {}
        }
    },
    created() {
        this.ws = new WebSocket(`wss://localhost:3000`);
    },

    methods: {
        init_websocket: function () {
            if (this.ws) {
                this.ws.onerror = this.ws.onopen = this.ws.onclose = null;
                this.ws.close();
            }
            
            this.ws.onerror = () => {
                this.socketMessage = "WebSocket Connection Error";
            };
                
            this.ws.onopen = () => {
                this.socketMessage = 'WebSocket connection established';
            };

            this.ws.onclose = () => {
                this.socketMessage = 'WebSocket connection closed';
                this.ws = null;
            };
        },
        login: async function () {
            axios.get(`http://localhost:3000/login`)
            .then((res) => {
                this.socketMessage = res.message;
            })
            .catch((e) => {
                this.socketMessage = e;
            })
        },
        logout: async function () {
            axios.get(`http://localhost:3000/logout`)
            .then((res) => {
                this.socketMessage = res.message;
            })
            .catch((e) => {
                this.socketMessage = e;
            })
        },
        ws_send: async function () {
            if (!this.ws) {
                this.socketMessage = 'No WebSocket connection';
                return;
            }

            this.ws.send('Hello World!');
            this.socketMessage = 'Sent "Hello World!"';
        },
    }
}
</script>