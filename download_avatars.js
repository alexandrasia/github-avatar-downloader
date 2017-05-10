var https = require('https');
var request = require('request');
var fs = require('fs');

var GITHUB_USER = "alexandrasia";
var GITHUB_TOKEN = "34e385afa92200d96841cdd8f866ef962a008d07";

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner | !repoName) {
    console.log("Please specify a valid Repo Owner and Repo Name!");
    return;
  }
  var options = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'alexandrasia'
    }
  };
  request(options, cb);
}

function downloadImageByURL (url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result, body) {
  var parsedResults = JSON.parse(body);
  for (var i = 0; i < parsedResults.length; i++) {
    var avatarUrl = parsedResults[i]["avatar_url"];
    downloadImageByURL(avatarUrl, `avatars/${i}.jpg`);
  }
});