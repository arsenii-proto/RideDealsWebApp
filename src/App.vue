<template>
  <transition name="pages">
    <router-view/>
  </transition>
</template>

<script>
import Home from './views/Home.vue'
import About from './views/About.vue'

export default {
  name: 'app',
  components: {
    Home,
    About,
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Righteous|Magra:700|Montserrat|PT+Sans|Poppins|Source+Sans+Pro|Titillium+Web|Roboto:400,500,700,400italic|Material+Icons');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('./assets/animate.css');



body {
  font-family: 'PT Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  /* background: -webkit-linear-gradient(left top, #666666 0%, #333333 51%, #0d0d0d 85%); */
  /* background: -o-linear-gradient(bottom right, #666666 0%, #333333 51%, #0d0d0d 85%); */
  /* background: -moz-linear-gradient(bottom right, #666666 0%, #333333 51%, #0d0d0d 85%); */
  /* background: linear-gradient(to bottom right, #666666 0%, #333333 51%, #0d0d0d 85%); */
  background: #333333;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

.pages-leave-active {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

.pages-enter-active {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

.page{

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 5px;
}

</style> 