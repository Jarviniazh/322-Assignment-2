const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

function getSetByNum(setNum){
    return new Promise((resolve, reject) => {
        let result = legoData.getSetByNum(setNum);
        (result) ? resolve(result) : reject("No data found");
    })
};

function getSetsByTheme(theme){
    return new Promise((resolve, reject) => {
        let result = legoData.getSetsByTheme(theme);
        (result) ? resolve(result) : reject("No data found");
    })

};

async function getSever() {
    try {
        let init = await legoData.initialize();
        console.log("Successfully initialized Lego Sets module");
        app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
        app.get("/", (req, res) => {res.send("Welcome to the Lego Sets API");});

        let getNum = await getSetByNum("0011-2");
        let getTheme = await getSetsByTheme("technic");
    } catch (error) {
        console.log(error);
    }
}

getSever();


// legoData.initialize().then(() => {
//     app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
//     app.get("/", (req, res) => {res.send("Welcome to the Lego Sets API");}); //"Assignment 2:  Student Name - Student Id" where "Student Name" and "Student Id" 
// });
