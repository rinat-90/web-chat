<template>
   <v-flex xs12>
      <v-text-field 
         v-model="text"
         @keydown.enter="send"
         label="Enter you message..."
         outline>
      </v-text-field>
   </v-flex>
</template>
<script>
export default {
   data: () => ({
      text: ''
   }),
   methods:{
      send(e){
         this.$socket.emit('createMessage', {
            text: this.text,
            id: this.$store.state.user.id
         }, (data) =>{
            if(typeof data === 'string'){
               console.log(data)
            } else{
               this.text = ''
            }
         })
         
      }
   }

}
</script>