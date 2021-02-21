<template>
  <div id="app">
    <Header />
    <SocketConnection />
    <MessageArea />
  </div>
</template>

<script>
import Header from '@/components/Header'
import MessageArea from '@/components/MessageArea'
import SocketConnection from '@/components/SocketConnection'

export default {
  name: 'App',
  components: {
    Header,
    MessageArea,
    SocketConnection
  },
  data() {
    return{
      name: ""
    }
  }
}
</script>

<style>

</style>
