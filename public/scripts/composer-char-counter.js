let $textarea = $("#tweet-text");
let $counterText = $("#counter");

const writeTweet = function () {
    let $count = 140;
    let $textVal = $(this).val();
    $count = $count - $textVal.length;
    let $counter = $("#counter");
    $counter.text($count);

    if ($count < 0) {
        $counter.addClass("counter-red");
    } else {
        $counter.removeClass("counter-red");
    }
};

$(document).ready(function () {
    $textarea.on("keyup", writeTweet);
});
