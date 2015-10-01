var fauxPas = require('./lib/faux-pas'),
    config = require("./.twitter.json");

var opts = {
  mentioned_user: "tomcardoso",
  intended_user: "tom_cardoso",
  credentials: {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
  },
  bot_name: "tom_cardoso_bot",
  count: 20
};

fauxPas(opts, function(err, result) {
  if (!err) {
    console.log(result);
  } else {
    console.log(err);
  }
});