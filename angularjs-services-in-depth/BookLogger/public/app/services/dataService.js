(function () {
    angular.module('app')
        .factory('dataService', [
            '$q', '$timeout', '$http', 'constants', dataService
        ]);

    function dataService($q, $timeout, $http, constants) {
        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookById: getBookById,
            updateBook: updateBook
        };

        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                }
            })
                .then(sendResponseData)
                .catch(sendGetBooksError)
                ;
        }

        function getBookById(bookId) {
            return $http({
                method: 'GET',
                url: 'api/books/' + bookId
            })
                .then(sendResponseData)
                .catch(sendGetBooksError)
                ;
        };

        function updateBook(book) {
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
                .then(updateBookSuccess)
                .catch(updateBookError)
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendGetBooksError(response) {
            return $q.reject('Error retrieving data. HTTP status: ' + response.status + ')');
        }

        function updateBookSuccess(response) {
            return 'Book updated: ' + response.config.data.title;
        }

        function updateBookError(response) {
            return $q.reject('Error updating book. HTTP status: ' + response.status);
        }

        function getAllReaders() {

            // logger.output('Fetching readers!');

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();

            // $timeout(function () {
            // deferred.notify('Starting to fetch readers...');
            // deferred.notify('Almost done fetching readers...');
            deferred.resolve(readersArray);
            // }, 1500);

            return deferred.promise;
        };
    };

    // dataService.$inject = ['logger']; // another way of injecting services

} ());