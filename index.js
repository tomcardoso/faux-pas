var fauxPas = require('faux-pas'),
    config = require("./.twitter.json");

var opts = {
  mentioned_user: "mentioned_user_goes_here",
  intended_user: "intended_user_goes_here",
  credentials: {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
  },
  bot_name: "your_bot_name_here",
  count: 20
};

fauxPas(opts, function(err, result) {
  if (!err) {
    console.log(result);
  } else {
    console.log(err);
  }
});