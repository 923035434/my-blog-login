<template>
  <div id="app">
    <login-container></login-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import loginContainer from './components/loginContainer/loginContainer.vue'
  export default {
    name: 'app',
    components: {
      'login-container': loginContainer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    font-family: Roboto, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    overflow :hidden
</style>
