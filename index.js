const express = require("express");
const app = express();
// // writing a normal age checker to access the ride 
// function agecheck(age){
//     if(age>=15){
//         return true;
//     }else{
//         return false;
//     }
// }
// writing a age checker as middleware to use it further
//basiclly adding "next" to normal age checker makes it a MW 
function agecheckMW(req, res, next) {
    const age = req.query.age;
    if (age >= 15) {
        next();
    } else {
        res.send({
            msg: "sorry you are not eligible for the ride"
        })
    }
}

//here we are defining MW in each get req but we can make a "global middleware" ¸like :-
//. app.use(agecheckMW);      -> then we don't have to add it individually

app.get("/ride1", agecheckMW, (req, res) => {
    res.json({
        msg: "you have access to ride 1"
    })
});

app.get("/ride2", agecheckMW, (req, res)=>{
    res.json({
        msg: "yay you have the access to ride 2"
    })
})



app.listen(3000);
