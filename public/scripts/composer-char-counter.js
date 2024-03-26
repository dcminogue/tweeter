let $textarea = $("#tweet-text");
let $counterText = $("#counter");

const writeTweet = function () {
    let $count = 140;
    const $textVal = $textarea.val();
    $count = $count - $textVal.length;
    $counterText.text($count);
};

$(document).ready(function () {
    $textarea.on("keyup", writeTweet);
});
