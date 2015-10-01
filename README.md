# Faux Pas

A Twitter API 1.1 bot that listens for tweets @ a specific user, and replies redirecting the tweeting user to another handle.

### Why?

By the time I'd signed up for Twitter, I'd missed the chance to get [@tomcardoso](http://www.twitter.com/tomcardoso), and was stuck with [@tom_cardoso](http://www.twitter.com/tom_cardoso) instead. Occasionally, people will tweet at @tomcardoso instead of my actual handle, so this bot tweets at them and suggests they might want to tweet at @tom_cardoso instead. (This isn't terribly rude because @tomcardoso has been inactive for years. Please be polite when using this bot.)

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

Once that's done,


