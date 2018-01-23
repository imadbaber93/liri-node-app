require("dotenv").config();
//var spotify = new Spotify(keys.spotify)
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var client = new Twitter({
	consumer_key: keys.twitterkeys.consumer_key,
	consumer_secret: keys.twitterkeys.consumer_secret,
	access_token_key: keys.twitterkeys.access_token_key,
  	access_token_secret: keys.twitterkeys.access_token_secret
});

var spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});


//console.log(client.consumer_key);

//var params = {screen_name: 'nodejs'};
if (process.argv[2] == 'my-tweets'){
	client.get("statuses/user_timeline", function(error, tweets, response) {
		//console.log(tweets);
 	var count = 20;
 	console.log('last 20 tweets:')
    for (i=0; i<tweets.length;i++){
    console.log(count + ': "' + tweets[i].text + '" Created on: ' +  tweets[i].created_at);
    count--;
	}
  });
}
 else if (process.argv[2] == 'spotify-this-song'){

 	if (process.argv[3] == null) {
 	spotify.search({type:'track', query: 'The Sign Ace of Base' }, function(error, data) {
 		if (error){
 			return console.log('error occured: ' + error);
 		}
 		//console.log(JSON.stringify(data.tracks.items[0],null,2));
 		console.log('Song name: ' + JSON.stringify(data.tracks.items[0].name,null,2));
 		console.log('Artist name: ' + JSON.stringify(data.tracks.items[0].album.artists[0].name,null,2));
 		console.log('Album name: ' + JSON.stringify(data.tracks.items[0].album.name,null,2));
 		console.log('Preview URL: ' + JSON.stringify(data.tracks.items[0].preview_url,null,2));
 		//console.log(JSON.stringify(data,null,2));
 	});
 }
 	else {
 		var song = "";
 		for (var i=3; i<process.argv.length; i++){
 			song = (song + " " + process.argv[i]).trim();
 		}
 		//console.log(song);

 			spotify.search({type:'track', query: song }, function(error, data) {
 		if (error){
 			return console.log('error occured: input not valid.');
 		}
 		//console.log(JSON.stringify(data.tracks.items[0],null,2));
 		console.log('Song name: ' + JSON.stringify(data.tracks.items[0].name,null,2));
 		console.log('Artist name: ' + JSON.stringify(data.tracks.items[0].album.artists[0].name,null,2));
 		console.log('Album name: ' + JSON.stringify(data.tracks.items[0].album.name,null,2));
 		console.log('Preview URL: ' + JSON.stringify(data.tracks.items[0].preview_url,null,2));
 	 });
	}
}

else if (process.argv[2] == "movie-this") {
	if (process.argv[3] == null){
		request('http://www.omdbapi.com/?t=' + "Mr.Nobody" + "&apikey=trilogy", function (error, response, data) {
		movieData = JSON.parse(data);
		console.log("Movie title: " + movieData.Title + '\n' 
		+ "Year: " + movieData.Year + '\n'
		+ "IMDB Rating: " + movieData.imdbRating +'\n' 
		+ "Rotten tomatoes rating: " + movieData.Ratings[1].Value + '\n'
		+ "Country where movie was made: " + movieData.Country + '\n'
		+ "Language: " + movieData.Language + '\n' 
		+ "Movie Plot: " + movieData.Plot + '\n' 
		+ "Actors: " + movieData.Actors);
	});
	}
	else{
	var movie = "";
	for (var i=3;i<process.argv.length;i++){
		movie = (movie + " " + process.argv[i].trim());
	}
	request('http://www.omdbapi.com/?t=' + movie + "&apikey=trilogy", function (error, response, data) {
		movieData = JSON.parse(data);
		//console.log(movieData);
		console.log("Movie title: " + movieData.Title + '\n' 
		+ "Year: " + movieData.Year + '\n'
		+ "IMDB Rating: " + movieData.imdbRating +'\n' 
		+ "Rotten tomatoes rating: " + movieData.Ratings[1].Value + '\n'
		+ "Country where movie was made: " + movieData.Country + '\n'
		+ "Language: " + movieData.Language + '\n' 
		+ "Movie Plot: " + movieData.Plot + '\n' 
		+ "Actors: " + movieData.Actors);
		});
	}
}
else if (process.argv[2] == "do-what-it-says") {
	fs.readFile("random.txt","utf8", function(error,data) {
		if (error) {
			console.log(error);
		}
		else {
			var dataArr = data.split(",");
			if (dataArr[0] === "spotify-this-song") {
				spotify.search({type:'track', query: dataArr[1] }, function(error, data) {
 					if (error){
 						return console.log('error occured: ' + error);
 						}
 		//console.log(JSON.stringify(data.tracks.items[0],null,2));
	 		console.log('Song name: ' + JSON.stringify(data.tracks.items[0].name,null,2));
	 		console.log('Artist name: ' + JSON.stringify(data.tracks.items[0].album.artists[0].name,null,2));
	 		console.log('Album name: ' + JSON.stringify(data.tracks.items[0].album.name,null,2));
	 		console.log('Preview URL: ' + JSON.stringify(data.tracks.items[0].preview_url,null,2));
				})
			}
		}
	});
};


// client.get('statuses/lookup',function(error,tweets,response){
// 	//if (error) throw error;
// 	console.log(tweets);
// });

// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//    console.log(tweets);
// });