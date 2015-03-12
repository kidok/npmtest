(function(angular) {
    'use strict';
    var productServices = angular.module('productServices', ['ngResource']);

    productServices.factory('Product', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/products/:id', {}, {
            'update': {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    }])

    angular.module("productsApp", ["productServices"])
        .controller('ProductsController', ['$scope', 'Product', function($scope, Product) {
            $scope.addProduct = function() {
                var pp = {
                    name: $scope.name,
                    price: 100.00
                }
                Product.save(pp);
                $scope.products = Product.query();
            };
            $scope.deleteProduct = function(id) {
                //console.log(id);
                Product.delete({
                    id: id
                });
                $scope.products = Product.query();
            }
            $scope.updateProduct = function(product) {
                var pp = {
                    name: $scope.name,
                    price: 100.00
                }
                console.log(product);
                Product.update({
                    id: product._id
                }, product);
                $scope.products = Product.query();
            }
            $scope.products = Product.query();
        }])
})(window.angular)