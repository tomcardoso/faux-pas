var twit = require("twit"),
    fs = require("fs");

var Twitter,
    lastId,
    botName,
    lastIdFileName,
    lastIdStr,
    lastDate,
    date,
    searchObj;

var fauxStatus = {};

function reportStatus(msg) { console.log(msg) }

function tweet(opts, callback) {
  Twitter = new twit(opts.credentials),
  botName = (opts.bot_name) ? opts.bot_name + '-' : '',
  lastIdFileName = __dirname + '/last-ids/' + botName + 'last-id.json',
  lastIdStr = fs.existsSync(lastIdFileName) ? JSON.parse(fs.readFileSync(lastIdFileName)).lastIdStr : null;

  searchObj = {
    q: '@' + opts.mentioned_user,
    count: opts.count || 20
  };

  if (lastIdStr) { searchObj.since_id = lastIdStr; }

  Twitter.get('search/tweets', searchObj, function(err, data, response) {
    if (!err) {
      if (!data.statuses.length) {
        fauxStatus.searchParams = searchObj;
        constructTweets(data, opts.mentioned_user, opts.intended_user, lastIdFileName, lastIdStr, callback);
        recordId(data.statuses, lastIdFileName);
      } else {
        reportStatus("No recent tweets to reply to.")
      }
    } else {
      callback(err, null);
    }
  });

}

function constructTweets(data, mentioned_user, intended_user, lastIdFileName, lastIdStr, callback) {

  var statuses = data.statuses;

  fauxStatus.lastIdStr = lastIdStr;
  fauxStatus.mentioned_user = mentioned_user;
  fauxStatus.intended_user = intended_user;

  for (var i = 0; i < statuses.length; i++) {
    if (statuses[i].id_str > lastIdStr) {
      fauxStatus.tweet_index = (i + 1) + ' of ' + (statuses.length);

      Twitter.post('statuses/update', {
          status: "Hey @" + statuses[i].user.screen_name + "! Looks like you tweeted at @" + mentioned_user + ', but you probably meant to send that to @' + intended_user
        }, function(err, data, response) {
          if (!err) {
            callback(null, fauxStatus);
            reportStatus("Successfully tweeted at: @" + statuses[i].user.screen_name);
          } else {
            callback(err, null);
          }
        });

    }
  }

}

function recordId(arr, fileName) {
  if (arr.length) {
    var mostRecentTweet = arr[0],
        lastIdJSON = {
          lastId: mostRecentTweet.id,
          lastIdStr: mostRecentTweet.id_str
        };

    fs.writeFile(fileName, JSON.stringify(lastIdJSON), function(err) {
      if (!err) {
        reportStatus("Latest ID saved: \n" + JSON.stringify(lastIdJSON));
      } else {
        reportStatus("Error: couldn't save latest ID.");
      }
    });
  }
}

module.exports = tweet;