<template>
  <div class="chat-wrap">
    <div class="chat" ref="chat">
      <Message 
        v-for="(msg, index) in messages" 
        :key="index" 
        :name="msg.name"
        :text="msg.text"
        :owner="msg.id === user.id"/>
    </div>
    <div class="chat-form">
      <ChatForm />
    </div>
  </div>

</template>

<script>
  import Message from '@/components/Message'
  import ChatForm from '@/components/ChatForm'
  import { mapState } from 'vuex'
  export default {
    name: "chat",
    components: { Message , ChatForm},
    head(){
      return{
        title: `Room ${ this.user.room }`
      }
    },
    middleware: ['chat'],
    computed: mapState(['user', 'messages']),
    watch:{
      messages(){
        setTimeout(() =>{
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        }) 
      }
    }
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
