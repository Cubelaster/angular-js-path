(function () {

    angular.module('app')
        .controller('EditBookController',
        ['$routeParams', 'dataService', EditBookController]);

    function EditBookController($routeParams, dataService) {
        var vm = this;
        // console.log($routeParams.bookID);

        // vm.currentBook = books.filter(function (item) {
        //     return item.book_id == $routeParams.bookId;
        // })[0];

        // vm.setAsFavorite = function () {
        //     $cookies.favoriteBook = vm.currentBook.title;
        // }

        // $cookieStore.put('lastEdited', vm.currentBook);
        dataService.getAllBooks()
            .then(function (books) {
                // debugger;
                vm.currentBook = books.filter(function (item) {
                    return item.book_id == $routeParams.bookId;
                })[0];
            });
    }

} ());