const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const db = require('./db');
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(express.json());

db();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/listing', require('./routes/listings'));
app.use('/api/messages', require('./routes/messages'));

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
