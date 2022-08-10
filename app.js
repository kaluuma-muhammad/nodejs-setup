const app = express()
const authRoutes = require('./routes/auth')

require("dotenv").config()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/auth', authRoutes)

// Default Route
app.get('/', (req, res) => {
    res.send({ 'msg': "Use postman to consume the api" })
})
module.exports = app