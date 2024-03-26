/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// document.addEventListener("dblclick", e => {
//     console.log(e);
//     console.log("X-axis:", e.x, "Y-axis:", e.y);
// });
const newText = document.getElementById("practice");

newText.addEventListener("input", e => {
    console.log(e);
    console.log("input:", e.target.value);
});
newText.addEventListener("keyup", e => {
    console.log(e);
    console.log("keyup:", e.key);
});
newText.addEventListener("keypress", e => {
    console.log(e);
    console.log("keypress:", e.key);
});
newText.addEventListener("keydown", e => {
    console.log(e);
    console.log("keydown:", e.key);
});
