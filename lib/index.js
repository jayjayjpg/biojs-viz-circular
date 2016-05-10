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



/* module.exports = biojsviscircularbarchart = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsviscircularbarchart.hello(opts.text);
  this.render = this.render;
}; */

module.exports = biojsviscircularbarchart = function(){
  console.log("module exports");
}
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


biojsviscircularbarchart.hello = function (name) {
  return 'hello ' + name;
};

biojsviscircularbarchart.getData = function (el, urlBase, urlPath, callback, callbackObj){
  
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
            /* console.log("all resolved.");
            console.log("res on:");
            console.log(fullData);
            console.log(fullData.pokemon_species);
            console.log(el);
            console.log(detailedData);
            console.log("----"); */
            callback.apply(callbackObj, [el, fullData.pokemon_species, reqColor]); // Function.prototype.apply() always stands with arguments array
          })
          //.then(function(){ console.log("all there")}) // works splendid!
          .catch(console.error);
        });
  });
}



biojsviscircularbarchart.render = function (el, data, color, readFunc, readObj){

  console.log("app starts rendering");
  console.log(el);
  console.log(data);
  const dlen = data.length;
 //const el = rootDiv;
 /* const update = d3
                  .select(el)
                  .selectAll("div")
                  .data(data) */  // bar chart using plain div containers

const pie = d3.layout.pie()
    .sort(null)
    //.value(function(d) { return d.details.capture_rate; }); // width of pie elements proportional to capture capture_rate
    .value(function(d) { return 100; });
   
   const update = d3
                  .select(el)
                  .append("svg")
                  .attr("height", function(d){
                    return "600";
                  })
                  .attr("width", function(d){
                    return "900";
                  })
                  .append("g")
                  .attr("transform", function(){
                    return `translate(400 300)`;
                   })
                  .selectAll("g")
                  .data(pie(data));
                  

const width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;
                  
const arc = function(d){ 
     var arcc = d3.svg.arc()
    //.outerRadius(radius - 10) // solid outerRadius as in a regular pie chart
    .innerRadius(radius - 70)
    .outerRadius(function(d){
      //console.log("this is the data outerradius:" + JSON.stringify(d.data.details.capture_rate));
      return d.data.details.capture_rate - 10;
    });  
    console.log(arcc(d));
    return arcc(d);
    };           

  
  update
    .enter()
    //.append("div")
    /* .append("g")
    .attr("transform", function(d,i){
      console.log(d);
      return `translate(200 ${i * 50}) rotate(${i * 360 / dlen})`;
    }) */
    // .append("rect")
    .append("path")
    //.attr("d", arc)
    .attr("d", arc)
    .transition()
    .style({"fill": color, "opacity": function(d,i){
      return `${i * 0.15 + 0.10}`;
      }
    })
    .text(function(d){
      return d.name;
    });
    
  update
    .exit()
    .remove(); 

};



