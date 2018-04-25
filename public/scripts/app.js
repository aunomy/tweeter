$(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

function renderTweets(tweetData) {
  for (let currentTweet of tweetData) {
  $('#tweets').append(createTweetElement(currentTweet));
  }
};

function createTweetElement(tweetObject) {

  let $tweet = $('<article>').addClass('tweet')

    const header = $("<header>")

    $("<span>").addClass("handle").text(tweetObject.user.handle).appendTo(header);
    $("<img>").attr('src', tweetObject.user.avatars.small).appendTo(header);
    $("<h2>").addClass("name").text(tweetObject.user.name).appendTo(header);

    $tweet.append(header);

    $("<p>").text(tweetObject.content.text).appendTo($tweet);

    const footer = $("<footer>")


    const icons = $("<span>").addClass("icons")

    $("<i>").addClass("fas fa-heart").appendTo(icons);
    $("<i>").addClass("fas fa-retweet").appendTo(icons);
    $("<i>").addClass("fas fa-flag").appendTo(icons);

    footer.append(icons);

    $("<p>").addClass("time-stamp").text(tweetObject.created_at).appendTo(footer);

    $tweet.append(footer);

  return $tweet;
};

renderTweets(data);

});
