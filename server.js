const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Welcome to the Lego Sets API");
});

app.get("/lego/sets", async (req, res) => {
    let sets = await legoData.getAllSets();
    res.send(sets);
});

app.get("/lego/sets/num-demo", async (req, res) => {
    
    try{
        let sets = await legoData.getSetByNum("0011-2");
        res.send(sets);
    }
    catch(error){
        res.send(error);
    }
});

app.get("/lego/sets/theme-demo", async (req, res) => {
    
    try{
        let sets = await legoData.getSetsByTheme("town");
        res.send(sets);
    }
    catch(error){
        res.send(error);
    }
});

legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
});

