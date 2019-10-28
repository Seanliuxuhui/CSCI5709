// function for making general http request
define([], function () {
    var httpRequest = function(options) {
        return new Promise(function (resolve, reject) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.open(options.method, options.url);
            
            httpRequest.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    var responseData = JSON.parse(httpRequest.responseText);
                    if (responseData.status === 'Success') {
                        resolve(responseData.data)
                    } else {
                        reject({
                            status: responseData.status,
                            statusText: responseData.message,
                        });
                    }
                } else {
                    reject( {
                        status: this.status,
                        statusText: httpRequest.statusText
                    });
                }
            };
            
            httpRequest.onerror = function () {
                reject ({
                    status: this.status,
                    statusText: httpRequest.statusText
                })
            };

            if (options.headers) {
                Object.keys(options.headers).forEach(function (key) {
                    httpRequest.setRequestHeader(key, options.headers[key]);
                })
            }

            var params = options.params;

            if (options.params) {
                params = Object.keys(params).map(function (key) {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
                }).join('&');
            }
            httpRequest.send(params);
        })
    };

    return {httpRequest}
})