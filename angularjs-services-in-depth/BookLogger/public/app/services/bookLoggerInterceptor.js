(function () {
    angular.module('app')
        .factory('bookLoggerInterceptor', [
            '$q', '$log', bookLoggerInterceptor
        ]);

    function bookLoggerInterceptor($q, $log) {
        return {
            request: requestInterceptor,
            responseError: responseErrorInterceptor
        };

        function requestInterceptor(config) { // http configuration object
            $log.debug('HTTP ' + config.method + ' request - ' + config.url);
            return config;
        }

        function responseErrorInterceptor(response) { // http response object
            $log.debug('HTTP ' + response.config.method + ' response error - ' + response.config.url);
            return $q.reject(reponse);
        }
    }
} ());