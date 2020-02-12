export const state = () => ({
  user:{},
  messages: []
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  CLEAR_DATA(state){
    state.user = {};
    state.messages = []
  },
  SOCKET_newMessage(state, msg){
    state.messages.push(msg)
  }
};

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('Message received', data)
  }
};
