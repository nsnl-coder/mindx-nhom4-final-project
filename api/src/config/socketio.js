const socket = require('socket.io')
const expressServer = require('./server')

const socketServer = socket.Server
const origin = process.env.FRONTEND_HOST
const activeUsers = []

const io = new socketServer(expressServer, {
  cors: {
    origin,
  },
})

io.on('connection', (socket) => {
  console.log('New user connected')

  //  on logging out
  socket.on('logout', (userId) => {
    remmoveActiveUser(userId, socket)
    socket.disconnect()
  })

  //  !!!!!!!!! need to authorization
  socket.on('new_connection', (userId) => {
    const connection = { userId, socketId: socket.id }
    socket.join(userId)
    activeUsers.push(connection)
  })

  // new message
  socket.on('new_message', (message) => {
    socket.to(message.to).emit('new_message', message)
  })

  // on user typing
  socket.on('typing_message', (receiverId) => {
    const senderId = getUserIdBySocketId(socket.id)
    socket.to(receiverId).emit('typing_message', senderId)
  })
})

function remmoveActiveUser(userId, socket) {
  const index = activeUsers.findIndex(
    (conn) => conn.socketId === socket.id && conn.userId === userId
  )
  activeUsers.splice(index, 1)
}

function getUserIdBySocketId(socketId) {
  const connection = activeUsers.find((conn) => conn.socketId === socketId)
  return connection?.userId
}
