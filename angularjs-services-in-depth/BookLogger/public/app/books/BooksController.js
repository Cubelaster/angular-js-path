(function () {

    angular.module('app')
        .controller('BooksController', BooksController);

    function BooksController(books, dataService, logger) {

        var vm = this;//viewModel
        vm.appName = books.appName;
        vm.allBooks = dataService.getAllBooks();
        logger.output('BooksController was created!');
    }
} ());