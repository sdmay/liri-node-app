"use strict";
var twit = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var omdb = require('omdb');
// var keys = require('keys.js')
var nodeArgs = process.argv;
var query = "";
      
      for (var i=3; i<nodeArgs.length; i++){
         
	    query = query + " " + nodeArgs[i];

      }
      // console.log(query)

var twitter = new twit({
        consumer_key: 'y31gvwer7zSp1sjQue2xKGbFn',
        consumer_secret: 'bzjuFnTCVsc3dtBHTHilVPimvM2Jjexr2N3erFNvGWxSd7tuVZ',
        access_token_key: "249584013-ExAXXf5ocp0cgabQRyNZj7eLthfvfGhy0tFwKnq4",
        access_token_secret: "twD6LWYsRHiWhJkddZPfQ7tw8rEeNqks0XQrb6z5DYrde"
});


var app = {
"my-tweets": function (){ 

  var params = {screen_name: 'ScottDMay', count: 20};

  twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    tweets.forEach(function(object) {
      console.log(object.text)
    app.saveData(object.text);
  });
  }
  });
},

// spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// if no song is provided then your program will default to
// "The Sign" by Ace of Base

  "spotify-this-song": function doIt() {

        spotify.search({ type: 'track', query: (query || "The Sign Ace of Base") }, function(err, data){
         var record = data.tracks.items[0];
         
        console.log(""); 
        console.log('Artist: ' + record.artists[0].name);
        console.log('Name: ' + record.name);
        console.log('Link: ' + record.preview_url);
        console.log('Album: ' + record.album.name);
          
        app.saveData(record)
      });

  },
      
   
// movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
// Title of the movie.
// Year the movie came out.
// IMDB Rating of the movie.
// Country where the movie was produced.
// Language of the movie.
// Plot of the movie.
// Actors in the movie.
// Rotten Tomatoes Rating.
// Rotten Tomatoes URL.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!

 "movie-this": function() {
     request('http://www.omdbapi.com/?t=' + (query || "Mr. Nobody") +'&plot&tomatoes=true', function (error, response, info) {
       if (!error && response.statusCode == 200) {

      var movieData = JSON.parse(info); 

      if (movieData.Title == "Mr. Nobody"){
           console.log(""); 
           console.log("If you haven't watched Mr. Nobody,then you should, http://www.imdb.com/title/tt0485947/ on Netflix! Or watch it for free at 123Movies, http://123movies.is/film/mr-nobody-8313/")
       
 }
      else{
         console.log(""); 
         console.log('Title: ' + movieData.Title);
         console.log('Year: ' + movieData.Year);
         console.log('IMDB Rating: ' + movieData.imdbRating);
         console.log('Country: ' + movieData.Country);
         console.log('Language: ' + movieData.Language);
         console.log('Plot: ' + movieData.Plot);
         console.log('Actors: ' + movieData.Actors);
         console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
         console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);

         app.saveData(movieData);
 }
       }
       
     });
   },

// do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.

 "do-what-it-says": function() {
     fs.readFile('random.txt', 'utf8', function(err, data) {
       if(err) throw err;
       
        var work = data.split(',');
        console.log(work)
      // doIt(work[0]);
      // work.push().app[process.argv[2]](process.argv[3]);
      
                
       app.saveData(work)
      });
    },
    
    saveData: function(data) {
     fs.appendFile('log.txt', JSON.stringify(data, null, 2) + '\n=', function(err) {
        if(err) {
          console.log(err);
        }
     });
   },

// Delete the data from the "log.txt"

   "delete-data": function(){
     fs.writeFile('log.txt', '', function()
     {console.log('Done')})

   }
    }

    

    app[process.argv[2]](process.argv[3]);
