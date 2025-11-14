// here we are making a authentication server using express which has two post request one is 
// signup to get the credentials and save it and another is
// signin to verify the credentials and generate a token for the browser 
const express = require("express");
const app = express();
app.use(express.json());

const users = [];

const generatetoken = Math.random;

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "you are signed in"
    })
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    const founduser = users.find(function (u) {
        if (u.username == username && u.password == password) {
            return true;
        } else {
            return false;
        }
    })

    if (founduser) {
        const token = generatetoken();
        founduser.token = token;
        res.json({
            message: token
        })

    }else{
        res.status(403).send({
            message: "invalid username or password"
        })
    }
})

app.listen(3000);