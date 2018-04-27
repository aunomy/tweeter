$(function() {

$("textarea").focus();

// Toggles Compose box
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

// Constructs new tweets
function createTweetElement(tweetObject) {
    let $tweet   = $("<article>").addClass("tweet")

    const header = $("<header>")
    $("<span>").addClass("handle").text(tweetObject.user.handle).appendTo(header);
    $("<img>").attr('src', tweetObject.user.avatars.small).appendTo(header);
    $("<h2>").addClass("name").text(tweetObject.user.name).appendTo(header);
    $tweet.append(header);

    $("<p>").text(tweetObject.content.text).appendTo($tweet);

    const footer = $("<footer>")
    const icons  = $("<span>").addClass("icons")
    $("<i>").addClass("fas fa-heart").appendTo(icons);
    $("<i>").addClass("fas fa-retweet").appendTo(icons);
    $("<i>").addClass("fas fa-flag").appendTo(icons);
    footer.append(icons);
    $("<p>").addClass("time-stamp").text(moment.utc(tweetObject.created_at).fromNow()).appendTo(footer);
    $tweet.append(footer);

    return $tweet;
};

  $("form").on("submit", function (e) {
    const data         = $(this).serialize();
    const tweetContent = ($.trim($(this.text).val()));

  // Conditions to validate tweet post or generate disappearing error message
  if (tweetContent.length === 0) {
    $(function() {
      setTimeout(function() { $(".new-tweet .error").fadeOut(500); }, 3000)
    $(".new-tweet .error").show();
      setTimeout(function() { $(".new-tweet .error").fadeOut(500); }, 3000)
    });
    var $errMsg = "Cannot submit an empty tweet!";
  } else if (tweetContent.length > 140) {
    $(function() {
      setTimeout(function() { $(".new-tweet .error").fadeOut(500); }, 3000)
    $(".new-tweet .error").show();
      setTimeout(function() { $(".new-tweet .error").fadeOut(500); }, 3000)
    });
    var $errMsg = "Cannot submit tweet exceeding 140 characters!";
    e.preventDefault();
    return $(".new-tweet .error").text($errMsg);
  }

  e.preventDefault();

  // Post request, generates and prepends new tweet, resets form,
  // on fail will populate error tag with relevant message
  $.ajax({
    method: "POST",
    url: "/tweets/",
    data: data
  }).done(function (e) {
    $("#tweets").prepend(createTweetElement(e));
    $("form")[0].reset();
    $(".counter").text(140);
  }).fail(function (e) {
    $(".new-tweet .error").text($errMsg)})
});

 // Get request to load existing tweets and populate main container
 // in reverse-chronological order using renderTweets()
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).done(function (data) {
      renderTweets(data.reverse());
    }).fail(function (e) {
      alert("Failed to load tweets. Please refresh or try again later.")
    })
  };

loadTweets();

});
