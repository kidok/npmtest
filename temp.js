<!doctype html>
<html ng-app="productsApp">

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-resource.js"></script>
    <script src="product.js"></script>
</head>

<body>
    <h2>Products</h2>
    <div ng-controller="ProductsController">
        <form ng-submit="addProduct()">
            <input type="text" ng-model="name" size="30" placeholder="add new product here">
            <input class="btn-primary" type="submit" value="add">
        </form>
        <ul>
            <li ng-repeat="product in products">            
                <span>ID: {{product._id}}</span>
                <br>
                <span>Name: {{product.name}}</span>
                <br>
                Delete<input type="checkbox" value="delete" ng-click="deleteProduct(product._id)">
                <br>
                Edit<input type="checkbox" value="edit" onclick="this.checked?this.nextSibling.style.display = 'block':this.nextSibling.style.display = 'none'"><div style="display:none">
                <input type="text" ng-model="product.name"><input class="btn-primary" type="submit" value="edit" ng-click="updateProduct(product._id)">
                </div>
            </li>
        </ul>
    </div>
</body>

</html>

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


var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/rest_test");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', require('./routers/api'));

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
