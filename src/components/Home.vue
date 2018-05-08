<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {

    this.$OS && this.$OS.toast && this.$OS.toast.show({ text: "Puiutu te iubesc" }) 

    this.$OS.on('test.event', (e, data) => {  
      
      this.$OS && this.$OS.toast && this.$OS.toast.show({ text: "Receive test.event" })

      data.alert = 12

    })

    // this.$OS.trigger('test.event', {})

    return {
      msg: "Puiutu te iubesc - Hai Sate ajut",
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