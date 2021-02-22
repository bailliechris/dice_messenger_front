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
          <b-button @click="send_message">Send</b-button>
      </section>
      <section>
          <b-button @click="refresh">Refresh</b-button>
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
import axios from 'axios';

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
      interval_refreshid:0
    }
  },
  methods: {
      confirm_name: function() {
          this.name = this.temp_name;
      },
      send_message: async function(e) {
          e.preventDefault();

          var config = {
              method: 'post',
              url: 'http://localhost:3000/posts/add',
              data: {
                      name: this.name,
                      msg: this.msg_send
              }      
          };

          await axios(config)
            .then((res) => {
                if (res.status == 200) {
                    this.all_posts = res.data;
                    this.msg_send = "";
                }
            })
      },

      refresh: async function(e) {
          e.preventDefault();

          var config = {
              method: 'get',
              url: 'http://localhost:3000/posts/' 
          };

          await axios(config)
            .then((res) => {
                if (res.status == 200) {
                    this.all_posts = res.data;
                }
            })
      },

      interval_refresh: function() {
        this.interval_refreshid = setInterval(() => {
              var config = {
              method: 'get',
              url: 'http://localhost:3000/posts/' 
            };

            axios(config)
              .then((res) => {
                  if (res.status == 200) {
                      this.all_posts = res.data;
                  }
              })
        }, 5000);
      }
  },

  mounted() {
    this.interval_refresh();
  },

  beforedestroy() {
    clearInterval(this.interval_refreshid);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
