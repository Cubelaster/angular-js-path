(function () {

    var app = angular.module('app', ['ngRoute']);

    app.config(['$logProvider', '$routeProvider', '$locationProvider', function ($logProvider, $routeProvider, $locationProvider) {

        $logProvider.debugEnabled(true);

        // $locationProvider.hashPrefix('!');
        /* flag: Html5Bang - this is used in Html5 mode for routing. If the ! is added, it's required to change the links as well, so that Angular knows what to look for.
        LocationProvider allows for modifying the links so the look different.
        Also, locationProvider has html5Mode which removes # alltogether. 
        */
        $locationProvider.html5Mode(true);
        // {
        //     enabled: true,
        //     requiredBase: true,
        //     rewriteLinks: true
        // }); // true in first line means the same as commented object literall

        $routeProvider
            .when('/', {
                controller: "HomeController",
                controllerAs: "home",
                templateUrl: "/app/templates/home.html"
            })
            .when('/schools', {
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: '/app/templates/allSchools.html',
            })
            .when('/classrooms', {
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: '/app/templates/allClassrooms.html',
                // caseInsensitiveMatch: true, // url is case sensitive by default
                // redirectTo: '/schools',
                // redirectTo: function (params, currPath, currSearch) {
                //     console.log(params);
                //     console.log(currPath);
                //     console.log(currSearch);
                //     return '/schools';
                // },
                // resolve: {
                //     promise: function () {
                //         throw "error transitioning to classrooms";
                //     }
                // }
            })
            .when('/activities', {
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: '/app/templates/allActivities.html',
                caseInsensitiveMatch: true,
                resolve: {
                    activities: function (dataService) {
                        return dataService.getAllActivities();
                    }
                }
            })
            .when('/classrooms/:id', {
                templateUrl: '/app/templates/classroom.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom'
            })
            .when('/classrooms/:id/detail/:month?', {
                // question mark on parameter in the link makes it optional
                templateUrl: '/app/templates/classroomDetail.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom'
            })
            .otherwise('/');

    }]);

    // app.run(['$rootScope', '$log', function ($rootScope, $log) {
    //     $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    //         $log.debug('successfully changed routes');

    //         $log.debug(event);
    //         $log.debug(current);
    //         $log.debug(previous);
    //     });

    //     $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
    //         $log.debug('Unsuccessfully changed routes');

    //         $log.debug(event);
    //         $log.debug(current);
    //         $log.debug(previous);
    //         $log.debug(rejection);
    //     });
    // }]);

} ());