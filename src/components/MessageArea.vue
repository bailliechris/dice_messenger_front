<template>
  <div>
    <div v-if="name">
      <Post
        v-for="post in all_posts"
        v-bind:key="post.time"
        v-bind:post="post"
      ></Post>
      <h1>What would you like to say?</h1>
      <b-field label="Message">
          <b-input v-model="msg_send"></b-input>
      </b-field>
      <section>
        <b-button @click="ws_send">Send</b-button>
      </section>
      <section class="box">
        <p>Users Connected:</p>
        <p v-for="(name, index) in all_users"
        v-bind:key="index"
        >{{ name }}</p> 
      </section>
    </div>
    <div v-else>
      <h1>Please add your name:</h1>
      <b-field label="Name">
          <b-input v-model="temp_name"></b-input>
      </b-field>
      <section>
          <b-button @click="confirm_name">NEXT!</b-button>
      </section>    
    </div>    
  </div>
</template>

<script>
import Post from './Post';

export default {
  name: 'MessageArea',
  components: {
    Post
  },
  data() {
    return{
      name: "",
      temp_name: "",
      msg_send: "",
      all_posts: [],
      all_users: [],
      ws: null
    }
  },
  created() {
    // Initialise the ws connection
    console.log("Starting connection to WebSocket Server");
    //this.ws = new WebSocket('wss://dice-messenger.herokuapp.com/');
    //this.ws = new WebSocket('ws://localhost:3000');
  },
  watch: {
    ws: function() {
      this.ws.onclose = () => {
        this.ws.close(1000, this.name);
      }

      this.ws.onmessage = (event) =>  {
        let message = JSON.parse(event.data);
        console.log(message);
        switch(message.type) {
          case "open":
            console.log("Updating Users");
            this.all_users = message.msg;
            break;
          
          case "message":
            console.log("Receiving a message");
            this.all_posts.push(message);
            break;

          case "close":

            break;

          default:
            console.log("No type found, ignoring.")            
        }
      }

      this.ws.onopen = () => {
        let data = {
          name: this.name,
          type: "open",
          msg: "",
          time: Date.now()
        }

        let sent = JSON.stringify(data);
        console.log(sent);
        this.ws.send(sent);
      }
    }
  },
  methods: {
      confirm_name: function() {
        this.name = this.temp_name;
        this.ws = new WebSocket('ws://localhost:3000');
      },
      ws_send: function () {
        let data = {
          name: this.name,
          type: "message",
          msg: this.msg_send,
          time: Date.now()
        }

        let sent = JSON.stringify(data)
        this.ws.send(sent);
        this.msg_send = "";
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
