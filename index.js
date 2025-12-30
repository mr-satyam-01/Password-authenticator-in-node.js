// here we are making a authentication server using express which has two post request one is
// signup to get the credentials and save it and another is
// signin to verify the credentials and generate a token for the browser
// an when you send this token through headers with a get request to "/me" it returns the user details
const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "cuebuycpyeberborgf0999"
const app = express();
app.use(express.json());

const users = [];

//The generate token is now removed because it is random token which needs to be verified by the database
//Instead of that we use JWT to generate token so that can be verified by the server itself no need to check in database

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "you are signed up"
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
        const token = jwt.sign({username: username}, JWT_SECRET);
        res.json({
            message: token
        })

    } else {
        res.status(403).send({
            message: "invalid username or password"
        })
    }
})

app.get("/me", (req, res) => {
    const token = req.headers.token;
    const Infocheck = jwt.verify(token, JWT_SECRET); //{it spits the username provided while creating the jwt}
    const username = Infocheck.username;

    let realuser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            realuser = users[i]
        }
    }
    if (realuser) {
        res.json({
            username: realuser.username,
            password: realuser.password
        })
    } else {
        res.json({
            message: "token is invalid"
        })
    }
})
app.listen(3000);