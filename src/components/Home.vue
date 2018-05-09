<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {

    this.$OS && this.$OS.toast && this.$OS.toast.show({ text: "v1" }) ;

    this.$OS.on('test.event', () => {  
      
      this.$OS && this.$OS.toast && this.$OS.toast.show({ text: "v2" })

    })

    this.$OS.trigger('test.event', {})

    return {
      msg: "Start",
    }
  }
}
</script>
`
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
`