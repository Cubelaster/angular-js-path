(function () {

    angular.module('app')
        .controller('BooksController',
        ['books', 'dataService', 'logger', 'badgeService', BooksController]);

    function BooksController(books, dataService, logger, badgeService) {

        var vm = this;//viewModel
        vm.appName = books.appName;
        
        dataService.getAllBooks().then(getBooksSuccess,
            null, getTaskNotification)
            .catch(errorCallback)
            .finally(taskComplete('getAllBooks'));

        dataService.getAllReaders()
            .then(getReadersSuccess, null, getTaskNotification)
            .catch(errorCallback)
            .finally(taskComplete('getAllReaders'));

        vm.getBadge = badgeService.retrieveBadge;


        function getBooksSuccess(books) {
            vm.allBooks = books;
        }

        function getBooksError(reason) {
            logger.output('GetAllBooks failed: ' + reason);
        }

        function getTaskNotification(notification) {
            logger.output('Promise Notification: ' + notification);
        }

        function errorCallback(error) {
            logger.output('Error Message: ' + error);
        }

        function getAllBooksComplete() {
            logger.output('dataService\'s GetAllBooks completed!');
        }

        function taskComplete(taskName) {
            logger.output('dataService\'s ' + taskName + ' completed!');
        }

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
        }
    }
} ());