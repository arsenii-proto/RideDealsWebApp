<template>

  <div>
    <span id="root">

      <img src="../assets/white-logo.png">

    </span>
  </div>

</template>

<script>
export default {
  name: 'Home',
  created: function() {    
    
    // var user_id = this.$OS.config.get({ name: 'user_id' })
    var user_id = null

    if( user_id && user_id.user_id && (user_id = user_id.user_id) != null ) {

      
      this.$DB.doc('users/'+ user_id).get().then( doc => {
        
        
        if( doc && doc.exists ) {
          
          var data = doc.data()

          if( data.type == "client" ) {

            this.$router.push({ name: 'client-home' });

          } else {            
            
            this.$router.push({ name: 'driver-home' });
          }

        } else {

          this.$router.push({ name: 'login' });
        }

      })

    } else {

      this.$router.push({ name: 'login' });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

span#root {
  text-align: center;
  display: block;
  padding: 180px 0 0 0;
}


span#root img {
    -webkit-animation-name: flash;
  animation-name: flash;
  -webkit-animation-duration: 7s;
  animation-duration: 7s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

</style>