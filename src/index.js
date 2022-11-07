const { dbConnect } = require('./config/database');
const app = require('./server');

require('dotenv').config();

const port = process.env.PORT || 8080;

dbConnect();

app.listen(port, () => console.log(`Running on Port ${port}`));
