const express = require('express')
const usersRoute = require("./routes/userRoute.js");
const app = express()
const port = 3000


const service_status = require('./status/status.js')

// Default route status
app.get('/', service_status.go)

app.use(express.json());

//Route for api/users
app.use("/api/users", usersRoute);
app.listen(port, () => console.log(`Listening on port ${port}...`));