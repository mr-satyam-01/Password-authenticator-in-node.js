// here we are making a authentication server using express which has two post request one is
// signup to get the credentials and save it and another is
// signin to verify the credentials and generate a token for the browser

const express = require("express");
const app = express();
app.use(express.json());

const users = [];

const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    1, 2, 3, 4, 5, 6, 7, 8, 9];

function generatetoken() {
    let word = "";
    for (let i = 0; i <= 35; i++) {
        const random = Math.floor(Math.random() * chars.length)
        word += chars[random];
    }
    return word;
}


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

    } else {
        res.status(403).send({
            message: "invalid username or password"
        })
    }
})

app.listen(3000);