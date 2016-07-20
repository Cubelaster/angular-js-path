(function () {

    angular.module('app')
        .controller('BooksController',
        ['books', 'dataService', 'logger', 'badgeService', BooksController]);

    function BooksController(books, dataService, logger, badgeService) {

        var vm = this;//viewModel
        vm.appName = books.appName;
        dataService.getAllBooks().then(getBooksSuccess,
            null, getBooksNotification)
            .catch(errorCallback);
        vm.allReaders = dataService.getAllReaders();

        vm.getBadge = badgeService.retrieveBadge;

        logger.output('BooksController was created!');

        function getBooksSuccess(books) {
            throw 'Intentional error!';
            vm.allBooks = books;
        }

        function getBooksError(reason) {
            logger.output('GetAllBooks failed: ' + reason);
        }

        function getBooksNotification(notification) {
            logger.output('Promise Notification: ' + notification);
        }

        function errorCallback(error) {
            logger.output('Error Message: ' + error);
        }
    }
} ());