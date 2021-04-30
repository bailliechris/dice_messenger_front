<template>
  <div id="app">
    <Header />
    <MessageArea />
  </div>
</template>

<script>
import Header from '@/components/Header'
import MessageArea from '@/components/MessageArea'

export default {
  name: 'App',
  components: {
    Header,
    MessageArea
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
