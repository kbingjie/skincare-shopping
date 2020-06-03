<template>
  <div id="app">
    <Navbar />

    <!-- get all routers -->
    <router-view/>
  </div>
</template>


<script>
import Navbar from '@/views/Navbar.vue'

export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>
<style lang="scss">
body{
  margin: 0;
  padding: 0;
  background-color: rgb(223, 219, 219);
  font-family: Arial, Helvetica, sans-serif;
}

html {
    overflow: hidden;
    height: 100%;
}
body {
    height: 100%;
    overflow: auto;
}
</style>
