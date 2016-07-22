(function () {

    var app = angular.module('app', ['ngRoute', 'ngCookies']);

    app.provider('books', ['constants', function (constants) {

        this.$get = function () {
            var version = constants.APP_VERSION;
            var appName = constants.APP_TITLE;
            var appDesc = constants.APP_DESCRIPTION;

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

    }]);

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

    app.config(['booksProvider', '$routeProvider', '$logProvider',
        function (booksProvider, $routeProvider, $logProvider) {
            booksProvider.setIncludeVersionInTitle(true);

            $logProvider.debugEnabled(false);

            // console.log('Title from constants service: ' + constants.APP_TITLE);
            // console.log(dataServiceProvider.$get);

            $routeProvider
                .when('/', {
                    templateUrl: '/app/templates/books.html',
                    controller: 'BooksController',
                    controllerAs: 'books'
                })
                .when('/AddBook', {
                    templateUrl: '/app/templates/addBook.html',
                    controller: 'AddBookController',
                    controllerAs: 'bookAdder'
                })
                .when('/EditBook/:bookId', {
                    templateUrl: '/app/templates/editBook.html',
                    controller: 'EditBookController',
                    controllerAs: 'bookEditor'
                    // resolve: {
                    //     books: function (dataService) {
                    //         // throw 'Intentional error!';
                    //         return dataService.getAllBooks();
                    //     }
                        // resolve is meant to halt the rendering of html untill the data is ready to be binded
                    }
                )
                .otherwise('/')
                ;

        }]);

    app.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            console.log('Successfully changed routes!');
        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            console.log('Error changing routes!');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
        });
    }]);

} ());