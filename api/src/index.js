const dotenv = require('dotenv')

dotenv.config()

// start express server
require('./config/server')

// start socket server
require('./config/socketio')
