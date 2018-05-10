<template>

  <transition name="words-up">

    <span id="root">

      <span id="dot"></span>
      <span id="word-r" class="words">R</span>
      <span id="word-i" class="words">I</span>
      <span id="word-d" class="words">D</span>
      <span id="word-e" class="words">E</span>
      
    </span>

  </transition>

</template>

<script>
export default {
  name: 'Home',
  data() {

    return {
      notFinised: true
    }
  },
  created: function() {    
    
    setTimeout(() => {
      
      this.$router.push({ name: 'about' });

    }, 4000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

span.words {
  font-family: 'Magra', sans-serif;
  font-size: 50px;
}

span#root {
  text-align: center;
  display: block;
  padding: 180px 0 0 0;
  -webkit-animation-name: flash;
  animation-name: flash;
  -webkit-animation-duration: 7s;
  animation-duration: 7s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

span#root.words-up-leave-active {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  position: absolute;
}

span#root.words-up-leave-to {
  position: absolute;
  opacity: 0;
}

span#dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #fff;
}

span#word-r:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display:  block;
  background: #2c3e50;
  width: 12px;
  height: 29px;
}

span#word-r {
  position: relative;
}

</style>