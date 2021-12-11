require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = require('./models/index');

const corsOptions = {
  origin: true,
};

const config = require("./config");

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

////to automatically generate collections inside mySql database
db.sequelize.sync();

// active file-server
app.use(express.static('./public'));

app.use('/', require('./routers'));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'wellcome to todo-app',
    version: "v1.0.3"
  });
});

// set port, listen for requests
const PORT =  process.env.NODE_DOCKER_PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
