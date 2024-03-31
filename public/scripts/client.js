/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// document.addEventListener("dblclick", e => {
//     console.log(e);
//     console.log("X-axis:", e.x, "Y-axis:", e.y);
// });

const tweetData = [
    // {
    //     user: {
    //         name: "Newton",
    //         avatars: "https://i.imgur.com/73hZDYK.png",
    //         handle: "@SirIsaac",
    //     },
    //     content: {
    //         text: "If I have seen further it is by standing on the shoulders of giants",
    //     },
    //     created_at: 1711600892431,
    // },
    // {
    //     user: {
    //         name: "Descartes",
    //         avatars: "https://i.imgur.com/nlhLi3I.png",
    //         handle: "@rd",
    //     },
    //     content: {
    //         text: "Je pense , donc je suis",
    //     },
    //     created_at: 1711687292431,
    // },
];

$(() => {
    $(".new-tweets").on("submit", onTweetSubmit);

    loadTweets();
});

const onTweetSubmit = function (event) {
    event.preventDefault();
    const $form = $(this);
    const data = $form.serialize();
    console.log(data);

    $.post("/tweets", data)
        .then(() => {
            console.log("Sent to server");
            // Clear the form fields
            $form.trigger("reset"); // This resets the form fields
            // Optionally, fetch and display the latest tweets here
            loadTweets(); // Assuming loadTweets is a function that fetches and displays tweets
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error("Error submitting tweet: ", textStatus, errorThrown);
            // Inform the user about the error, possibly using an alert or updating the DOM
        });
};

const loadTweets = function () {
    // Use jQuery to make an AJAX GET request to fetch tweets
    $.ajax({
        url: "/tweets", // Assuming this is the endpoint to get tweets
        method: "GET",
        dataType: "json", // Expecting JSON response
        success: tweets => {
            console.log("Fetch successful!");
            // Now that we have tweets, call renderTweets
            renderTweets(tweets);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error("Error fetching tweets: ", textStatus, errorThrown);
            // Handle any errors that occur during the fetch here
        },
    });
};

// const loadTweets = function () {
//     renderTweets(tweetData);
// };

const convertDate = date => {
    const now = Date.now();
    const diff = Math.floor((now - date) / 1000 / 60 / 60 / 24);
    return diff;
};

const renderTweets = function (users) {
    // Clear existing tweets before rendering new ones
    $(".tweets-container").empty();
    for (const user of users) {
        const element = createTweetElement(user);
        $(".tweets-container").append(element);
    }
};

const createTweetElement = function (userTweet) {
    const days = convertDate(userTweet.created_at);
    const element = `
    <article class="tweet-container">
    <div class="tweet-header">
        <div class="tweet-header-left"> <img src="${userTweet.user.avatars}"/>
        <h2>${userTweet.user.name}</h2> </div>
        <h2>${userTweet.user.handle}</h2>
    </div>
    <textarea
        class="tweet-area"
        name="tweets"
        id="tweets"
        required
    >${userTweet.content.text}
    </textarea>
    <div class="tweet-footer">
        <h2>${days} days ago.</h2>
        <ul>
            <li><i class="fa-solid fa-flag"></i></li>
            <li><i class="fa-solid fa-retweet"></i></li>
            <li><i class="fa-solid fa-heart"></i></li>
        </ul>
    </div></article>
    `;
    return element;
};
