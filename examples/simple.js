// if you don't specify a html file, the sniper will generate a div with id "rootDiv"
const app = require("biojs-vis-circular-bar-chart");
  
  
let data; // a global
const redditThread = "/api/v2/pokemon-color/purple";
const redditUrl = "pokeapi.co";
const redditPath = redditThread + ".json";
const proxy = "cors-anywhere.herokuapp.com/";
const url = redditUrl;

app();
app.getData(rootDiv, url, redditPath, app.render, app);


