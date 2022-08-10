const http = require('http')
const PORT = 3000
const app = require('./app')

const index = http.createServer(app)
index.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`)
})