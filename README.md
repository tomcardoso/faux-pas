# Faux Pas

A Twitter API 1.1 bot that listens for tweets @ a specific user, and replies redirecting the tweeting user to another handle.

### Why?

By the time I'd signed up for Twitter, I'd missed the chance to get [@tomcardoso](http://www.twitter.com/tomcardoso), and was stuck with [@tom_cardoso](http://www.twitter.com/tom_cardoso) instead. Occasionally, people will tweet at @tomcardoso instead of my actual handle, so this bot tweets at them and suggests they might want to tweet at @tom_cardoso instead. (This isn't terribly rude because @tomcardoso has been inactive for years. Please be polite when using this bot.)

Faux Pas' code is heavily inspired by [Michael Keller](https://github.com/mhkeller)'s [mockingjay](https://github.com/csvsoundsystem/mockingjay).

### Installation

Make sure you have [Node.js](http://nodejs.org) installed, then do:
```
npm install faux-pas
```

### Usage

First, create a file called `.twitter.json` in the project's root directory and add your API keys to it as such:
```
{
  "consumer_key": "your consumer key here",
  "consumer_secret": "your consumer secret here",
  "access_token": "your access token here",
  "access_token_secret": "your access token secret here"
}
```

Once that's done, you'll want to customize the `opts` variable in `index.js` as so:
```
var opts = {
  mentioned_user: "example_user_name", // the Twitter handle you'd like to track goes here
  intended_user: "your_user_name", // the Twitter account you want to redirect people to
  credentials: {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
  },
  bot_name: "your_bot_name", // the name of your bot
  count: 20
};
```

### Crontab

This package is meant to be run on a cron. Here's an example setup that runs it on the 1s

`1,11,21,31,41,51 * * * * /usr/bin/node /home/ubuntu/tasks/botname/index.js`

Alternatively if you want to run it locally just once, you just need to do:
`node index.js`

### Troubleshooting

More often than not, if you're having a problem after setting up the scripts, it's because the `/last-ids` folder is missing. Try recreating the folder and everything should (hopefully) work… more or less.