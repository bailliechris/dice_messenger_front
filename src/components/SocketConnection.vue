<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <b-button @click="login">Login</b-button>
    <b-button @click="logout">Logout</b-button>
    <b-button @click="ws_send('hello from button press')">Send Message</b-button>
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
            ws: null
        }
    },
    watch: {
        ws: function() {
            this.ws.onmessage = (event) =>  {
                console.log("Received a message");
                this.socketMessage = event.data;
            }

            this.ws.onopen = (event) => {
                console.log("Talking to server");
                this.socketMessage = event.data;
                this.ws.send("Hi from client");
            }
        }
    },
    created() {
        // Initialise the ws connection
        console.log("Starting connection to WebSocket Server");
        this.ws = new WebSocket('ws://localhost:3000');
    },

    methods: {
        login: async function () {
            axios.get(`http://localhost:3000/login`)
            .then((res) => {
                this.socketMessage = res.data.message;
            })
            .catch((e) => {
                this.socketMessage = e;
            })
        },
        logout: async function () {
            axios.get(`http://localhost:3000/logout`)
            .then((res) => {
                this.socketMessage = res.data.message;
            })
            .catch((e) => {
                this.socketMessage = e;
            })
        },
        ws_send: function (message) {
            this.socketMessage = 'Sending Hello!';
            this.ws.send(message);
        }
    }
}
</script>