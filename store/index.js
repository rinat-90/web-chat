export const state = () => ({
  user:{},
  messages: [],
  users: []
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  CLEAR_DATA(state){
    state.user = {};
    state.messages = []
    state.users = []
  },
  SOCKET_newMessage(state, msg){
    state.messages.push(msg)
  },
  SOCKET_updateUsers(state, users){
    state.users = users
  }
};

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('Message received', data)
  }
};
