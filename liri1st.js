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
  
      
 
  

