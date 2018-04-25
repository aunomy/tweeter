$(document).ready(function(event) {
  $(".new-tweet").find("textarea").on("keyup", function(event) {
    const inputValue = $(this).val();
    const numberOfChars = inputValue.length;
    const numberRemaining = 140 - numberOfChars;
    $(this).siblings(".counter").text(numberRemaining);
    const counter = $(this).siblings(".counter");
    if (numberRemaining < 0) {
      counter.css({"color":"red"});
    } else {
      counter.css({"color":"black"});
    }
  });
});
