require('dotenv').config();
const express = require('express');
const cors = require('cors');

const users = require('./user-data')

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("<h1> Welcome to Romy's user database")
});

server.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

server.post('/api/register', (req, res) => {
    if (req.body.username && req.body.password){
        const name = users.find(user => user.username === req.body.username);
        if (name){
            res.status(409).json({ message: "Username is taken "});
        }else{
            users.push(req.body);
            res.status(200).json(req.body);
        }
    }else{
        res.status(400).json({ message: "You must include a username and password" });
    }
});

server.post('/api/login', (req, res) => {
    const user = users.find(item => item.username === req.body.username)
    if (user){
        if (user.password === req.body.password){
            res.status(200).json({ message : `Welcome, ${user.username}!`});
        }else{
            res.status(403).json({ message: "Password is invalid" });
        }
    }else{
        res.status(404).json({ message: "Username is invalid" });
    }
});

server.use('*', (req, res) => {
    res.status(404).json({ message: 'Invalid endpoint' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})