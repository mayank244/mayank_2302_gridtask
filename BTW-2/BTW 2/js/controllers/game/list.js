beyondTheWalls.controller('gameListCtrl', ['$scope','$rootScope','$cookies','services','factories','$state','$stateParams','$loading','$timeout','Lightbox','$uibModal',function ($scope,$rootScope,$cookies,services,factories,$state,$stateParams,$loading,$timeout,Lightbox,$uibModal) {

    /* Initialize list options */
    $scope.listOptions = {
        pageNo:1,
        limit:5,
        total:null,
        maxSize:5
    };
    $scope.search = '';
    
    /* function to generate table with pagination */
    $scope.listGameFunc = function () {
        if($scope.listOptions.pageNo == 1){
            $scope.listOptions.skip = 0*$scope.listOptions.limit;
        }
        else{
            $scope.listOptions.skip = ($scope.listOptions.pageNo-1)*$scope.listOptions.limit;
        }
        $loading.start();
        services.listGame($scope.listOptions.skip,$scope.listOptions.limit,$scope.search,function (response,status) {
            if(status == 1){
                $scope.gameList = response.data.list;
                $scope.listOptions.total = response.data.totalCount;
                $scope.images = [];
                response.data.list.forEach(function (col) {
                    $scope.images.push({
                        url:col.gameImage ? col.gameImage.original:"img/no-image-available.jpg",
                        thumbUrl:col.gameImage ? col.gameImage.thumbnail:"img/no-image-available.jpg"
                    });
                });
                
                // call info table
                $scope.tableInfo();

                $loading.finish();
            }
            else {
                factories.error(response.message);
                factories.unAuthorize(response);
                $loading.finish();
            }
        });
    };
    
    /* Call Function to paginate */
    $scope.listGameFunc();
    
    /* function to call after page change */
    $scope.pageChanged = function () {
        $scope.listGameFunc();
    };

    /* function to show table info */
    $scope.tableInfo = function () {
        $scope.pg_options = {
            start:'',
            end:''
        };
        if($scope.listOptions.currentPage == 0){
            $scope.pg_options.start = 1;
            $scope.pg_options.end = $scope.listOptions.limit;
        }
        else {
            $scope.pg_options.start = $scope.listOptions.skip+1;
            $scope.pg_options.end = $scope.listOptions.skip+$scope.gameList.length;
        }
    };
    
    $scope.viewChallenge = function (details) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'challenge-template.html',
            controller: 'challengeCtrl',
            size: '',
            resolve: {
                items: function () {
                    return {
                        details:details
                    };
                }
            }
        });
    };
    
    $scope.removeGame = function (id) {
        factories.confirm("Do you want to remove this game ?",function () {
            services.removeGame(id,function (response,status) {
                if(status == 1){
                    factories.successCallback(response.message,function () {
                        $scope.listGameFunc();
                    });
                }
                else {
                    factories.error(response.message);
                    factories.unAuthorize(response);
                }
            });
        });
    };
    
    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
    };

}]);

beyondTheWalls.controller('challengeCtrl', function ($uibModalInstance,$scope,items) {
    $scope.challenges = items.details;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});