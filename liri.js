"use strict";
var twit = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var omdb = require('omdb');
// var args = [process.args[2]]
var nodeArgs = process.argv;
  var query = "";
       for (var i=3; i<nodeArgs.length; i++){

	// Build a string with the address.
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
    console.log(tweets.user)
  
  app.saveData(tweets);
  }
});
},
    // twitter.get('search/tweets',{q: "ScottDMay", count:20}, function(err, myData, response){
    //     if(!err){

    //         //  myData.forEach(function(obj) {
    //         //    console.log('Tweet: ' + obj.text);
    //         //  });

    //         var tweetData = JSON.stringify(myData, null, 2);
    //         console.log(tweetData)
    //         var tweet = tweetData;
    //         console.log(tweet)
            // var me = tweet.text;
            // console.log(me)

            
            // var work= tweetData.text
        // myTweet = tweetData.text;
        // myData.forEach(function(obj){
    // console.log(obj.text);
        // });
        //  var tweetData = JSON.parse(myData);
        // console.log(tweetData)
        // console.log(myData);
        

        // console.log(tweetData.statuses)
        
        
        // }

      
        
// });
// },


// spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// if no song is provided then your program will default to

// "The Sign" by Ace of Base

  "spotify-this-song": function() {

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
      
      //     if(query <= 0){
      //     spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function(err, data) {

      //     var ace = data.tracks.items[0];
                 
      //   console.log('Artist: ' + ace.artists[0].name);
      //   console.log('Name: ' + ace.name);
      //   console.log('Link: ' + ace.preview_url);
      //   console.log('Album: ' + ace.album.name);
      //      });
      //   }

      //  else {
      //     spotify.search({ type: 'track', query: query }, function(err, data){
      //    var record = data.tracks.items[0];
 
      //   console.log('Artist: ' + record.artists[0].name);
      //   console.log('Name: ' + record.name);
      //   console.log('Link: ' + record.preview_url);
      //   console.log('Album: ' + record.album.name);
          
      //   app.saveData(record)
      // });
  
      
 
  
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
     request('http://www.omdbapi.com/?t=' + (query || "Mr. Nobody") +'&tomatoes=true', function (error, response, info) {
       if (!error && response.statusCode == 200) {

 var movieData = JSON.parse(info); 

 if (movieData.Title == "Mr. Nobody"){
           console.log(""); 
           console.log("If you haven't watched Mr. Nobody, then you should, http://www.imdb.com/title/tt0485947/ on Netflix!")
       
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
       
      //  var s = data.split(",")

      //  for (var i = 0; i < cmds.length; i++) {

	    //  console.log(s[i]);

       

      // s[i] = [process.argv[2]](process.argv[3]);
      // app.s[i]();

        var cmds = data.toString().split(',');
        console.log(cmds)
 
       app[cmds[0]];
    //    var words = data.toString().split('');
    //    console.log(data.toString());
       app.saveData(cmds)
      });
    },
    
    saveData: function(data) {
     fs.appendFile('log.txt', JSON.stringify(data, null, 2) + '\n=', function(err) {
        if(err) {
          console.log(err);
        }
     });
   }
    }

    // app[process.argv[2]]();
    app[process.argv[2]](process.argv[3]);