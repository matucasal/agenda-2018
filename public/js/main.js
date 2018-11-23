/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */

var app = angular.module('eventsWebApp', ['ngRoute','ui.bootstrap']);

//angular.module('myModule', ['ui.bootstrap']);

/**
 * Manejo de rutas
 */
 
// Create the factory that share the Fact
app.factory('CurrentUser', function(){
return { username: '' , user_id:''};
});
 
 
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html"})
    //.when("/", {templateUrl: "partials/home.html", controller: "EventController"})
    // Listado de eventos - plantilla
    .when("/list_events", {templateUrl: "partials/list_events.html", controller: "eventController"})
    .when("/add_event", {templateUrl: "partials/add_event.html", controller: "eventController"})
    .when("/list_users", {templateUrl: "partials/list_users.html", controller: "userController"})
    .when("/add_user", {templateUrl: "partials/add_user.html", controller: "userController"})
    //
    
    
    
    //.when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    //.when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    //.when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    //.when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    //// Blog
    //.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    //.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    //.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
    ;
}]);

