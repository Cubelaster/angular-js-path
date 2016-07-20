(function () {

    angular.module('app')
        .controller('BooksController', BooksController);

    function BooksController(books) {

        var vm = this;//viewModel
        vm.appName = books.appName;
    }
} ());