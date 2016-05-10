// if you don't specify a html file, the sniper will generate a div with id "rootDiv"
const app = require("biojs-vis-circular-bar-chart");
//const fs = require('browserify-fs');
//const jsonfile = require('jsonfile');

  
let data; // a global
const redditThread = "/api/v2/pokemon-color/purple";
const redditUrl = "pokeapi.co";
const redditPath = redditThread + ".json";
const proxy = "cors-anywhere.herokuapp.com/";
const url = redditUrl;
const myData = [
                {
                        "name": "rattata",
                        "url": "http://pokeapi.co/api/v2/pokemon-species/19/",
                        "details": {
                          "capture_rate": "500",
                          "cute": false
                        }
                },
                {
                        "name": "ekans",
                        "url": "http://pokeapi.co/api/v2/pokemon-species/23/",
                        "details": {
                          "capture_rate": "1000",
                          "cute": true
                        }
                },
                {
                        "name": "nidoran-m",
                        "url": "http://pokeapi.co/api/v2/pokemon-species/32/",
                        "details": {
                          "capture_rate": "300",
                          "cute": true
                        }
                },
                {
                        "name": "zubat",
                        "url": "http://pokeapi.co/api/v2/pokemon-species/41/",
                        "details": {
                          "capture_rate": "200",
                          "cute": true
                        }
                },
                {
                        "name": "venonat",
                        "url": "http://pokeapi.co/api/v2/pokemon-species/48/",
                        "details": {
                          "capture_rate": "1023",
                          "cute": true
                        }
                },
                {
                        "name": "arbok",
                        "url": "http://pokeapi.co/api/v2/pokemon-species/24/",
                        "details": {
                          "capture_rate": "300",
                          "cute": true
                        }
                }];

app();

// app.getData(rootDiv, url, redditPath, app.render, app); // works with the pokeapi
app.render(rootDiv, myData, "purple"); // works with mock data myData


