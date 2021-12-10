const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();

const db = require('./models/index');

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

////to automatically generate collections inside mySql database
db.sequelize.sync();

// active file-server
app.use(express.static('./public'));


app.use('/api', require('./routers'));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'wellcome to todo-app',
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
