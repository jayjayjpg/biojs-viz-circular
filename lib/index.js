/*
 * biojs-vis-circular-bar-chart
 * https://github.com/jessica-jordan/biojs-vis-circular-bar-chart
 *
 * Copyright (c) 2016 Jessica Jordan
 * Licensed under the MIT license.
 */

/**
@class biojsviscircularbarchart
 */


var  biojsviscircularbarchart;
const d3 = require("d3");
const http = require('http');
const fs = require('fs');



/* module.exports = biojsviscircularbarchart = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsviscircularbarchart.hello(opts.text);
  this.render = this.render;
}; */

class Biojsviscircularbarchart{
  constructor(params){
    console.log("module exports");
    this.el = params.el;
    this.data = params.data;
    if (typeof params.dataTitle === 'undefined'){
      this.dataTitle = '';
    }
    this.dataTitle = params.dataTitle;
    this.displayedVal = params.displayedVal;
    this.color = params.color || "#dd77dd";
  }
  hello(name) {
    console.log('hello ' + name);
  }
  render(/*el, data, name, val, color, readFunc, readObj*/){

    var displayedVal = this.displayedVal;
    var dataTitle = this.dataTitle;

    console.log("app starts rendering");
    const dlen = this.data.length;
    const width = 800,
      height = width,
      diameter = width / 8,
      radius = Math.min(width, height) / 4;


    const pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return 100; });
    
    const update = d3
                    .select(this.el)
                    .append("svg")
                    .attr("height", function(d){
                      return height;
                    })
                    .attr("width", function(d){
                      return width;
                    })
                    .append("g")
                    .attr("transform", function(){
                      return `translate(${height / 2} ${width /2})`;
                    })
                    .selectAll("g")
                    .data(pie(this.data));
                    



      const freqValues = this.data.map(function(obj){
        return obj[displayedVal];
      });

      const scaleOut = d3.scale.log()
                      .domain([d3.min(freqValues), d3.max(freqValues)])
                      .range([diameter, diameter * 5]);


                    
      const arc = function(d){ 
        console.log("inner radius: " + d3.min(freqValues));

        var arcc = d3.svg.arc()
        .innerRadius(function(d){ return diameter;})
        .outerRadius(function(d){
          console.log("value scaled from data: " + scaleOut(d.data[displayedVal]));
          return scaleOut(d.data[displayedVal]);
        });

        console.log(arcc(d));
        return arcc(d);
      };

      var randId;
      var randIds = [];
      var bars = update
        .enter()
        .append("g");
      bars
        .append("path")
        .attr("d", arc)
        .style({"fill": this.color, "opacity": function(d,i){
          return `${i * 0.15 + 0.10}`;
          }
        })
        .attr("class","chartbar")
        .attr("id", function(d){
          console.log("datatile " + d.data[dataTitle]);
           randId = generateRandomId(d.data[dataTitle]);
           saveId(randIds,randId);
           return randId;
        });
      bars
        .append("text")
        .attr("font-family","Arial")
        .attr("font-size","10")
        .attr("dx","28")
        .append("textPath")
        .attr("xlink:href", function(d,i){
          return "#" + randIds[i];
        })
        .text(function(d){
          console.log("text: " + d.data[dataTitle]);
          return d.data[dataTitle];
        }); 
      
      /* bars
        .append("text")
        .attr("font-family","Arial")
        .attr("font-size","12px")
        .attr("text-anchor","end")
        .text(function(d){
          return d.data[dataTitle];
        }); */
        
      update
        .exit()
        .remove(); 
  
      function generateRandomId(title){
        var idTitle;
        title = title.toString();
        var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        if (title.trim().length > 2){
          console.log("title " + title.trim() + ": " + title.trim().length);
          idTitle = title.trim().slice(0,3);
        }
        else {
          idTitle = alphabet[Math.floor(Math.random() * 26)] + alphabet[Math.floor(Math.random() * 26)];
        }
        return "chartbar-" + idTitle + Math.floor(Math.random() * 99999);
      }

      function saveId(storeForIds, id){
          storeForIds.push(id);
      }

  }
};
/**
 * Private Methods
 */

/*
 * Public Methods
 */

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     biojsviscircularbarchart.hello('biojs');
 *
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */


/* biojsviscircularbarchart.hello = function (name) {
  return 'hello ' + name;
}; */

/* biojsviscircularbarchart.getData = function (el, urlBase, urlPath, callback, callbackObj){
  
  function getSubData(arr){
    return arr.map(function(obj){
      return new Promise(function(resolve, reject){
        return http
        .get({
          host: urlBase,
          path: obj.url.replace(`http://${urlBase}`, ''),
          withCredentials: false
        }, (res) => {
            var body = '';
            res.on('data', (d) => {
              body += d;
            });
            res.on('end', (d, err) => {
              if (err) { return reject(err); }
              let fullData = JSON.parse(body);
              obj.details = fullData;
              resolve();
              console.log("res on getSubData:");
              console.log(obj.details);
            });
        });
      });
    });
  }

  return http
    .get({
      host: urlBase,
      path: urlPath,
      port: '',
      withCredentials: false
      }, (res) => {
      var body = '';
        res.on('data', (d) => {
          body += d;
        });
        res.on('end', (d) => {
          let fullData = JSON.parse(body);
          var detailedData = getSubData(fullData.pokemon_species);
          let reqColor = urlPath.replace('/api/v2/pokemon-color/','').replace('.json','');
          Promise.all(detailedData)
          .then(function(){ 
            callback.apply(callbackObj, [el, fullData.pokemon_species, reqColor]); // Function.prototype.apply() always stands with arguments array
          })
          //.then(function(){ console.log("all there")}) // works splendid!
          .catch(console.error);
        });
  });
} */




module.exports = Biojsviscircularbarchart;



