$(function() {

  $("textarea").focus();

$(".toggle").on("click", function(event) {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
});

function renderTweets(tweetData) {
  $("#tweets").empty();
  for (let currentTweet of tweetData) {
  $("#tweets").append(createTweetElement(currentTweet));
  }
};

function createTweetElement(tweetObject) {

    let $tweet = $("<article>").addClass("tweet")

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

$("form").on("submit", function (e) {
  const data = $(this).serialize();
  const tweetContent = ($.trim($(this.text).val()));

  if (tweetContent.length === 0) {
    var $errMsg = "Error: cannot submit an empty tweet!";
  } else if (tweetContent.length > 140) {
    var $errMsg = "Error: cannot submit tweet exceeding 140 characters!";
    e.preventDefault();
    return $(".new-tweet .error").text($errMsg);
  }

  $(".new-tweet .error").text($errMsg);

  e.preventDefault();

  $.ajax({
    method: "POST",
    url: "/tweets/",
    data: data
  }).done(function (e) {
    loadTweets();
    $("form")[0].reset();
    $(".counter").text(140);
  }).fail(function (e) {
  })
});

  const loadTweets = function() {
      $.ajax({
      url: "/tweets",
      method: "GET",
    }).done(function (data) {
      renderTweets(data.reverse());
    });
};

loadTweets();

});
