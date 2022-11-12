import { PORT } from './utils/config.js'
import { info, error } from './utils/logger.js'
import http from 'http'
import app from './app.js'

const server = http.createServer(app)

server.listen(PORT, () => {
  info('Server running on port', PORT)
})
