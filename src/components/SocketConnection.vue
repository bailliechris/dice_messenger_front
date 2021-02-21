<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="clickButton()">Press Me</button>
  </div>
</template>

<script>
export default {
    name: 'SocketConnection',
    data() {
        return {
            isConnected: false,
            socketMessage: '',
            amount:0
        }
    },

    sockets: {
        connect: function () {
            console.log('socket connected')
            this.sockets.subscribe('chatMessage', (data) => {
                this.socketMessage = data;
            });
        },
        chatMessage: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
            this.socketMessage = data;
        }
    },
    methods: {
        clickButton: function () {
            // $socket is socket.io-client instance
            this.amount = this.amount + 1
            this.$socket.emit('chatMessage', this.amount)
        }
    }

}
</script>