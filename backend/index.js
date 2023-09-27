const connectToMongo=require('./db');
const express = require('express');
var cors = require('cors');


connectToMongo();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());//middleware use to send something in request body of content-type:application/json
//Available routes -linking routes with route files
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

//to link path e.g. /api/auth/login will look into auth file for /login path as /api/auth is bae path define

app.listen(port, () => {
  console.log(`iNoteBook listening on port ${port}`)
})