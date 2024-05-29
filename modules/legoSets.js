const setData = require("../data/setData");
const themeData = require("../data/themeData");


let sets = [];

// The purpose of this function is to fill the "sets" array (declared above), by adding copies of all the setData objects
function initialize() {
    
    return new Promise((resolve, reject) => {
        setData.forEach(set => {
            let theme  = themeData.find(theme => theme.id === set.theme_id);
            set = {...set, theme: theme.name};
            sets.push(set);
            resolve("no data");
        })
    })
};

// This function simply returns the complete "sets" array
function getAllSets() {               
    return new Promise((resolve, reject) => {
        resolve(sets);
    })
};

//This function will return a specific "set" object from the "sets" array, whose "set_num" value matches the value of the "setNum" parameter
function getSetByNum(setNum){
    return new Promise((resolve, reject) => {
        let result = sets.find(set => set.set_num === setNum);
        (result) ? resolve(result) : reject("No data found");
    })
};

//The purpose of this function is to return an array of objects from the "sets" array whose "theme" value matches the "theme" parameter
function getSetsByTheme(theme){
    return new Promise((resolve, reject) => {
        let result = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
        (result) ? resolve(result) : reject("No data found");
    })
};

//Part 3. Testing & Refactoring 
//Testing
initialize().then(() => {
    console.log("Successfully initialized Lego Sets module");
    getSetByNum("0011-2").then(set => console.log("Search number: \n", set));
    getSetsByTheme("technic").then(set => console.log("Search by exact theme name: \n", set));
    getSetsByTheme("town").then(set => console.log("Search by partial theme name: \n", set));
});

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };