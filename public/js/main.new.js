var app = angular.module('eventsWebApp', [
  'ngRoute'
]);

/**
 * Manejo de rutas
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "EventController"})
    // Listado de eventos - plantilla
    .when("/list_events", {templateUrl: "partials/list_events.html", controller: "EventController"})
    
    
    
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

