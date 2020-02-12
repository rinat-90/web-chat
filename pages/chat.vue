<template>
  <div class="chat-wrap">
    <div class="chat">
      <Message 
        v-for="(msg, index) in messages" 
        :key="index" 
        :name="msg.name"
        :text="msg.text"
        owner/>
    </div>
    <div class="chat-form"></div>
  </div>

</template>

<script>
  import Message from '@/components/Message'
  import { mapState } from 'vuex'
  export default {
    name: "chat",
    components: { Message },
    head(){
      return{
        title: `Room ${ this.user.room }`
      }
    },
    middleware: ['chat'],
    computed: mapState(['user', 'messages'])
  }
</script>

<style scoped>
  .chat-wrap{
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .chat-form{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background: #212121;
  }
  .chat{
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
