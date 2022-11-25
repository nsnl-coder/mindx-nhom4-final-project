const socket = require('socket.io')
const expressServer = require('./server')

const socketServer = socket.Server
const origin = process.env.FRONTEND_HOST

const activeUsers = []
const userProfiles = {}

const io = new socketServer(expressServer, {
  cors: {
    origin,
  },
})

io.on('connection', (socket) => {
  console.log('New user connected')

  //  on disconnect
  socket.on('disconnect', () => {
    const userId = getUserIdBySocketId(socket.id)
    remmoveActiveUser(userId, socket)
    activeUsersChange(socket)
  })
  //  on logging out
  socket.on('logout', (userId) => {
    remmoveActiveUser(userId, socket)
    activeUsersChange(socket)
    socket.disconnect()
  })

  //  !!!!!!!!! need to authorization
  socket.on('new_connection', (auth) => {
    const { userId, profileImage, username } = auth
    const connection = { userId, socketId: socket.id }
    socket.join(userId)
    activeUsers.push(connection)
    userProfiles[userId] = { profileImage, username }
    activeUsersChange(socket)
  })

  // new message
  socket.on('new_message', (message) => {
    socket.to(message.to._id).emit('new_message', message)
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

  const isSocketWithUserId = activeUsers.find((conn) => conn.userId === userId)

  if (!isSocketWithUserId) {
    delete userProfiles[userId]
  }
}

function getUserIdBySocketId(socketId) {
  const connection = activeUsers.find((conn) => conn.socketId === socketId)
  return connection?.userId
}

function getOnlineUsersInfo() {
  const onlineUserIds = [...new Set(activeUsers.map((conn) => conn.userId))]
  const onlineUserProfiles = {}

  onlineUserIds.forEach((id) => (onlineUserProfiles[id] = userProfiles[id]))

  return { onlineUserIds, onlineUserProfiles }
}

function activeUsersChange(socket) {
  const onlineUsers = getOnlineUsersInfo()
  socket.broadcast.emit('new_user_online', onlineUsers)
  socket.emit('new_user_online', onlineUsers)
}
