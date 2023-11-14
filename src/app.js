const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());



//only for test 
app.get('/', (req, res) => {
    res.send("hello world!");
});

app.listen(PORT);
