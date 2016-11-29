var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
  
  // My Scripts
var keys = require('keys.js');

var app = {
    "my-tweets": function (){
        twitter.get('search/tweets',{q: "ScottDMay", count:20},
runData);
    console.log(data)
}
}



