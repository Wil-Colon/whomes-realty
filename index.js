const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db');

const cors = require('cors');

app.use(cors());

app.use(express.json());

db();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/listing', require('./routes/listings'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
