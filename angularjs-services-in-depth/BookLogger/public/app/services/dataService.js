(function () {
    angular.module('app')
        .factory('dataService', [
            '$q', '$timeout', '$http', 'constants', '$cacheFactory',
            dataService
        ]);

    function dataService($q, $timeout, $http, constants, $cacheFactory) {
        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookById: getBookById,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook,
            getUserSummary: getUserSummary
        };

        function getUserSummary() {
            var deferred = $q.defer();
            var dataCache = $cacheFactory.get('bookLoggerCache');

            if (!dataCache) {
                dataCache = $cacheFactory('bookLoggerCache');
            }

            var summaryFromCache = dataCache.get('summary');
            if (summaryFromCache) {
                console.log('Returning summary from cache...');
                deferred.resolve(summaryFromCache);
            } else {
                console.log('Gathering new data...');
                var booksPromise = getAllBooks();
                var readersPromise = getAllReaders();

                $q.all([booksPromise, readersPromise])
                    .then(function (bookLoggerData) {

                        var allBooks = bookLoggerData[0];
                        var allReaders = bookLoggerData[1];
                        var grandTotalMinutes = 0;

                        allReaders.forEach(function (currentReader, index, array) {
                            grandTotalMinutes += currentReader.totalMinutesRead;
                        });

                        var summaryData = {
                            bookCount: allBooks.length,
                            readerCount: allReaders.length,
                            grandTotalMinutes: grandTotalMinutes
                        };

                        dataCache.put('summary', summaryData);
                        deferred.resolve(summaryData);
                    });
            }

            return deferred.promise;
        }

        function deleteSummaryFromCache() {
            var dataCache = $cacheFactory.get('bookLoggerCache');
            dataCache.remove('summary');
        }

        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                cache: true,
                // cache: dataCache,
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks
            })
                .then(sendResponseData)
                .catch(sendGetBooksError)
                ;
        }

        function deleteAllBooksResponseFromCache() {
            var httpCache = $cacheFactory.get('$http');
            httpCache.remove('api/books');
        }

        function getBookById(bookId) {
            // return $http({
            //     method: 'GET',
            //     url: 'api/books/' + bookId
            // })
            //     .then(sendResponseData)
            //     .catch(sendGetBooksError)
            //     ;
            return $http.get('api/books/' + bookId)
                .then(sendResponseData)
                .catch(sendGetBooksError)
                ;
        };

        function updateBook(book) {
            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();

            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book

            })
                .then(updateBookSuccess)
                .catch(updateBookError)
                ;
        }

        function addBook(newBook) {
            // return $http({
            //     method: 'POST',
            //     url: 'api/books',
            //     data: newBook
            // })
            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();
            return $http.post('api/books', newBook, {
                transformRequest: transformPostRequest
            })
                .then(addBookSuccess)
                .catch(addBookError)
                ;
        }

        function deleteBook(bookId) {
            // return $http({
            //     method: 'DELETE',
            //     url: 'api/books/' + bookId
            // })
            //     .then(deleteBookSuccess)
            //     .catch(deleteBookError)
            //     ;
            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();
            return $http.delete('api/books/' + bookId)
                .then(deleteBookSuccess)
                .catch(deleteBookError)
                ;
        }

        function transformGetBooks(data, headersGetter) {
            var transformed = angular.fromJson(data);
            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            // console.log(transformed);
            return transformed;
        }

        function transformPostRequest(data, headersGetter) {
            data.newBook = true;
            console.log(data);
            return JSON.stringify(data);
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

        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }

        function addBookError(response) {
            $q.reject('Error adding the book. HTTP status: ' + response.status);
        }

        function deleteBookSuccess(response) {
            return 'Book deleted!';
        }

        function deleteBookError(response) {
            $q.reject('Error deleting the book. HTTP status: ' + response.status);
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