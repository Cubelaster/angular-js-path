(function () {

    angular.module('app')
        .controller('EditBookController',
        [
            '$routeParams', 'books', '$cookies', '$cookieStore', 'dataService',
            '$log', '$location',
            EditBookController
        ]);

    function EditBookController(
        $routeParams, books, $cookies, $cookieStore, dataService,
        $log, $location
    ) {
        var vm = this;
        // console.log($routeParams.bookID);

        // vm.currentBook = books.filter(function (item) {
        //     return item.book_id == $routeParams.bookId;
        // })[0];

        dataService.getBookById($routeParams.bookId)
            .then(getBookSuccess)
            .catch(getBookError)
            ;

        vm.saveBook = function () {
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError)
                ;
        };

        function getBookSuccess(book) {
            vm.currentBook = book;
            $cookieStore.put('lastEdited', vm.currentBook);
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        }

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        }


        // dataService.getAllBooks()
        //     .then(function (books) {
        //         // debugger;
        //         vm.currentBook = books.filter(function (item) {
        //             return item.book_id == $routeParams.bookId;
        //         })[0];
        //     });
    }

} ());