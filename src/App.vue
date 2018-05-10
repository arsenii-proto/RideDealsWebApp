<template>
  <router-view/>
</template>

<script>
import Home from './components/Home.vue'
import About from './components/About.vue'

export default {
  name: 'app',
  components: {
    Home,
    About,
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Righteous|Magra:700');
@import url('./assets/animate.css');

body {
  font-family: 'Righteous', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  background: #2c3e50
}

</style> 