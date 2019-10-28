// author: liuxuhui
define([], function () {
    // help with redirection
    var redirect = function (desitination) {
        window.location = desitination;
    };
    return {redirect};
})