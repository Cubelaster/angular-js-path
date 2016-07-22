(function () {

    angular.module('app')
        .controller('BooksController',
        [
            'books', '$q', 'dataService', 'logger', 'badgeService', '$cookies',
            '$cookieStore', '$log', '$route', 'BooksResource', 'currentUser',
            BooksController
        ]);

    function BooksController(
        books, $q, dataService, logger, badgeService, $cookies, 
        $cookieStore, $log, $route, BooksResource, currentUser
    ) {

        var vm = this;//viewModel
        vm.appName = books.appName;
        vm.getBadge = badgeService.retrieveBadge;
        vm.favoriteBook = $cookies.favoriteBook;
        // vm.lastEdited = $cookieStore.get('lastEdited');
        vm.lastEdited = currentUser.lastBookEdited;

        // dataService.getAllBooks().then(getBooksSuccess,
        //     null, getTaskNotification)
        //     .catch(errorCallback)
        //     .finally(taskComplete('getAllBooks'));

        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        dataService.getAllReaders()
            .then(getReadersSuccess, null, getTaskNotification)
            .catch(errorCallback)
            .finally(taskComplete('getAllReaders'));

        // $q.all([booksPromise, readersPromise])
        //     .then(getAllDataSuccess)
        //     .catch(errorCallback)
        //     ;

        vm.allBooks = BooksResource.query();

        vm.deleteBook = function (bookId) {
            dataService.deleteBook(bookId)
                .then(deleteBookSuccess)
                .catch(deleteBookError)
                ;
        }

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

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }

        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        // $log.log('logging with log');
        // $log.info('logging with info');
        // $log.warn('logging with warn');
        // $log.error('logging with error');
        // $log.debug('logging with debug');
    }
} ());