define(['router', 'request'], function (router, request) {
    var out = function () {
        sessionStorage.clear();
        router.redirect('home.html')
    }
    return {out};
})