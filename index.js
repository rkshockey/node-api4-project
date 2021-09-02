require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})