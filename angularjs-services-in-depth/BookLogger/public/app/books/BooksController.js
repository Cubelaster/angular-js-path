(function () {

    angular.module('app')
        .controller('BooksController',
        ['books', '$q', 'dataService', 'logger', 'badgeService', BooksController]);

    function BooksController(books, $q, dataService, logger, badgeService) {

        var vm = this;//viewModel
        vm.appName = books.appName;
        vm.getBadge = badgeService.retrieveBadge;

        // dataService.getAllBooks().then(getBooksSuccess,
        //     null, getTaskNotification)
        //     .catch(errorCallback)
        //     .finally(taskComplete('getAllBooks'));

        // dataService.getAllReaders()
        //     .then(getReadersSuccess, null, getTaskNotification)
        //     .catch(errorCallback)
        //     .finally(taskComplete('getAllReaders'));

        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        $q.all([booksPromise, readersPromise])
            .then(getAllDataSuccess)
            .catch(errorCallback)
            ;

        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

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