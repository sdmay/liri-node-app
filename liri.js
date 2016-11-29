
var twit = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
// var args = [process.args[2]]
var nodeArgs = process.argv;

var twitter = new twit({
        consumer_key: 'y31gvwer7zSp1sjQue2xKGbFn',
        consumer_secret: 'bzjuFnTCVsc3dtBHTHilVPimvM2Jjexr2N3erFNvGWxSd7tuVZ',
        access_token_key: "249584013-ExAXXf5ocp0cgabQRyNZj7eLthfvfGhy0tFwKnq4",
        access_token_secret: "twD6LWYsRHiWhJkddZPfQ7tw8rEeNqks0XQrb6z5DYrde"
});


var app = {
"my-tweets": function (){ 
    twitter.get('search/tweets',{q: "ScottDMay", count:20}, function(err, myData, response){
        if(!err){

            

            // var tweetData = JSON.parse(myData);
        myTweet = myData.statuses;
        // myData.forEach(function(obj){
    // console.log(obj.text);
        // });
        //  var tweetData = JSON.parse(myData);
        console.log(myData);
        app.saveData(myData);
        
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

  "spotify-this-song": function(keyword) {
      var args = [process.argv[3]] 
     spotify.search({ type: 'track', query: keyword }, function(err, data) {
       if ( err ) {
          console.log('Error occurred: ' + err);
           return;
       }
       
       if(args === null){

        keyword === "The Sign Ace of Base";
        console.log('Artist: ' + record.artists[0].name);
        console.log('Name: ' + record.name);
        console.log('Link: ' + record.preview_url);
        console.log('Album: ' + record.album.name);
        // console.log('Artist: ' + "Ace of Base");
        // console.log('Name: ' + "The Sign");
        // console.log('Link: ' + record.preview_url);
        // console.log('Album: ' + "The Sign (US Album) [Remastered]");
       }

       if(data.tracks.items.length > 0) {
         var record = data.tracks.items[0];
 
        console.log('Artist: ' + record.artists[0].name);
        console.log('Name: ' + record.name);
        console.log('Link: ' + record.preview_url);
        console.log('Album: ' + record.album.name);
     
        
      } 
      else {
        console.log('None Found');
      }

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

 "movie-this": function(query) {
     request('http://www.omdbapi.com/?t=' + (query) +'&tomatoes=true', function (error, response, info) {
       if (!error && response.statusCode == 200) {

          
  
//            for (var i=2; i<nodeArgs.length; i++){

//     if (i>2 && i< nodeArgs.length){

//         movieData = movieData + "+" + nodeArgs[i];

//     }

//     else {

//         movieData = movieData + nodeArgs[i];
//     }
// }
if(query = true){
 var movieData = JSON.parse(info);
    
 

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
       
       }}
       else {
           console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/ on Netflix!")
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
       
       var s = data.split(",")

    for (var i = 0; i < s.length; i++) {

	    console.log(s[i]);};
 
    //    var words = data.toString().split('');
    //    console.log(data.toString());
       app.saveData(s[i])
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

    app[process.argv[2]]();
    app[process.argv[2]](process.argv[3]);