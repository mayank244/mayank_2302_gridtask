beyondTheWalls.controller('LoginCtrl', ['$scope','$cookies','services','factories','$state','$loading',function ($scope,$cookies,services,factories,$state,$loading) {
    
    $scope.user = {
        email:'',
        password:''
    };

    $scope.login = function (isValid) {
        if(isValid){
            $loading.start();
            services.login($scope,function (response,status) {
                if(status == 1){
                    $cookies.put('token',response.data[0].accessToken);
                    console.log('%c'+response.data[0].accessToken, 'background: #fed14e; color: #005377; display: block;font-size:20px');
                    $loading.finish();
                    $state.go('game.create');
                    factories.hideSideMenu();
                }
                else {
                    $loading.finish('login');
                    factories.error(response.message);
                    factories.unAuthorize(response);
                }
            });
        }
    };

}]);