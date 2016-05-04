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



biojsviscircularbarchart.render = function (el, data, color){
  console.log("app starts rendering");
  console.log(el);
  console.log(data);
 //const el = rootDiv;
 const update = d3
                  .select(el)
                  .selectAll("div")
                  .data(data)
                  

  
  update
    .enter()
    .append("div")
    .transition()
    .style({"background-color": color,"width": function(d,i){
      return `${d.details.capture_rate}px`;
      }
    })
    .text(function(d){
      return d.name;
    });
    
  update
    .exit()
    .remove(); 

};



