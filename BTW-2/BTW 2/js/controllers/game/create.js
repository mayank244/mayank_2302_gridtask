beyondTheWalls.controller('createGameCtrl', ['$scope','$rootScope','$cookies','services','factories','$state','$stateParams','$loading','$timeout',function ($scope,$rootScope,$cookies,services,factories,$state,$stateParams,$loading,$timeout) {
    
    $scope.game = {
        name:'',
        description:'',
        minPlayer:'',
        maxPlayer:'',
        isProtected:true,
        password:'',
        isOrderLock:true
    };
    
    $scope.datePicker = {
        startDate: null, 
        endDate: null,
        mindate: moment()
    };

    $scope.challenges = [{}];

    $scope.addChallenge = function () {
        $scope.challenges.push({});
    };

    $scope.deleteChallengeObj = function (type,obj) {
        switch (type){
            case 'Image':
                delete obj.qrCode;
                delete obj.location;
                delete obj.geometry;
                delete obj.textAnswer;
                delete obj.distanceDiff;
                break;
            case 'Location':
                delete obj.keywords;
                delete obj.qrCode;
                delete obj.textAnswer;
                break;
            case 'QR code':
                delete obj.keywords;
                delete obj.location;
                delete obj.geometry;
                delete obj.distanceDiff;
                delete obj.textAnswer;
                break;
            case 'Text':
                delete obj.qrCode;
                delete obj.keywords;
                delete obj.location;
                delete obj.distanceDiff;
                delete obj.geometry;
                break;
        }
    };

    $scope.createGame = function (isValid) {
        if(isValid){
            if(parseInt($scope.game.minPlayer) > parseInt($scope.game.maxPlayer)){
                factories.error('Maximum Players should be greater than Minimum Players.');
                return false;
            }
            $loading.start();
            services.createGame($scope,function (response,status) {
               if(status == 1){
                   $loading.finish();
                   factories.successCallback(response.message,function () {
                       $state.go('game.list');
                   });
               }
               else {
                   $loading.finish();
                   factories.error(response.message);
                   factories.unAuthorize(response);
               }
            });
        }
    };

}]);