require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app =  express();
let users = require("./users.json");
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/create', async (req,res) => {
  const data = req.body;
  const index = users.findIndex((user)=>user.uname === data.uname);
  if(index === -1){
    if(data.uname !== ''){
    users.push(data)
    res.send({msg:'OK'});
    }else{
        res.send({msg: 'Username must contain something'})
    }
  }
  else{
    res.send({msg: 'User alredy exists'})
  }
});

app.get('/get', async (req,res) => {
    const data = req.body;
    res.send({ users: users});
});

app.delete('/delete', async (req,res) => {
    const data = req.body;
    // console.log(data)
    const index = users.findIndex((user)=>user.uname === data.uname);
    // console.log(users[index])
    users.splice(index,1);
    res.send({ msg: 'User deleted'});
});

app.patch('/update', async (req,res) => {
    const data = req.body
    const index = users.findIndex((user)=>user.uname === data.uname);
    users.splice(index,1,data);
    res.send({ msg: 'User updated', status: 200});
});

app.post('/login', async (req,res) => {
    const uname = req.body;
    console.log(uname)
    const user = {name: uname}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({user: uname ,accessToken: accessToken})
});

app.listen(4000, ()=>console.log("Up and running * 4000"));