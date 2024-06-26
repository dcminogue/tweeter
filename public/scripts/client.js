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
    {
        user: {
            name: "Newton",
            avatars: "https://i.imgur.com/73hZDYK.png",
            handle: "@SirIsaac",
        },
        content: {
            text: "If I have seen further it is by standing on the shoulders of giants",
        },
        created_at: 1711600892431,
    },
    {
        user: {
            name: "Descartes",
            avatars: "https://i.imgur.com/nlhLi3I.png",
            handle: "@rd",
        },
        content: {
            text: "Je pense , donc je suis",
        },
        created_at: 1711687292431,
    },
];

$(document).ready(function () {
    $(".new-tweets").on("submit", onTweetSubmit);
    loadTweets();
});

const tweetButton = $("#tweet-button").on("click", function () {
    $(".new-tweet").toggleClass("hide");
});

const createTweetElement = function (userTweet) {
    const timeISOString = new Date(userTweet.created_at).toISOString();
    const timeAgoString = $.timeago(timeISOString);
    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };
    const element = `
    <article class="tweet-container">
    <div class="tweet-header">
        <div class="tweet-header-left"> <img src="${userTweet.user.avatars}"/>
        <h2>${userTweet.user.name}</h2> </div>
        <h2 class="user-handle">${userTweet.user.handle}</h2>
    </div>
    <p
        class="tweet-area"
        name="tweets"
        id="tweets"
        
    >${escape(userTweet.content.text)}
    </p>
    <div class="tweet-footer">
        <p>${timeAgoString} </p>
        <ul>
            <li><i class="fa-solid fa-flag"></i></li>
            <li><i class="fa-solid fa-retweet"></i></li>
            <li><i class="fa-solid fa-heart"></i></li>
        </ul>
    </div></article>
    `;
    return element;
};

const renderTweets = function (users) {
    // Clear existing tweets before rendering new ones
    $(".tweets-container").empty();
    for (const user of users) {
        const element = createTweetElement(user);
        $(".tweets-container").prepend(element);
    }
};

const loadTweets = function () {
    // Use jQuery to make an AJAX GET request to fetch tweets
    $.ajax({
        url: "/tweets", // Assuming this is the endpoint to get tweets
        method: "GET",
        dataType: "json", // Expecting JSON response
        success: tweets => {
            // Now that we have tweets, call renderTweets
            renderTweets(tweets);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error("Error fetching tweets: ", textStatus, errorThrown);
            // Handle any errors that occur during the fetch here
        },
    });
};

const onTweetSubmit = function (event) {
    event.preventDefault();

    if ($("#tweet-text").val() === "") {
        $("#error-message").text("Please enter text before submitting.");
        $("#error-message").removeClass("hide");
        return;
    }
    if ($("#counter").val() < 0) {
        $("#error-message").text("Tweet is too long!!!");
        $("#error-message").removeClass("hide");
        return;
    }

    $("#tweet-text").on("keyup", () => {
        $("#error-message").addClass("hide");
    });
    const $form = $(this);
    const data = $form.serialize();

    $.post("/tweets", data)
        .then(() => {
            // Optionally, fetch and display the latest tweets here
            loadTweets(); // Assuming loadTweets is a function that fetches and displays tweets
            $("#tweet-text-label").text("What are you humming about?"); // This resets the form fields
            $("#counter").text("140");
            // Clear the form fields
            $form.trigger("reset"); // This resets the form fields
            $("#error-message").addClass("hide");
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error("Error submitting tweet: ", textStatus, errorThrown);
            // Inform the user about the error, possibly using an alert or updating the DOM
        });
};
