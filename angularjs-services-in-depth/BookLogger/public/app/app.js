(function () {

    var app = angular.module('app', []);

    app.provider('books', function () {

        this.$get = function () {
            var version = '1.0';
            var appName = 'Book Logger';
            var appDesc = 'Track which books you read.';

            if (includeVersionInTitle) {
                appName += ' ' + version;
            };

            return {
                appName: appName,
                appDesc: appDesc
            };
        };

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };

    });

    // app.config(function($provide) {
    //     $provide.provider('books', function () {
    //         this.$get = function() {
    //             var appName = 'Book Logger';
    //             var appDesc = 'Track which books you read.';

    //             return {
    //                 appName: appName,
    //                 appDesc: appDesc
    //             };
    //         };
    //     });
    // });
    // the provider function is available on the angular.module so this has been transfered on provider

    app.config(function (booksProvider) {
        booksProvider.setIncludeVersionInTitle(true);
    });

} ());