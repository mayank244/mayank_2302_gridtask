beyondTheWalls
    .config(config)
    .run(['$rootScope','$state','factories','$cookies',function($rootScope, $state , factories, $cookies) {
        $rootScope.$state = $state;
        $rootScope.logout = function () {
            factories.logoutForm('Do you want to log out ?',function () {
                $state.go('login');
                $cookies.remove('token');
                factories.success('Logged out successfully');
            });
        };
    }]);

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider,RouteHelpersProvider,APP_REQUIRES,$sceProvider) {
    $urlRouterProvider.otherwise("/login");
    $sceProvider.enabled(false);
    
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
    });

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/external/login.html",
            data: { pageTitle: 'Login'},
            controller:'LoginCtrl',
            resolve: RouteHelpersProvider.resolveFor('login-controller')
        })
        .state('parent', {
            abstract: true,
            url: "/parent",
            templateUrl: "views/parent/common/content.html"
        })
        .state('parent.dashboard', {
            url: "/dashboard",
            templateUrl: "views/parent/dashboard.html",
            data: { pageTitle: 'Dashboard' },
            controller:'dashboardCtrl',
            resolve: RouteHelpersProvider.resolveFor('dashboardCtrl-controller')
        })
        .state('parent.teamList', {
            url: "/teamList",
            templateUrl: "views/parent/teamList.html",
            data: { pageTitle: 'Team List' },
            controller:'teamListCtrl',
            resolve: RouteHelpersProvider.resolveFor('teamListCtrl-controller','ui.select','bootstrapLightbox')
        })
        .state('parent.feeds', {
            url: "/feeds",
            templateUrl: "views/parent/feeds.html",
            data: { pageTitle: 'Feeds List' },
            controller:'feedsListCtrl',
            resolve: RouteHelpersProvider.resolveFor('feedsListCtrl-controller','bootstrapLightbox')
        })
        .state('game', {
            abstract: true,
            url: "/game",
            templateUrl: "views/parent/common/content.html"
        })
        .state('game.list', {
            url: "/list",
            templateUrl: "views/parent/gameList.html",
            data: { pageTitle: 'Game List' },
            controller:'gameListCtrl',
            resolve: RouteHelpersProvider.resolveFor('gameListCtrl-controller','bootstrapLightbox')
        })
        .state('game.create', {
            url: "/create",
            templateUrl: "views/parent/createGame.html",
            data: { pageTitle: 'Create Game' },
            controller:'createGameCtrl',
            resolve: RouteHelpersProvider.resolveFor('createGameCtrl-controller','ngFileUpload','ngAutocomplete','ngTagsInput','daterangepicker')
        })
        .state('player', {
            abstract: true,
            url: "/player",
            templateUrl: "views/parent/common/content.html"
        })
        .state('player.list', {
            url: "/list",
            templateUrl: "views/parent/playerList.html",
            data: { pageTitle: 'Player List' },
            controller:'playerListCtrl',
            resolve: RouteHelpersProvider.resolveFor('playerListCtrl-controller','bootstrapLightbox')
        })
}

beyondTheWalls.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide','$httpProvider','$injector',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide,$httpProvider,$injector) {
        'use strict';
        
        // registering components after bootstrap
        beyondTheWalls.controller = $controllerProvider.register;
        beyondTheWalls.directive  = $compileProvider.directive;
        beyondTheWalls.filter     = $filterProvider.register;
        beyondTheWalls.factory    = $provide.factory;
        beyondTheWalls.service    = $provide.service;
        beyondTheWalls.constant   = $provide.constant;
        beyondTheWalls.value      = $provide.value;
        
        // added http interceptors
        $httpProvider.interceptors.push(function($q) {
            return {
                responseError: function(rejection) {
                    if(rejection.status <= -1) {
                        window.location = "error.html";
                        return;
                    }
                    return $q.reject(rejection);
                }
            };
        });
}]);
