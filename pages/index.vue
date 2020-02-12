<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-card-title class="headline">Nuxt WebChat</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Enter room"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="validate"
            >
              Enter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  import { mapMutations } from 'vuex'
  export default {
    layout: 'empty',
    name: "chat",
    head: {
      title: 'WebChat Room'
    },
    sockets: {
      connect: function() {
        console.log("socket connected");
      }
    },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 16) || 'Name must be less than 16 characters',
      ],
      room: '',
      roomRules: [
        v => !!v || 'Enter room',
      ],
    }),

    methods: {
      ...mapMutations(['SET_USER']),
      validate () {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          };

          this.$socket.emit('userJoined', user, (data) => {
            if(typeof data === 'string'){
              console.error(data)
            }else{
              user.id = data.userId;
              this.SET_USER(user);
              this.$router.push('/chat')
            }
          });
        }
      },
      message() {
        this.$socket.emit("createMessage", {
          text: "FROM CLIENT"
        });
      }
    },
  }
</script>
