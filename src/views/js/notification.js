define([], function () {
    function display(message, bgColor) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";

        // change the bgColor according to the context
        x.style.backgroundColor = bgColor;

        // Update the content of notification with given message
        x.innerHTML = message;

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    return {display}
})