(function () {

    angular.module('app')
        .controller('EditBookController',
        [
            '$routeParams', 'books', '$cookies', '$cookieStore', 'dataService',
            '$log', '$location', 'BooksResource', 'currentUser',
            EditBookController
        ]);

    function EditBookController(
        $routeParams, books, $cookies, $cookieStore, dataService,
        $log, $location, BooksResource, currentUser
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

        // vm.currentBook = BooksResource.get({ book_id: $routeParams.bookId });

        vm.saveBook = function () {
            // dataService.updateBook(vm.currentBook)
            //     .then(updateBookSuccess)
            //     .catch(updateBookError)
            //     ;
            vm.currentBook.$update();
            $location.path('/');
        };

        function getBookSuccess(book) {
            vm.currentBook = book;
            // $cookieStore.put('lastEdited', vm.currentBook);
            currentUser.lastBookEdited = book;
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