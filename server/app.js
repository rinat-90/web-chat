const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')()

const msg = (name, text, id) =>({name,text, id});

io.on('connection', socket => {
  console.log('IO Connected');

  socket.on('userJoined', (data, cb) => {
    if(!data.name || !data.room){
      return cb('Invalid data')
    }
    socket.join(data.room);

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
 
    cb({userId: socket.id});
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', msg('admin', `Welcome ${data.name}`));
    socket.broadcast
      .to(data.room)
      .emit('newMessage', msg('admin', `${data.name} entered chat`));
  });

  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if(user){
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', msg('admin', `${user.name} left the chat.`))
      cb()
    }
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if(user){
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room)
      .emit('newMessage', 
      msg('admin', `${user.name} left the chat.`))
    }
  })

  socket.on('createMessage', (data, cb) => {
    if(!data.text){
      return cb('Text cannot be empty')
    }
    const user = users.get(data.id)
    if(user){
      io.to(user.room).emit('newMessage', msg(user.name, data.text, data.id))
    }
    cb()
    
  })
});

module.exports = {
  app,
  server
};
