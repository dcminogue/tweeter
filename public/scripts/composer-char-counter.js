const app = {};
app.writeTweet = function () {
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
    let $textarea = $("#tweet-text");
    $textarea.on("keyup", app.writeTweet);
});
