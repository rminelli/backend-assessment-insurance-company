const express = require('express')
const usersRoute = require("./routes/userRoute.js");
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const service_status = require('./status/status.js')

// Default route status
app.get('/', service_status.go)

app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))

//Route for api/users
app.use("/api", usersRoute);
app.listen(port, () => console.log(`Listening on port ${port}...`));